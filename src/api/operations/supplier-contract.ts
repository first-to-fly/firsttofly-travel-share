import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SupplierCategory, SupplierStatus, SupplierType } from "../../entities/Operations/Supplier";


const basePath = "/api/operations/suppliers";

export const supplierContract = initContract().router({
  getSuppliers: {
    method: "GET",
    path: `${basePath}`,
    query: z.object({
      tenantOID: z.string(),
      types: z.array(z.nativeEnum(SupplierType)).optional(),
      categories: z.array(z.nativeEnum(SupplierCategory)).optional(),
      status: z.array(z.nativeEnum(SupplierStatus)).optional(),
    }),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
    summary: "Get all suppliers for a tenant with optional filters",
  },

  createSupplier: {
    method: "POST",
    path: `${basePath}`,
    body: z.object({
      tenantOID: z.string(),
      name: z.string(),
      code: z.string(),
      shortName: z.string(),
      type: z.string().optional(),
      category: z.string().optional(),
      status: z.string(),
      partnerType: z.string().optional(),
      countries: z.array(z.string()).optional(),
      supplierInfo: z.any().optional(),
      personInChargeOID: z.string().optional(),
      parentOID: z.string().optional(),
      newOID: z.string().optional(),
      remarks: z.string().optional(),
      inactiveRemarks: z.string().optional(),
      mainSupplierPaymentOID: z.string().optional(),
      mainSupplierAddressOID: z.string().optional(),
      paymentTerms: z.number(),
      paymentCreditLimit: z.number(),
      relatedSupplierIds: z.array(z.string()).optional(),
    }),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oid: z.string(),
        }),
      }),
    },
    summary: "Create a new supplier",
  },

  updateSuppliers: {
    method: "PUT",
    path: `${basePath}`,
    body: z.array(z.object({
      oid: z.string(),
      name: z.string().optional(),
      code: z.string().optional(),
      shortName: z.string().optional(),
      type: z.string().optional(),
      category: z.string().optional(),
      status: z.string().optional(),
      partnerType: z.string().optional(),
      countries: z.array(z.string()).optional(),
      supplierInfo: z.any().optional(),
      personInChargeOID: z.string().optional(),
      parentOID: z.string().optional(),
      newOID: z.string().optional(),
      remarks: z.string().optional(),
      inactiveRemarks: z.string().optional(),
      mainSupplierPaymentOID: z.string().optional(),
      mainSupplierAddressOID: z.string().optional(),
      paymentTerms: z.number().optional(),
      paymentCreditLimit: z.number().optional(),
      relatedSupplierIds: z.array(z.string()).optional(),
    })),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
    summary: "Update multiple suppliers",
  },

  deleteSuppliers: {
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
    summary: "Delete multiple suppliers",
  },
});