import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { IndependentTourCostingZ } from "../../entities/Products/IndependentTourCosting";


const basePath = "/api/independent-tour-costings";

const CreateIndependentTourCostingZ = IndependentTourCostingZ.pick({
  tenantOID: true,
  independentTourProductOID: true,
  name: true,
  code: true,
  remarks: true,
  isActive: true,
});

const UpdateIndependentTourCostingZ = CreateIndependentTourCostingZ.omit({
  tenantOID: true,
  independentTourProductOID: true,
}).partial();

export type UpdateIndependentTourCosting = z.infer<typeof UpdateIndependentTourCostingZ>;
export type CreateIndependentTourCosting = z.infer<typeof CreateIndependentTourCostingZ>;

export const independentTourCostingContract = initContract().router({
  createIndependentTourCosting: {
    summary: "Create a new independent tour costing",
    method: "POST",
    path: basePath,
    body: CreateIndependentTourCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourCosting: {
    summary: "Update an existing independent tour costing",
    method: "PATCH",
    path: `${basePath}/:independentTourCostingOID`,
    body: UpdateIndependentTourCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourCostings: {
    summary: "Update multiple existing independent tour costings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of independent tour costing to update"),
      UpdateIndependentTourCostingZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated independent tour costings")),
    },
  },

  deleteIndependentTourCosting: {
    summary: "Delete an independent tour costing",
    method: "DELETE",
    path: `${basePath}/:independentTourCostingOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteIndependentTourCostings: {
    summary: "Delete multiple independent tour costings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      independentTourCostingOIDs: z.array(z.string().describe("OIDs of independent tour costings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
