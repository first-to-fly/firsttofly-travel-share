import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/xero/transactions";

export const BuildTxnStateZ = z.object({
  tenantOID: z.string(),
  transactionOIDs: z.array(z.string()).min(1),
  xeroType: z.enum(["invoice_based", "transaction_based"]).default("invoice_based"),
  xeroPaymentType: z.enum(["refund", "receipt", "cancellationFee"]).optional(),
  header: z.object({
    narration: z.string().optional(),
    date: z.string().optional(),
  }).partial().optional(),
  lineOverrides: z.record(z.string(), z.object({
    accountCode: z.string().optional(),
    taxType: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  contactId: z.string().optional(),
  hasAttachments: z.boolean().optional(),
});

export type BuildTxnState = z.infer<typeof BuildTxnStateZ>;

export const TxnPreviewZ = z.object({
  stateId: z.string(),
  header: z.object({
    narration: z.string().nullable().optional(),
    date: z.string().nullable().optional(),
    contactId: z.string().nullable().optional(),
  }).passthrough(),
  lines: z.array(z.object({
    description: z.string(),
    debit: z.number().default(0),
    credit: z.number().default(0),
    accountCode: z.string().nullable().optional(),
    taxType: z.string().nullable().optional(),
  })),
  totals: z.object({
    debit: z.number(),
    credit: z.number(),
  }),
  posting: z.object({
    docType: z.enum(["ACCREC", "ACCRECCREDIT", "MANUALJOURNAL"]).optional(),
  }).optional(),
});

export const SubmitTxnPostZ = z.object({
  stateId: z.string(),
  xeroContactId: z.string().optional(),
});

export const SubmitTxnResultZ = z.object({
  success: z.boolean(),
  xeroId: z.string().optional(),
  errors: z.array(z.string()).optional(),
});

export const xeroTransactionContract = initContract().router({

  buildState: {
    summary: "Build posting state for selected transactions",
    method: "POST",
    path: `${basePath}/state`,
    body: BuildTxnStateZ,
    responses: { 200: z.object({ stateId: z.string() }) },
  },

  updateState: {
    summary: "Update posting state header or overrides",
    method: "POST",
    path: `${basePath}/update-state`,
    body: z.object({
      stateId: z.string(),
      header: z.record(z.any()).optional(),
      lineOverrides: z.record(z.string(), z.record(z.any())).optional(),
      contactId: z.string().optional(),
      hasAttachments: z.boolean().optional(),
    }),
    responses: { 200: z.boolean() },
  },

  preview: {
    summary: "Preview composed transaction payload",
    method: "POST",
    path: `${basePath}/preview`,
    body: z.object({ stateId: z.string() }),
    responses: { 200: TxnPreviewZ },
  },

  submit: {
    summary: "Submit transaction state to Xero (invoice/credit note/manual journal)",
    method: "POST",
    path: `${basePath}/submit`,
    body: SubmitTxnPostZ,
    responses: { 200: SubmitTxnResultZ },
  },

});
