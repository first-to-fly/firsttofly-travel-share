import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TourDepartureAccommodationZ } from "../../entities/Operations/TourDepartureAccommodation";


const basePath = "/api/operations/tour-departure-accommodations";

const CreateTourDepartureAccommodationZ = TourDepartureAccommodationZ.omit({
  oid: true,
  entityType: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true,
});

const UpdateTourDepartureAccommodationZ = CreateTourDepartureAccommodationZ.omit({
  tourDepartureOID: true,
}).partial();

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
    body: z.array(CreateTourDepartureAccommodationZ),
    responses: {
      200: z.array(z.string().describe("Accommodation OIDs")),
    },
  },

  updateAccommodations: {
    summary: "Update accommodations",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateTourDepartureAccommodationZ),
    responses: {
      200: z.array(z.string().describe("Updated accommodation OIDs")),
    },
  },

  deleteAccommodations: {
    summary: "Delete accommodations",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      accommodationOIDs: z.array(z.string()),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});