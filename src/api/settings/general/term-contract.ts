import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TermZ } from "../../../entities/Settings/General/Term";


const basePath = "/api/settings/terms";

const UpdateTermZ = TermZ.pick({
  type: true,
  value: true,
});

const CreateTermZ = UpdateTermZ.extend({
  tenantOID: z.string(),
});

export type UpdateTerm = z.infer<typeof UpdateTermZ>;
export type CreateTerm = z.infer<typeof CreateTermZ>;

export const termContract = initContract().router({
  getTerms: {
    summary: "Get terms",
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

  createTerm: {
    summary: "Create a new term",
    method: "POST",
    path: basePath,
    body: CreateTermZ,
    responses: {
      200: z.string(),
    },
  },

  updateTerms: {
    summary: "Update multiple existing terms",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of term to update"),
      UpdateTermZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated terms")),
    },
  },

  deleteTerms: {
    summary: "Delete multiple terms",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      termOIDs: z.array(z.string().describe("OIDs of terms to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
