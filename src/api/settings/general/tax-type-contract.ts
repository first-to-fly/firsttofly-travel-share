import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/tax-types";

export const taxTypeContract = initContract().router({
  getTaxTypes: {
    summary: "Get tax types",
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

  syncTaxTypesFromXero: {
    summary: "Sync tax types from Xero",
    method: "POST",
    path: `${basePath}/sync-from-xero`,
    body: z.object({ tenantOID: z.string() }),
    responses: {
      200: z.object({
        imported: z.number(),
        updated: z.number(),
      }),
    },
  },
});
