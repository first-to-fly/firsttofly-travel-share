import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/settings/tenant-config";


const UpdateTenantConfigZ = z.object({
  configValue: z.unknown(),
});

const UpdateTenantConfigByKeyZ = z.object({
  configKey: z.string(),
  configValue: z.unknown(),
});

export type UpdateTenantConfig = z.infer<typeof UpdateTenantConfigZ>;
export type UpdateTenantConfigByKey = z.infer<typeof UpdateTenantConfigByKeyZ>;

export const tenantConfigContract = initContract().router({
  getTenantConfigs: {
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
    summary: "Get tenant configs",
  },

  updateTenantConfig: {
    summary: "Update a tenant config",
    method: "PATCH",
    path: `${basePath}/:tenantConfigOID`,
    body: UpdateTenantConfigZ,
    responses: {
      200: z.string(),
    },
  },

  updateTenantConfigs: {
    summary: "Update multiple tenant configs",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of tenant config to update"),
      UpdateTenantConfigZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated tenant configs")),
    },
  },

  updateTenantConfigByKey: {
    summary: "Update or create tenant config by key",
    method: "PATCH",
    path: `${basePath}/by-key`,
    query: z.object({
      tenantOID: z.string(),
    }),
    body: UpdateTenantConfigByKeyZ,
    responses: {
      200: z.string().describe("OID of updated or created tenant config"),
    },
  },
});
