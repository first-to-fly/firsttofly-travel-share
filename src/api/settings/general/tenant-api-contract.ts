import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DateISOStringZ } from "../../../entities/entity";
import { TenantApiZ } from "../../../entities/Settings/General/TenantApi";


const basePath = "/api/settings/tenant-apis";

// Create request - only includes name and tenantOID
export const CreateTenantApiZ = z.object({
  tenantOID: z.string().describe("OID of the tenant this API key belongs to"),
  name: z.string().describe("Human-readable name for the API key"),
});
export type CreateTenantApi = z.infer<typeof CreateTenantApiZ>;

// Create response - returns OID, keyId, and secret
export const CreateTenantApiResponseZ = z.object({
  tenantApiOID: z.string().describe("OID of the created tenant API key"),
  keyId: z.string().describe("The public key ID (e.g., 'ftf_live_abc123')"),
  secret: z.string().describe("The secret key (returned only once - store it securely!)"),
});
export type CreateTenantApiResponse = z.infer<typeof CreateTenantApiResponseZ>;

// Update request - only name and status can be updated
export const UpdateTenantApiZ = z.object({
  name: z.string().optional(),
  status: TenantApiZ.shape.status.optional(),
});
export type UpdateTenantApi = z.infer<typeof UpdateTenantApiZ>;

// Rotate key response
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
      200: CreateTenantApiResponseZ,
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
