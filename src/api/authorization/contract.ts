import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";


const basePath = "/api/permissions";


export const ResourcePermissionsZ = z.object({
  oid: EntityOIDZ,
  permissions: z.array(z.string()),
});


export const authorizationContract = initContract().router({
  getPermissionsForResources: {
    summary: "Get user's permissions for resources",
    method: "PUT",
    path: `${basePath}/get-permissions-for-resources`,
    body: z.object({
      oids: z.array(EntityOIDZ),
      tenantOID: EntityOIDZ,
    }),
    responses: {
      200: z.object({
        permissions: z.array(ResourcePermissionsZ),
      }),
    },
  },
});
