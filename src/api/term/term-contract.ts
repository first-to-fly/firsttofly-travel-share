import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TermType, TermZ } from "../../entities/Term";


const basePath = "/api/settings/terms";

const UpdateTermZ = TermZ.pick({
  type: true,
  value: true,
});

export type UpdateTerm = z.infer<typeof UpdateTermZ>;

export const termContract = initContract().router({
  getTerms: {
    summary: "Get terms",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      type: z.nativeEnum(TermType),
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
    body: TermZ.pick({
      tenantOID: true,
      type: true,
      value: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateTerm: {
    summary: "Update an existing term",
    method: "PATCH",
    path: `${basePath}/:termOID`,
    body: UpdateTermZ,
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

  deleteTerm: {
    summary: "Delete a term",
    method: "DELETE",
    path: `${basePath}/:termOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
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
