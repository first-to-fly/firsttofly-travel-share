import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { IndependentTourAccommodationZ } from "../../entities/Products/IndependentTourAccommodation";


const basePath = "/api/independent-tour-accommodations";

const CreateIndependentTourAccommodationZ = IndependentTourAccommodationZ.pick({
  tenantOID: true,
  independentTourProductOID: true,
  name: true,
  costValue: true,
  priceValue: true,
  nightExtensionConfig: true,
  peakSurchargeRates: true,
  peakPeriods: true,
});

const UpdateIndependentTourAccommodationZ = CreateIndependentTourAccommodationZ.omit({
  tenantOID: true,
  independentTourProductOID: true,
}).partial();

export type UpdateIndependentTourAccommodation = z.infer<typeof UpdateIndependentTourAccommodationZ>;
export type CreateIndependentTourAccommodation = z.infer<typeof CreateIndependentTourAccommodationZ>;

export const independentTourAccommodationContract = initContract().router({
  createIndependentTourAccommodation: {
    summary: "Create a new independent tour accommodation",
    method: "POST",
    path: basePath,
    body: CreateIndependentTourAccommodationZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourAccommodation: {
    summary: "Update an existing independent tour accommodation",
    method: "PATCH",
    path: `${basePath}/:independentTourAccommodationOID`,
    body: UpdateIndependentTourAccommodationZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourAccommodations: {
    summary: "Update multiple existing independent tour accommodations",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of independent tour accommodation to update"),
      UpdateIndependentTourAccommodationZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated independent tour accommodations")),
    },
  },

  deleteIndependentTourAccommodation: {
    summary: "Delete an independent tour accommodation",
    method: "DELETE",
    path: `${basePath}/:independentTourAccommodationOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteIndependentTourAccommodations: {
    summary: "Delete multiple independent tour accommodations",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      independentTourAccommodationOIDs: z.array(z.string().describe("OIDs of independent tour accommodations to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
