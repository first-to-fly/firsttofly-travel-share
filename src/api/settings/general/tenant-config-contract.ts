import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/settings/tenant-config";

const TenantConfigResponseZ = z.object({
  oid: z.string(),
  tenantOID: z.string(),
  key: z.string(),
  configValue: z.unknown(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string().nullable(),
});

const CreateTenantConfigZ = z.object({
  tenantOID: z.string(),
  key: z.string(),
  configValue: z.unknown(),
});

const UpdateTenantConfigZ = z.object({
  configValue: z.unknown(),
});

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
});