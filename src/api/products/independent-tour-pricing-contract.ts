import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { IndependentTourPricingZ } from "../../entities/Products/IndependentTourPricing";


const basePath = "/api/independent-tour-pricings";

const CreateIndependentTourPricingZ = IndependentTourPricingZ.pick({
  tenantOID: true,
  independentTourProductOID: true,
  independentTourCostingOID: true,
  name: true,
  code: true,
  remarks: true,
  targetYieldPercentage: true,
  isActive: true,
});

const UpdateIndependentTourPricingZ = CreateIndependentTourPricingZ.omit({
  tenantOID: true,
  independentTourProductOID: true,
  independentTourCostingOID: true,
}).partial();

export type UpdateIndependentTourPricing = z.infer<typeof UpdateIndependentTourPricingZ>;
export type CreateIndependentTourPricing = z.infer<typeof CreateIndependentTourPricingZ>;

export const independentTourPricingContract = initContract().router({
  createIndependentTourPricing: {
    summary: "Create a new independent tour pricing",
    method: "POST",
    path: basePath,
    body: CreateIndependentTourPricingZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourPricing: {
    summary: "Update an existing independent tour pricing",
    method: "PATCH",
    path: `${basePath}/:independentTourPricingOID`,
    body: UpdateIndependentTourPricingZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourPricings: {
    summary: "Update multiple existing independent tour pricings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of independent tour pricing to update"),
      UpdateIndependentTourPricingZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated independent tour pricings")),
    },
  },

  deleteIndependentTourPricing: {
    summary: "Delete an independent tour pricing",
    method: "DELETE",
    path: `${basePath}/:independentTourPricingOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteIndependentTourPricings: {
    summary: "Delete multiple independent tour pricings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      independentTourPricingOIDs: z.array(z.string().describe("OIDs of independent tour pricings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
