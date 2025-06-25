import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/operations/supplier-addresses";

export const supplierAddressContract = initContract().router({
  getSupplierAddresses: {
    method: "GET",
    path: `${basePath}`,
    query: z.object({
      tenantOID: z.string(),
      supplierOID: z.string().optional(),
    }),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
    summary: "Get all supplier addresses for a tenant",
  },

  createSupplierAddress: {
    method: "POST",
    path: `${basePath}`,
    body: z.object({
      tenantOID: z.string(),
      supplierOID: z.string(),
      addressType: z.string(),
      addressLine1: z.string(),
      addressLine2: z.string().optional(),
      city: z.string(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string(),
      phone: z.string().optional(),
      fax: z.string().optional(),
      email: z.string().optional(),
      contactPerson: z.string().optional(),
      isDefault: z.boolean().optional(),
      isActive: z.boolean().optional(),
    }),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oid: z.string(),
        }),
      }),
    },
    summary: "Create a new supplier address",
  },

  updateSupplierAddresses: {
    method: "PUT",
    path: `${basePath}`,
    body: z.array(z.object({
      oid: z.string(),
      supplierOID: z.string().optional(),
      addressType: z.string().optional(),
      addressLine1: z.string().optional(),
      addressLine2: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
      phone: z.string().optional(),
      fax: z.string().optional(),
      email: z.string().optional(),
      contactPerson: z.string().optional(),
      isDefault: z.boolean().optional(),
      isActive: z.boolean().optional(),
    })),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
    summary: "Update multiple supplier addresses",
  },

  deleteSupplierAddresses: {
    method: "DELETE",
    path: `${basePath}`,
    body: z.object({
      oids: z.array(z.string()),
    }),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
    summary: "Delete multiple supplier addresses",
  },
});