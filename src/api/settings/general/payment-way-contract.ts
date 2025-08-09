import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { PaymentMode, PaymentWayStatus, PaymentWayZ } from "../../../entities/Settings/General/PaymentWay";


const basePath = "/api/settings/payment-ways";

const CreatePaymentWayZ = PaymentWayZ.pick({
  tenantOID: true,
  code: true,
  name: true,
  description: true,
  mode: true,
  status: true,
  
  debitAccountCodeId: true,
  creditAccountCodeId: true,
  feeAccountCodeId: true,
  
  percentageFee: true,
  fixedFee: true,
  minFee: true,
  maxFee: true,
  
  isDefault: true,
  isPaymentLink: true,
  isDaily: true,
  isEvent: true,
  isRefund: true,
  isBulkPayment: true,
  
  displayOrder: true,
  icon: true,
  color: true,
  
  metadata: true,
});

const UpdatePaymentWayZ = CreatePaymentWayZ.omit({
  tenantOID: true,
  code: true,
}).partial();

const PaymentWayListParamsZ = z.object({
  tenantOID: z.string(),
  mode: z.nativeEnum(PaymentMode).optional(),
  status: z.nativeEnum(PaymentWayStatus).optional(),
  isDefault: z.boolean().optional(),
  isPaymentLink: z.boolean().optional(),
  isDaily: z.boolean().optional(),
  isEvent: z.boolean().optional(),
  isRefund: z.boolean().optional(),
  isBulkPayment: z.boolean().optional(),
  search: z.string().optional(),
}).passthrough();

export type CreatePaymentWay = z.infer<typeof CreatePaymentWayZ>;
export type UpdatePaymentWay = z.infer<typeof UpdatePaymentWayZ>;
export type PaymentWayListParams = z.infer<typeof PaymentWayListParamsZ>;

export const paymentWayContract = initContract().router({
  getPaymentWays: {
    summary: "Get payment ways",
    method: "GET",
    path: basePath,
    query: PaymentWayListParamsZ,
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },
  
  createPaymentWay: {
    summary: "Create a new payment way",
    method: "POST",
    path: basePath,
    body: CreatePaymentWayZ,
    responses: {
      200: z.string(),
    },
  },
  
  updatePaymentWay: {
    summary: "Update an existing payment way",
    method: "PATCH",
    path: `${basePath}/:paymentWayOID`,
    body: UpdatePaymentWayZ,
    responses: {
      200: z.string(),
    },
  },
  
  updatePaymentWays: {
    summary: "Update multiple existing payment ways",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of payment way to update"),
      UpdatePaymentWayZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated payment ways")),
    },
  },
  
  deletePaymentWay: {
    summary: "Delete a payment way",
    method: "DELETE",
    path: `${basePath}/:paymentWayOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
  
  deletePaymentWays: {
    summary: "Delete multiple payment ways",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      paymentWayOIDs: z.array(z.string().describe("OIDs of payment ways to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  
  bulkImportPaymentWays: {
    summary: "Bulk import payment ways",
    method: "POST",
    path: `${basePath}/bulk-import`,
    body: z.object({
      tenantOID: z.string(),
      paymentWays: z.array(CreatePaymentWayZ.omit({ tenantOID: true })),
    }),
    responses: {
      200: z.object({
        imported: z.number(),
        failed: z.number(),
        errors: z.array(z.object({
          index: z.number(),
          code: z.string(),
          message: z.string(),
        })).optional(),
      }),
    },
  },
  
  getActivePaymentWays: {
    summary: "Get active payment ways for specific use case",
    method: "GET",
    path: `${basePath}/active`,
    query: z.object({
      tenantOID: z.string(),
      purpose: z.enum(["daily", "event", "payment-link", "refund", "bulk-payment"]).optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },
  
  getDefaultPaymentWay: {
    summary: "Get default payment way for tenant",
    method: "GET",
    path: `${basePath}/default`,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oid: z.string().optional(),
      }),
    },
  },
  
  setDefaultPaymentWay: {
    summary: "Set default payment way for tenant",
    method: "POST",
    path: `${basePath}/default`,
    body: z.object({
      tenantOID: z.string(),
      paymentWayOID: z.string(),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  
  calculateFee: {
    summary: "Calculate fee for a transaction amount",
    method: "POST",
    path: `${basePath}/calculate-fee`,
    body: z.object({
      paymentWayOID: z.string(),
      amount: z.number().positive(),
    }),
    responses: {
      200: z.object({
        percentageFee: z.number(),
        fixedFee: z.number(),
        totalFee: z.number(),
        netAmount: z.number(),
      }),
    },
  },
});