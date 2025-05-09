import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TourDepartureZ } from "../../entities/Operations/TourDeparture";


const basePath = "/api/operations/tour-departures";

const CreateTourDepartureZ = TourDepartureZ.pick({
  tenantOID: true,

  productPricingOID: true,
  appliedItineraryOID: true,

  tourLeaderOIDs: true,
  tourManagerOIDs: true,

  departureCode: true,
  description: true,

  status: true,
  isArchived: true,

  durationDays: true,
  durationNights: true,

  departureDate: true,
  finalizationDate: true,
  paymentDueDate: true,

  transportType: true,
  assemblyDetails: true,
});

const UpdateTourDepartureZ = CreateTourDepartureZ.omit({
  tenantOID: true,
  productPricingOID: true,
  appliedItineraryOID: true,
  itineraryOID: true,
}).partial();

export type UpdateTourDeparture = z.infer<typeof UpdateTourDepartureZ>;
export type CreateTourDeparture = z.infer<typeof CreateTourDepartureZ>;

export const tourDepartureContract = initContract().router({
  getTourDepartures: {
    summary: "Get tour departures",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createTourDeparture: {
    summary: "Create a new tour departure",
    method: "POST",
    path: basePath,
    body: CreateTourDepartureZ,
    responses: {
      200: z.string(),
    },
  },

  bulkCreateTourDepartures: {
    summary: "Create multiple tour departures",
    method: "POST",
    path: `${basePath}/bulk-create`,
    body: z.array(CreateTourDepartureZ),
    responses: {
      200: z.array(z.string()),
    },
  },

  updateTourDepartures: {
    summary: "Update multiple existing tour departures",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of tour departure to update"),
      UpdateTourDepartureZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated tour departures")),
    },
  },

  deleteTourDepartures: {
    summary: "Delete multiple tour departures",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      tourDepartureOIDs: z.array(z.string().describe("OIDs of tour departures to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
