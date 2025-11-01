import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/xero/bills";

// Shared types
// Bills/CreditNotes: accountCode and taxType can be modified from client side
// All other fields (amount, description) are read-only and determined server-side
// lineOverrides are keyed by preview lineId (bill + source identifier)
export const XeroLineOverrideZ = z.object({
  accountCode: z.string().optional(),
  taxType: z.string().optional(),
});

export const BuildBillStateZ = z.object({
  tenantOID: z.string(),
  billOIDs: z.array(z.string()).min(1),
  header: z.object({
    narration: z.string().optional(),
    date: z.string().optional(),
    dueDate: z.string().optional(),
    currency: z.string().optional(),
  }).partial().optional(),
  lineOverrides: z.record(z.string(), XeroLineOverrideZ).optional(),
});

export type BuildBillState = z.infer<typeof BuildBillStateZ>;

export const BillPreviewLineZ = z.object({
  lineId: z.string(),
  description: z.string(),
  quantity: z.number(),
  unitAmount: z.number(),
  amount: z.number(),
  accountCode: z.string().nullable().optional(),
  taxType: z.string().nullable().optional(),
  source: z.object({
    type: z.string(),
    id: z.string(),
  }).optional(),
});

export const BillPreviewBillZ = z.object({
  billId: z.string(),
  code: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  totalAmount: z.number().nullable().optional(),
  isCredit: z.boolean().optional(),
  lineItems: z.array(BillPreviewLineZ),
  totals: z.object({
    subtotal: z.number(),
    tax: z.number().optional(),
    total: z.number(),
  }),
});

export const BillPreviewZ = z.object({
  stateId: z.string(),
  header: z.object({
    narration: z.string().nullable().optional(),
    date: z.string().nullable().optional(),
    dueDate: z.string().nullable().optional(),
    currency: z.string().nullable().optional(),
    supplierContactId: z.string().nullable().optional(),
  }).passthrough(),
  bills: z.array(BillPreviewBillZ),
  totals: z.object({
    subtotal: z.number(),
    tax: z.number().optional(),
    total: z.number(),
    isCredit: z.boolean().optional(),
  }),
});

export const SubmitBillPostZ = z.object({
  stateId: z.string(),
  tenantOID: z.string(),
  xeroContactId: z.string(),
});

export const SubmitBillResultZ = z.object({
  success: z.boolean(),
  xeroInvoiceIds: z.array(z.string()).min(1).optional(),
  errors: z.array(z.string()).optional(),
});

export const xeroBillContract = initContract().router({

  buildState: {
    summary: "Build posting state for selected bills",
    method: "POST",
    path: `${basePath}/state`,
    body: BuildBillStateZ,
    responses: { 200: z.object({ stateId: z.string() }) },
  },

  preview: {
    summary: "Preview composed bill payload",
    method: "POST",
    path: `${basePath}/preview`,
    body: z.object({
      stateId: z.string(),
      tenantOID: z.string(),
    }),
    responses: { 200: BillPreviewZ },
  },

  submit: {
    summary: "Submit state to Xero as ACCPAY/ACCPAYCREDIT",
    method: "POST",
    path: `${basePath}/submit`,
    body: SubmitBillPostZ,
    responses: { 200: SubmitBillResultZ },
  },

});
