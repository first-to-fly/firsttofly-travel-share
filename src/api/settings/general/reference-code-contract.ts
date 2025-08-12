import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ReferenceCodeZ } from "../../../entities/Settings/General/ReferenceCode";


const basePath = "/api/settings/reference-codes";

const UpdateReferenceCodeZ = ReferenceCodeZ.pick({
  name: true,
  counterType: true,
  resetCounterType: true,
  counterWidth: true,
  template: true,
}).partial();

export type UpdateReferenceCode = z.infer<typeof UpdateReferenceCodeZ>;

export const referenceCodeContract = initContract().router({
  getReferenceCodes: {
    summary: "Get reference codes",
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

  updateReferenceCodes: {
    summary: "Update multiple existing reference codes",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of reference code to update"),
      UpdateReferenceCodeZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated reference codes")),
    },
  },
});
