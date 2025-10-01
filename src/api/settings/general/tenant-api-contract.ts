import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DateISOStringZ } from "../../../entities/entity";
import { TenantApiZ } from "../../../entities/Settings/General/TenantApi";


const basePath = "/api/settings/tenant-apis";

export const CreateTenantApiZ = TenantApiZ.pick({
  code: true,
  name: true,
  description: true,
  allowedIPs: true,
  rateLimitPerMin: true,
});
export type CreateTenantApi = z.infer<typeof CreateTenantApiZ>;

export const UpdateTenantApiZ = CreateTenantApiZ.partial().extend({
  status: TenantApiZ.shape.status.optional(),
});
export type UpdateTenantApi = z.infer<typeof UpdateTenantApiZ>;

export const RotateKeyResponseZ = z.object({
  keyId: z.string(),
  secret: z.string(),
  expiresOldKeyAt: DateISOStringZ.optional(),
});
export type RotateKeyResponse = z.infer<typeof RotateKeyResponseZ>;

export const tenantApiContract = initContract().router({
  createTenantApi: {
    method: "POST",
    path: `${basePath}`,
    summary: "Create a new tenant API key",
    body: CreateTenantApiZ,
    responses: {
      200: z.string().describe("OID of the created tenant API key"),
    },
  },
  updateTenantApi: {
    method: "PATCH",
    path: `${basePath}/:tenantApiOID`,
    summary: "Update a tenant API key",
    body: UpdateTenantApiZ,
    responses: {
      200: z.string().describe("OID of the updated tenant API key"),
    },
  },
  updateTenantApis: {
    method: "POST",
    path: `${basePath}/batch-update`,
    summary: "Batch update tenant API keys",
    body: z.record(
      z.string().describe("OID of tenant API to update"),
      UpdateTenantApiZ,
    ),
    responses: {
      200: z.array(z.string()).describe("OIDs of updated tenant APIs"),
    },
  },
  deleteTenantApi: {
    method: "DELETE",
    path: `${basePath}/:tenantApiOID`,
    summary: "Delete a tenant API key",
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
  deleteTenantApis: {
    method: "POST",
    path: `${basePath}/batch-delete`,
    summary: "Batch delete tenant API keys",
    body: z.object({
      tenantApiOIDs: z.array(z.string()).describe("OIDs of tenant APIs to delete"),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  rotateKey: {
    method: "POST",
    path: `${basePath}/:tenantApiOID/rotate-key`,
    summary: "Rotate the API key credentials (generates new keyId and secret)",
    body: z.object({}),
    responses: {
      200: RotateKeyResponseZ,
    },
  },
  revokeKey: {
    method: "POST",
    path: `${basePath}/:tenantApiOID/revoke`,
    summary: "Revoke the API key permanently",
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
  activateKey: {
    method: "POST",
    path: `${basePath}/:tenantApiOID/activate`,
    summary: "Activate the API key (only if not revoked)",
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
  deactivateKey: {
    method: "POST",
    path: `${basePath}/:tenantApiOID/deactivate`,
    summary: "Deactivate the API key temporarily",
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
