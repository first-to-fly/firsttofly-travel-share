import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { IndependentTourMiscellaneousCostingZ } from "../../entities/Products/IndependentTourMiscellaneousCosting";


const basePath = "/api/independent-tour-miscellaneous-costings";

const CreateIndependentTourMiscellaneousCostingZ = IndependentTourMiscellaneousCostingZ.pick({
  tenantOID: true,
  independentTourCostingOID: true,
  name: true,
  costValue: true,
});

const UpdateIndependentTourMiscellaneousCostingZ = CreateIndependentTourMiscellaneousCostingZ.omit({
  tenantOID: true,
  independentTourCostingOID: true,
}).partial();

export type UpdateIndependentTourMiscellaneousCosting = z.infer<typeof UpdateIndependentTourMiscellaneousCostingZ>;
export type CreateIndependentTourMiscellaneousCosting = z.infer<typeof CreateIndependentTourMiscellaneousCostingZ>;

export const independentTourMiscellaneousCostingContract = initContract().router({
  createIndependentTourMiscellaneousCosting: {
    summary: "Create a new independent tour miscellaneous costing",
    method: "POST",
    path: basePath,
    body: CreateIndependentTourMiscellaneousCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourMiscellaneousCosting: {
    summary: "Update an existing independent tour miscellaneous costing",
    method: "PATCH",
    path: `${basePath}/:independentTourMiscellaneousCostingOID`,
    body: UpdateIndependentTourMiscellaneousCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourMiscellaneousCostings: {
    summary: "Update multiple existing independent tour miscellaneous costings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of independent tour miscellaneous costing to update"),
      UpdateIndependentTourMiscellaneousCostingZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated independent tour miscellaneous costings")),
    },
  },

  deleteIndependentTourMiscellaneousCosting: {
    summary: "Delete an independent tour miscellaneous costing",
    method: "DELETE",
    path: `${basePath}/:independentTourMiscellaneousCostingOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteIndependentTourMiscellaneousCostings: {
    summary: "Delete multiple independent tour miscellaneous costings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      independentTourMiscellaneousCostingOIDs: z.array(z.string().describe("OIDs of independent tour miscellaneous costings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
