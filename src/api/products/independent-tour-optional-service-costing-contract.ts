import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { IndependentTourOptionalServiceCostingZ } from "../../entities/Products/IndependentTourOptionalServiceCosting";


const basePath = "/api/independent-tour-optional-service-costings";

const CreateIndependentTourOptionalServiceCostingZ = IndependentTourOptionalServiceCostingZ.pick({
  tenantOID: true,
  independentTourCostingOID: true,
  name: true,
  costValue: true,
});

const UpdateIndependentTourOptionalServiceCostingZ = CreateIndependentTourOptionalServiceCostingZ.omit({
  tenantOID: true,
  independentTourCostingOID: true,
}).partial();

export type UpdateIndependentTourOptionalServiceCosting = z.infer<typeof UpdateIndependentTourOptionalServiceCostingZ>;
export type CreateIndependentTourOptionalServiceCosting = z.infer<typeof CreateIndependentTourOptionalServiceCostingZ>;

export const independentTourOptionalServiceCostingContract = initContract().router({
  createIndependentTourOptionalServiceCosting: {
    summary: "Create a new independent tour optional service costing",
    method: "POST",
    path: basePath,
    body: CreateIndependentTourOptionalServiceCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourOptionalServiceCosting: {
    summary: "Update an existing independent tour optional service costing",
    method: "PATCH",
    path: `${basePath}/:independentTourOptionalServiceCostingOID`,
    body: UpdateIndependentTourOptionalServiceCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourOptionalServiceCostings: {
    summary: "Update multiple existing independent tour optional service costings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of independent tour optional service costing to update"),
      UpdateIndependentTourOptionalServiceCostingZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated independent tour optional service costings")),
    },
  },

  deleteIndependentTourOptionalServiceCosting: {
    summary: "Delete an independent tour optional service costing",
    method: "DELETE",
    path: `${basePath}/:independentTourOptionalServiceCostingOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteIndependentTourOptionalServiceCostings: {
    summary: "Delete multiple independent tour optional service costings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      independentTourOptionalServiceCostingOIDs: z.array(z.string().describe("OIDs of independent tour optional service costings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
