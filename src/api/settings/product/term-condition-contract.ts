import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { FTFTermConditionZ } from "../../../entities/Settings/Product/TermCondition";


const basePath = "/api/term-conditions";

// Define the coverage relationship schema
const TermConditionCoverageZ = z.object({
  coverageType: z.enum(["sectors", "sector-group", "products"]),
  coverageOID: z.string(),
});

export type TermConditionCoverage = z.infer<typeof TermConditionCoverageZ>;

// Define update schema with fields that can be updated
const UpdateTermConditionZ = FTFTermConditionZ.pick({
  name: true,
  pdf: true,
  isCustomized: true,
  isPrint: true,
  type: true,
  status: true,
  productTypeOIDs: true,
  description: true,
  remarks: true,
  offlineOperator: true,
}).extend({
  coverages: z.array(TermConditionCoverageZ).optional(),
});

// Define create schema by extending update schema with required fields
const CreateTermConditionZ = UpdateTermConditionZ.extend({
  tenantOID: z.string(),
  coverages: z.array(TermConditionCoverageZ).optional(),
});

export type UpdateTermCondition = z.infer<typeof UpdateTermConditionZ>;
export type CreateTermCondition = z.infer<typeof CreateTermConditionZ>;

// Define the API contract
export const termConditionContract = initContract().router({
  getTermConditions: {
    summary: "Get term conditions",
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

  createTermCondition: {
    summary: "Create a new term condition",
    method: "POST",
    path: basePath,
    body: CreateTermConditionZ,
    responses: {
      200: z.string(),
    },
  },

  updateTermCondition: {
    summary: "Update an existing term condition",
    method: "PATCH",
    path: `${basePath}/:termConditionOID`,
    body: UpdateTermConditionZ,
    responses: {
      200: z.string(),
    },
  },

  updateTermConditions: {
    summary: "Update multiple existing term conditions",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of term condition to update"),
      UpdateTermConditionZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated term conditions")),
    },
  },

  deleteTermCondition: {
    summary: "Delete a term condition",
    method: "DELETE",
    path: `${basePath}/:termConditionOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteTermConditions: {
    summary: "Delete multiple term conditions",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      termConditionOIDs: z.array(z.string().describe("OIDs of term conditions to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  // getTermConditionCoverages: {
  //   summary: "Get coverages for a term condition",
  //   method: "GET",
  //   path: `${basePath}/:termConditionOID/coverages`,
  //   query: z.object({
  //     tenantOID: z.string(),
  //   }).passthrough(),
  //   responses: {
  //     200: z.array(z.object({
  //       oid: z.string(),
  //       coverageType: z.enum(["sectors", "sector-group", "products"]),
  //       coverageOID: z.string(),
  //     })),
  //   },
  // },
});
