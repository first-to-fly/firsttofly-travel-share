import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { EntityOIDZ, EntityZ } from "../../entities/entity";
import { EntityType } from "../../entities/entityType";
import { TourDepartureAccommodationStatus } from "../../entities/Operations/TourDepartureAccommodation";
import { GeoPointZ } from "../../entities/Settings/General/POI";


const basePath = "/api/operations/tour-departure-accommodations";

// Batch size limits for DoS prevention
const MAX_BATCH_SIZE = 100;

// Base schema without refinements for API operations
const BaseTourDepartureAccommodationZ = EntityZ.extend({
  entityType: z.literal(EntityType.TOUR_DEPARTURE_ACCOMMODATION),
  tourDepartureOID: EntityOIDZ,
  name: MultiLangRecordZ(z.string()),
  checkIn: DateISOStringZ,
  checkOut: DateISOStringZ,
  location: GeoPointZ,
  contact: z.string(),
  address: z.string(),
  description: MultiLangRecordZ(z.string()),
  poiOID: EntityOIDZ.optional(),
  countryCode: z.string(),
  cityCode: z.string(),
  status: z.nativeEnum(TourDepartureAccommodationStatus),
});

const CreateTourDepartureAccommodationZ = BaseTourDepartureAccommodationZ.omit({
  oid: true,
  entityType: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true,
}).refine(
  (data: { checkIn: string }) => new Date(data.checkIn) >= new Date(),
  "Check-in date must be in the future"
).refine(
  (data: { checkOut: string }) => new Date(data.checkOut) >= new Date(),
  "Check-out date must be in the future"
).refine(
  (data: { checkIn: string; checkOut: string }) => new Date(data.checkOut) > new Date(data.checkIn),
  {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  }
).refine(
  (data: { checkIn: string; checkOut: string }) => {
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const diffInDays = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 365; // Maximum 1 year stay
  },
  {
    message: "Accommodation stay cannot exceed 365 days",
    path: ["checkOut"],
  }
);

const UpdateTourDepartureAccommodationZ = BaseTourDepartureAccommodationZ.omit({
  oid: true,
  entityType: true,
  tourDepartureOID: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true,
}).partial().refine(
  (data: { checkIn?: string; checkOut?: string }) => {
    if (data.checkIn && data.checkOut) {
      return new Date(data.checkOut) > new Date(data.checkIn);
    }
    return true;
  },
  {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  }
);

export type CreateTourDepartureAccommodation = z.infer<typeof CreateTourDepartureAccommodationZ>;
export type UpdateTourDepartureAccommodation = z.infer<typeof UpdateTourDepartureAccommodationZ>;

export const tourDepartureAccommodationContract = initContract().router({
  getAccommodations: {
    summary: "Get accommodations by tour departure",
    method: "GET",
    path: basePath,
    query: z.object({
      tourDepartureOID: z.string(),
      tenantOID: z.string(),
    }),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createAccommodations: {
    summary: "Create accommodations",
    method: "POST",
    path: basePath,
    body: z.array(CreateTourDepartureAccommodationZ)
      .min(1, "At least one accommodation is required")
      .max(MAX_BATCH_SIZE, `Cannot create more than ${MAX_BATCH_SIZE} accommodations at once`),
    responses: {
      200: z.array(z.string().describe("Accommodation OIDs")),
    },
  },

  updateAccommodations: {
    summary: "Update accommodations",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateTourDepartureAccommodationZ)
      .refine(
        (obj: Record<string, unknown>) => Object.keys(obj).length >= 1,
        "At least one accommodation is required for update"
      )
      .refine(
        (obj: Record<string, unknown>) => Object.keys(obj).length <= MAX_BATCH_SIZE,
        `Cannot update more than ${MAX_BATCH_SIZE} accommodations at once`
      ),
    responses: {
      200: z.array(z.string().describe("Updated accommodation OIDs")),
    },
  },

  deleteAccommodations: {
    summary: "Delete accommodations",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      accommodationOIDs: z.array(z.string())
        .min(1, "At least one accommodation OID is required")
        .max(MAX_BATCH_SIZE, `Cannot delete more than ${MAX_BATCH_SIZE} accommodations at once`),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});