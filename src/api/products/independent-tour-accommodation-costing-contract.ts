import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { IndependentTourAccommodationCostingZ } from "../../entities/Products/IndependentTourAccommodationCosting";


const basePath = "/api/independent-tour-accommodation-costings";

const CreateIndependentTourAccommodationCostingZ = IndependentTourAccommodationCostingZ.pick({
  tenantOID: true,
  independentTourCostingOID: true,
  name: true,
  costValue: true,
  occupancyPricing: true,
  nightExtensionConfig: true,
  peakSurchargeRates: true,
  peakPeriods: true,
});

const UpdateIndependentTourAccommodationCostingZ = CreateIndependentTourAccommodationCostingZ.omit({
  tenantOID: true,
  independentTourCostingOID: true,
}).partial();

export type UpdateIndependentTourAccommodationCosting = z.infer<typeof UpdateIndependentTourAccommodationCostingZ>;
export type CreateIndependentTourAccommodationCosting = z.infer<typeof CreateIndependentTourAccommodationCostingZ>;

export const independentTourAccommodationCostingContract = initContract().router({
  createIndependentTourAccommodationCosting: {
    summary: "Create a new independent tour accommodation costing",
    method: "POST",
    path: basePath,
    body: CreateIndependentTourAccommodationCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourAccommodationCosting: {
    summary: "Update an existing independent tour accommodation costing",
    method: "PATCH",
    path: `${basePath}/:independentTourAccommodationCostingOID`,
    body: UpdateIndependentTourAccommodationCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourAccommodationCostings: {
    summary: "Update multiple existing independent tour accommodation costings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of independent tour accommodation costing to update"),
      UpdateIndependentTourAccommodationCostingZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated independent tour accommodation costings")),
    },
  },

  deleteIndependentTourAccommodationCosting: {
    summary: "Delete an independent tour accommodation costing",
    method: "DELETE",
    path: `${basePath}/:independentTourAccommodationCostingOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteIndependentTourAccommodationCostings: {
    summary: "Delete multiple independent tour accommodation costings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      independentTourAccommodationCostingOIDs: z.array(z.string().describe("OIDs of independent tour accommodation costings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
