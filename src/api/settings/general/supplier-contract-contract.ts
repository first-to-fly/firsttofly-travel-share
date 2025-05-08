import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../../entities/entity";
import { SupplierContractZ } from "../../../entities/Settings/General/SupplierContract";
// Corrected path casing

const basePath = "/api/settings/supplier-contracts";

// Define Create/Update Schemas
const UpdateSupplierContractFieldsZ = SupplierContractZ.omit({
  id: true,
  oid: true,
  entityType: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  createdBy: true,
  updatedBy: true,
});
export type UpdateSupplierContractFields = z.infer<typeof UpdateSupplierContractFieldsZ>;

const CreateSupplierContractZ = SupplierContractZ.pick({
  supplierProfileId: true, // Assuming this is the OID of the supplier profile
  name: true,
  type: true,
  details: true,
  validityStartDate: true,
  validityEndDate: true,
  status: true,
  contractFiles: true,
  // tenantOID is inherited from EntityZ
}).extend({
  tenantOID: EntityOIDZ, // Explicitly require tenantOID for creation context
  supplierProfileOID: EntityOIDZ, // Ensure supplierProfileOID is passed for creation
});
export type CreateSupplierContract = z.infer<typeof CreateSupplierContractZ>;


// Contract Definition
export const supplierContractContract = initContract().router({
  getSupplierContracts: {
    summary: "Get supplier contract OIDs for a supplier profile",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: EntityOIDZ,
      supplierProfileOID: EntityOIDZ, // Filter by supplier profile
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(EntityOIDZ),
      }),
    },
  },
  createSupplierContract: {
    summary: "Create a new supplier contract",
    method: "POST",
    path: basePath,
    body: CreateSupplierContractZ,
    responses: {
      201: SupplierContractZ,
    },
  },
  getSupplierContract: {
    summary: "Get a specific supplier contract by OID",
    method: "GET",
    path: `${basePath}/:supplierContractOID`,
    pathParams: z.object({ supplierContractOID: EntityOIDZ }),
    responses: {
      200: SupplierContractZ,
      404: z.object({ message: z.string() }),
    },
  },
  updateSupplierContract: {
    summary: "Update an existing supplier contract",
    method: "PATCH",
    path: `${basePath}/:supplierContractOID`,
    pathParams: z.object({ supplierContractOID: EntityOIDZ }),
    body: UpdateSupplierContractFieldsZ.partial(),
    responses: {
      200: SupplierContractZ,
    },
  },
  updateSupplierContracts: {
    summary: "Update multiple existing supplier contracts",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      EntityOIDZ.describe("OID of supplier contract to update"),
      UpdateSupplierContractFieldsZ.partial(),
    ),
    responses: {
      200: z.array(SupplierContractZ.describe("Updated supplier contracts")),
    },
  },
  deleteSupplierContract: {
    summary: "Delete a supplier contract (soft delete)",
    method: "DELETE",
    path: `${basePath}/:supplierContractOID`,
    pathParams: z.object({ supplierContractOID: EntityOIDZ }),
    body: z.object({}),
    responses: {
      200: z.object({ success: z.boolean() }),
    },
  },
  deleteSupplierContracts: {
    summary: "Delete multiple supplier contracts (soft delete)",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      supplierContractOIDs: z.array(EntityOIDZ.describe("OIDs of supplier contracts to delete")),
    }),
    responses: {
      200: z.object({ deletedCount: z.number() }),
    },
  },
});
