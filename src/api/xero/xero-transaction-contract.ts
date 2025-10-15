import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/xero/transactions";

// Transactions: All fields are READ-ONLY (view only)
// Account codes are automatically resolved server-side based on transaction type and rules
// Unlike Bills/CreditNotes, transactions do not support client-side modifications
export const BuildTxnStateZ = z.object({
  tenantOID: z.string(),
  transactionOIDs: z.array(z.string()).min(1),
  xeroType: z.enum(["invoice_based", "transaction_based"]).default("invoice_based"),
  xeroPaymentType: z.enum(["refund", "receipt", "cancellationFee"]).optional(),
  header: z.object({
    narration: z.string().optional(),
    date: z.string().optional(),
  }).partial().optional(),
  // lineOverrides removed - transactions are view-only
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
    docType: z.enum(["ACCREC", "ACCRECCREDIT", "ACCPAY", "MANUALJOURNAL"]).optional(),
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

  // updateState removed - transactions are view-only and do not support client-side modifications
  // All state updates are handled automatically during preview based on server-side rules

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
