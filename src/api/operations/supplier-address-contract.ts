import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SupplierAddressZ } from "../../entities/Operations/SupplierAddress";


const basePath = "/api/operations/supplier-addresses";

const CreateSupplierAddressZ = SupplierAddressZ.pick({
  tenantOID: true,
  supplierOID: true,
  addressType: true,
  addressLine1: true,
  addressLine2: true,
  city: true,
  state: true,
  postalCode: true,
  country: true,
}).extend({
  isDefaultAddress: z.boolean().optional(),
});

const UpdateSupplierAddressZ = CreateSupplierAddressZ.omit({
  tenantOID: true,
}).partial().extend({
  oid: z.string(),
});

export type CreateSupplierAddress = z.infer<typeof CreateSupplierAddressZ>;
export type UpdateSupplierAddress = z.infer<typeof UpdateSupplierAddressZ>;

export const supplierAddressContract = initContract().router({
  getSupplierAddresses: {
    summary: "Get all supplier addresses for a tenant",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      supplierOID: z.string().optional(),
    }),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createSupplierAddress: {
    summary: "Create a new supplier address",
    method: "POST",
    path: basePath,
    body: CreateSupplierAddressZ,
    responses: {
      200: z.string(),
    },
  },

  updateSupplierAddresses: {
    summary: "Update multiple supplier addresses",
    method: "PUT",
    path: basePath,
    body: z.record(
      z.string().describe("OID of supplier address to update"),
      UpdateSupplierAddressZ,
    ),
    responses: {
      200: z.array(z.string()),
    },
  },

  deleteSupplierAddresses: {
    summary: "Delete multiple supplier addresses",
    method: "DELETE",
    path: basePath,
    body: z.object({
      oids: z.array(z.string()),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
