import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { SupplierProfileZ } from "../entities/Settings/General/SupplierProfile";
// Adjusted path

const basePath = "/api/supplier-profiles";

// Define Create/Update Schemas
// For SupplierProfile, most fields can be updated.
// 'tenantId' is required for creation and usually not updatable directly.
// 'id', 'oid', 'entityType', 'createdAt', 'updatedAt', 'deletedAt', 'createdBy', 'updatedBy' are typically managed by the system.

const UpdateSupplierProfileFieldsZ = SupplierProfileZ.omit({
  id: true, // Assuming 'id' is the internal UUID, 'oid' is the external one from EntityZ
  oid: true,
  entityType: true,
  tenantId: true, // Usually not updatable post-creation
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  createdBy: true,
  updatedBy: true,
});
export type UpdateSupplierProfileFields = z.infer<typeof UpdateSupplierProfileFieldsZ>;

// Create schema requires tenantId and other necessary fields from SupplierProfileZ
// It should not include system-managed fields like id, oid, timestamps etc.
const CreateSupplierProfileZ = SupplierProfileZ.pick({
  name: true,
  type: true,
  contactEmail: true,
  contactPhone: true,
  contactAddress: true,
  apiCredentials: true,
  manualContact: true,
  communicationInstructions: true,
  status: true,
  // tenantOID is inherited from EntityZ and should be part of the body for creation context
}).extend({
  tenantOID: EntityOIDZ, // Explicitly require tenantOID for creation context
});
export type CreateSupplierProfile = z.infer<typeof CreateSupplierProfileZ>;


// Contract Definition
export const supplierProfileContract = initContract().router({
  getSupplierProfiles: {
    summary: "Get supplier profile OIDs",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: EntityOIDZ,
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(EntityOIDZ),
      }),
    },
  },
  createSupplierProfile: {
    summary: "Create a new supplier profile",
    method: "POST",
    path: basePath,
    body: CreateSupplierProfileZ,
    responses: {
      201: SupplierProfileZ, // Return the full profile on creation
    },
  },
  getSupplierProfile: {
    summary: "Get a specific supplier profile by OID",
    method: "GET",
    path: `${basePath}/:supplierProfileOID`,
    pathParams: z.object({ supplierProfileOID: EntityOIDZ }),
    responses: {
      200: SupplierProfileZ,
      404: z.object({ message: z.string() }),
    },
  },
  updateSupplierProfile: {
    summary: "Update an existing supplier profile",
    method: "PATCH", // Using PATCH for partial updates
    path: `${basePath}/:supplierProfileOID`,
    pathParams: z.object({ supplierProfileOID: EntityOIDZ }),
    body: UpdateSupplierProfileFieldsZ.partial(), // Allow partial updates
    responses: {
      200: SupplierProfileZ,
    },
  },
  updateSupplierProfiles: {
    summary: "Update multiple existing supplier profiles",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      EntityOIDZ.describe("OID of supplier profile to update"),
      UpdateSupplierProfileFieldsZ.partial(),
    ),
    responses: {
      200: z.array(SupplierProfileZ.describe("Updated supplier profiles")),
    },
  },
  deleteSupplierProfile: {
    summary: "Delete a supplier profile (soft delete)",
    method: "DELETE",
    path: `${basePath}/:supplierProfileOID`,
    pathParams: z.object({ supplierProfileOID: EntityOIDZ }),
    body: z.object({}), // Empty body for delete
    responses: {
      200: z.object({ success: z.boolean() }), // Or 204 with z.null()
    },
  },
  deleteSupplierProfiles: {
    summary: "Delete multiple supplier profiles (soft delete)",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      supplierProfileOIDs: z.array(EntityOIDZ.describe("OIDs of supplier profiles to delete")),
    }),
    responses: {
      200: z.object({ deletedCount: z.number() }),
    },
  },
});
