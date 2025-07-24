import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SupplierPaymentZ } from "../../entities/Operations/SupplierPayment";


const basePath = "/api/operations/supplier-payments";

const CreateSupplierPaymentZ = SupplierPaymentZ.pick({
  tenantOID: true,
  supplierOID: true,
  paymentType: true,
  bankName: true,
  accountNumber: true,
  accountName: true,
  bankCode: true,
  routingNumber: true,
  swiftCode: true,
  iban: true,
  currency: true,
  paymentTerms: true,
  isDefault: true,
  remarks: true,
});

const UpdateSupplierPaymentZ = CreateSupplierPaymentZ.omit({
  tenantOID: true,
}).partial().extend({
  oid: z.string(),
});

export type CreateSupplierPayment = z.infer<typeof CreateSupplierPaymentZ>;
export type UpdateSupplierPayment = z.infer<typeof UpdateSupplierPaymentZ>;

export const supplierPaymentContract = initContract().router({
  getSupplierPayments: {
    summary: "Get all supplier payments for a tenant",
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

  createSupplierPayment: {
    summary: "Create a new supplier payment",
    method: "POST",
    path: basePath,
    body: CreateSupplierPaymentZ,
    responses: {
      200: z.string(),
    },
  },

  updateSupplierPayments: {
    summary: "Update multiple supplier payments",
    method: "PUT",
    path: basePath,
    body: z.record(
      z.string().describe("OID of supplier payment to update"),
      UpdateSupplierPaymentZ,
    ),
    responses: {
      200: z.array(z.string()),
    },
  },

  deleteSupplierPayments: {
    summary: "Delete multiple supplier payments",
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
