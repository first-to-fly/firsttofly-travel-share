import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/xero/status";

export const xeroStatusContract = initContract().router({
  sync: {
    summary: "Sync Xero document statuses back to local entities",
    method: "POST",
    path: `${basePath}/sync`,
    body: z.object({
      tenantOID: z.string(),
      targets: z.array(z.object({
        entityType: z.enum(["bill", "transaction", "journal"]).or(z.string()),
        entityId: z.string(),
        xeroId: z.string().optional(),
      })),
    }),
    responses: {
      200: z.object({
        updated: z.number(),
        errors: z.array(z.string()).optional(),
      }),
    },
  },
});
