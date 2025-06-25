import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/operations/supplier-payments";

export const supplierPaymentContract = initContract().router({
  getSupplierPayments: {
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
    summary: "Get all supplier payments for a tenant",
  },

  createSupplierPayment: {
    method: "POST",
    path: `${basePath}`,
    body: z.object({
      tenantOID: z.string(),
      supplierOID: z.string(),
      paymentType: z.string(),
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
      accountName: z.string().optional(),
      routingNumber: z.string().optional(),
      swiftCode: z.string().optional(),
      iban: z.string().optional(),
      currency: z.string().optional(),
      paymentTerms: z.string().optional(),
      creditLimit: z.number().optional(),
      isDefault: z.boolean().optional(),
      isActive: z.boolean().optional(),
      paymentInfo: z.any().optional(),
    }),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oid: z.string(),
        }),
      }),
    },
    summary: "Create a new supplier payment",
  },

  updateSupplierPayments: {
    method: "PUT",
    path: `${basePath}`,
    body: z.array(z.object({
      oid: z.string(),
      supplierOID: z.string().optional(),
      paymentType: z.string().optional(),
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
      accountName: z.string().optional(),
      routingNumber: z.string().optional(),
      swiftCode: z.string().optional(),
      iban: z.string().optional(),
      currency: z.string().optional(),
      paymentTerms: z.string().optional(),
      creditLimit: z.number().optional(),
      isDefault: z.boolean().optional(),
      isActive: z.boolean().optional(),
      paymentInfo: z.any().optional(),
    })),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
    summary: "Update multiple supplier payments",
  },

  deleteSupplierPayments: {
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
    summary: "Delete multiple supplier payments",
  },
});