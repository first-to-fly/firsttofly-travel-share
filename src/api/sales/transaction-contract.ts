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
  paymentWay: true,
  status: true,
  transactionReference: true,
  notes: true,
  metadata: true,
  files: true,
});

const UpdateTransactionZ = CreateTransactionZ.omit({
  tenantOID: true,
  paymentOrderOID: true,
}).partial();

export type CreateTransaction = z.infer<typeof CreateTransactionZ>;
export type UpdateTransaction = z.infer<typeof UpdateTransactionZ>;

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

  updateTransactions: {
    summary: "Update multiple existing transactions",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of transaction to update"),
      UpdateTransactionZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated transactions")),
    },
  },

  deleteTransactions: {
    summary: "Delete multiple transactions",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      transactionOIDs: z.array(z.string().describe("OIDs of transactions to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
