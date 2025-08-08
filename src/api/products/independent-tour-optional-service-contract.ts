import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { IndependentTourOptionalServiceZ } from "../../entities/Products/IndependentTourOptionalService";


const basePath = "/api/independent-tour-optional-services";

const CreateIndependentTourOptionalServiceZ = IndependentTourOptionalServiceZ.pick({
  tenantOID: true,
  independentTourProductOID: true,
  name: true,
  costValue: true,
  priceValue: true,
});

const UpdateIndependentTourOptionalServiceZ = CreateIndependentTourOptionalServiceZ.omit({
  tenantOID: true,
  independentTourProductOID: true,
}).partial();

export type UpdateIndependentTourOptionalService = z.infer<typeof UpdateIndependentTourOptionalServiceZ>;
export type CreateIndependentTourOptionalService = z.infer<typeof CreateIndependentTourOptionalServiceZ>;

export const independentTourOptionalServiceContract = initContract().router({
  createIndependentTourOptionalService: {
    summary: "Create a new independent tour optional service",
    method: "POST",
    path: basePath,
    body: CreateIndependentTourOptionalServiceZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourOptionalService: {
    summary: "Update an existing independent tour optional service",
    method: "PATCH",
    path: `${basePath}/:independentTourOptionalServiceOID`,
    body: UpdateIndependentTourOptionalServiceZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourOptionalServices: {
    summary: "Update multiple existing independent tour optional services",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of independent tour optional service to update"),
      UpdateIndependentTourOptionalServiceZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated independent tour optional services")),
    },
  },

  deleteIndependentTourOptionalService: {
    summary: "Delete an independent tour optional service",
    method: "DELETE",
    path: `${basePath}/:independentTourOptionalServiceOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteIndependentTourOptionalServices: {
    summary: "Delete multiple independent tour optional services",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      independentTourOptionalServiceOIDs: z.array(z.string().describe("OIDs of independent tour optional services to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
