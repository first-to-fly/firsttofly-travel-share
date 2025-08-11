import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TermConditionZ } from "../../../entities/Settings/Product/TermCondition";


const basePath = "/api/term-conditions";

// Define the coverage relationship schema
export const TermConditionCoverageZ = z.object({
  coverageType: z.enum(["sectors", "sector-group", "products"]),
  coverageOID: z.string(),
});

export type TermConditionCoverage = z.infer<typeof TermConditionCoverageZ>;

const CreateTermConditionZ = TermConditionZ.pick({
  tenantOID: true,

  name: true,

  pdf: true,

  isCustomized: true,
  isPrint: true,

  type: true,

  isActive: true,
  description: true,
  remarks: true,

  productTypes: true,

  coveredEntityOIDs: true,
});

const UpdateTermConditionZ = CreateTermConditionZ.omit({
  tenantOID: true,
}).partial();

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

});
