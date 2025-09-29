import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { TransactionZ } from "../../entities/Sales/Transaction";
import { DateISOStringZ } from "../../types/date";
import { NamedURLZ } from "../../types/url";


const basePath = "/api/sales/transactions";

// Transaction only has public CRUD endpoints (PaymentOrder is internal)
const CreateTransactionZ = TransactionZ.pick({
  tenantOID: true,
  paymentOrderOID: true,
  payerFirstName: true,
  payerLastName: true,
  payerMobile: true,
  payerEmail: true,
  amount: true,
  serviceFee: true,
  transactionType: true,
  transactionDate: true,
  paymentWayOID: true,
  status: true,
  transactionReference: true,
  notes: true,
  metadata: true,
  files: true,
});

export type CreateTransaction = z.infer<typeof CreateTransactionZ>;

const UpdateReceiptTransactionZ = z.object({
  internalRemarks: z.string().nullable().optional(),
  externalRemarks: z.string().nullable().optional(),
  payerFirstName: z.string().nullable().optional(),
  payerLastName: z.string().nullable().optional(),
  transactionDate: DateISOStringZ.optional(),
  paymentWayOID: EntityOIDZ.nullable().optional(),
  files: z.array(NamedURLZ).optional(),
});

export type UpdateReceiptTransaction = z.infer<typeof UpdateReceiptTransactionZ>;

export const transactionContract = initContract().router({
  getTransactions: {
    summary: "Get transactions",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      paymentOrderOID: z.string().optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createTransaction: {
    summary: "Create a new transaction",
    method: "POST",
    path: basePath,
    body: CreateTransactionZ,
    responses: {
      200: z.string(),
    },
  },

  reverseTransaction: {
    summary: "Reverse a transaction",
    method: "POST",
    path: `${basePath}/:transactionOID/reverse`,
    pathParams: z.object({ transactionOID: z.string() }),
    body: z.object({ reason: z.string().optional() }),
    responses: { 200: z.string() },
  },

  updateReceiptTransaction: {
    summary: "Update editable receipt fields",
    method: "PATCH",
    path: `${basePath}/:transactionOID`,
    pathParams: z.object({ transactionOID: z.string() }),
    body: UpdateReceiptTransactionZ,
    responses: {
      200: z.string(),
    },
  },

});
