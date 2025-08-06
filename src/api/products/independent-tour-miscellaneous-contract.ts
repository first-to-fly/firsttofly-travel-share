import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { IndependentTourMiscellaneousZ } from "../../entities/Products/IndependentTourMiscellaneous";


const basePath = "/api/independent-tour-miscellaneous";

const CreateIndependentTourMiscellaneousZ = IndependentTourMiscellaneousZ.pick({
  tenantOID: true,
  independentTourProductOID: true,
  name: true,
  costValue: true,
});

const UpdateIndependentTourMiscellaneousZ = CreateIndependentTourMiscellaneousZ.omit({
  tenantOID: true,
  independentTourProductOID: true,
}).partial();

export type UpdateIndependentTourMiscellaneous = z.infer<typeof UpdateIndependentTourMiscellaneousZ>;
export type CreateIndependentTourMiscellaneous = z.infer<typeof CreateIndependentTourMiscellaneousZ>;

export const independentTourMiscellaneousContract = initContract().router({
  createIndependentTourMiscellaneous: {
    summary: "Create a new independent tour miscellaneous",
    method: "POST",
    path: basePath,
    body: CreateIndependentTourMiscellaneousZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourMiscellaneous: {
    summary: "Update an existing independent tour miscellaneous",
    method: "PATCH",
    path: `${basePath}/:independentTourMiscellaneousOID`,
    body: UpdateIndependentTourMiscellaneousZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourMiscellaneousMultiple: {
    summary: "Update multiple existing independent tour miscellaneous",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of independent tour miscellaneous to update"),
      UpdateIndependentTourMiscellaneousZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated independent tour miscellaneous")),
    },
  },

  deleteIndependentTourMiscellaneous: {
    summary: "Delete an independent tour miscellaneous",
    method: "DELETE",
    path: `${basePath}/:independentTourMiscellaneousOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteIndependentTourMiscellaneousMultiple: {
    summary: "Delete multiple independent tour miscellaneous",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      independentTourMiscellaneousOIDs: z.array(z.string().describe("OIDs of independent tour miscellaneous to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
