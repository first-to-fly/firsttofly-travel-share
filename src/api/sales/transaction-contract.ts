import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TransactionZ } from "../../entities/Sales/Transaction";


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

});
