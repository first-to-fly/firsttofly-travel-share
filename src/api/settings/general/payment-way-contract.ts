import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { PaymentMethod } from "../../../entities/Sales/Transaction";
import { PaymentWayZ } from "../../../entities/Settings/General/PaymentWay";


const basePath = "/api/settings/payment-ways";

const CreatePaymentWayZ = PaymentWayZ.pick({
  tenantOID: true,
  paymentMethod: true,
  name: true,
  mode: true,
  status: true,
  icon: true,
  remarks: true,
  isDaily: true,
  isEvent: true,
  paymentConfigs: true,
});

const UpdatePaymentWayZ = CreatePaymentWayZ.omit({
  tenantOID: true,
  code: true,
}).partial();

const PaymentWayListParamsZ = z.object({
  tenantOID: z.string(),
  paymentMethod: z.nativeEnum(PaymentMethod).optional(),
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

  getActivePaymentWays: {
    summary: "Get active payment ways for specific use case",
    method: "GET",
    path: `${basePath}/active`,
    query: z.object({
      tenantOID: z.string(),
      purpose: z.enum(["daily", "event"]).optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
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
