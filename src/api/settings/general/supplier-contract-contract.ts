import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../../entities/entity";
import { SupplierContractZ } from "../../../entities/Operations/SupplierContract";


const basePath = "/api/operations/supplier-contracts";

const CreateSupplierContractZ = SupplierContractZ.omit({
  oid: true,
  entityType: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  createdBy: true,
  updatedBy: true,
});
export type CreateSupplierContract = z.infer<typeof CreateSupplierContractZ>;

const UpdateSupplierContractZ = CreateSupplierContractZ.omit({
  supplierProfileOID: true,
  tenantOID: true,
}).partial();
export type UpdateSupplierContract = z.infer<typeof UpdateSupplierContractZ>;


export const supplierContractContract = initContract().router({
  getSupplierContracts: {
    summary: "Get supplier contract OIDs for a supplier profile",
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

  createSupplierContract: {
    summary: "Create a new supplier contract",
    method: "POST",
    path: basePath,
    body: CreateSupplierContractZ,
    responses: {
      200: z.string(), // created oid
    },
  },

  updateSupplierContracts: {
    summary: "Update multiple existing supplier contracts",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      EntityOIDZ.describe("OID of supplier contract to update"),
      UpdateSupplierContractZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated supplier contracts")),
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
      200: z.boolean(),
    },
  },
});
