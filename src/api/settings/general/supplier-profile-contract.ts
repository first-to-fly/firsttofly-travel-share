import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../../entities/entity";
import { SupplierProfileZ } from "../../../entities/Operations/SupplierProfile";


const basePath = "/api/operations/supplier-profiles";

const CreateSupplierProfileZ = SupplierProfileZ.omit({
  oid: true,
  entityType: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  createdBy: true,
  updatedBy: true,
});
export type CreateSupplierProfile = z.infer<typeof CreateSupplierProfileZ>;

const UpdateSupplierProfileZ = CreateSupplierProfileZ.omit({
  tenantOID: true,
}).partial();
export type UpdateSupplierProfile = z.infer<typeof UpdateSupplierProfileZ>;


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
      200: z.string(), // Return the full profile on creation
    },
  },

  updateSupplierProfiles: {
    summary: "Update multiple existing supplier profiles",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      EntityOIDZ.describe("OID of supplier profile to update"),
      UpdateSupplierProfileZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated supplier profiles")),
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
      200: z.boolean(),
    },
  },
});
