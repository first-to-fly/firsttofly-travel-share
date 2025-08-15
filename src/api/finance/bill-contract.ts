import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { BillCategory, BillPaymentStatus, BillStatus, BillZ } from "../../entities/Finance/Bill";


const basePath = "/api/operations/bills";

const CreateBillZ = BillZ.pick({
  tenantOID: true,
  invoiceNo: true,
  status: true,
  paymentStatus: true,
  issueDate: true,
  dueDate: true,
  supplierOID: true,
  totalAmount: true,
  currency: true,
  category: true,
  currencyRate: true,
  files: true,
  remarks: true,
  internalNotes: true,
}).extend({
  code: BillZ.shape.code.optional(),
});

const UpdateBillZ = CreateBillZ.omit({
  tenantOID: true,
  code: true,
  category: true,
}).partial();

const BillListParamsZ = z.object({
  tenantOID: z.string(),
  supplierOID: z.string().optional(),
  status: z.nativeEnum(BillStatus).optional(),
  paymentStatus: z.nativeEnum(BillPaymentStatus).optional(),
  category: z.nativeEnum(BillCategory).optional(),
}).passthrough();

const LinkItemsToBillZ = z.object({
  exchangeOrderItems: z.array(z.object({
    exchangeOrderOID: z.string(),
    amountUsed: z.number().positive(),
  })).optional(),
  matchDocItems: z.array(z.object({
    matchDocOID: z.string(),
    amountUsed: z.number().positive(),
  })).optional(),
});

const UnbilledItemsParamsZ = z.object({
  tenantOID: z.string(),
  supplierOID: z.string(),
}).passthrough();

export type CreateBill = z.infer<typeof CreateBillZ>;
export type UpdateBill = z.infer<typeof UpdateBillZ>;
export type BillListParams = z.infer<typeof BillListParamsZ>;
export type LinkItemsToBill = z.infer<typeof LinkItemsToBillZ>;
export type UnbilledItemsParams = z.infer<typeof UnbilledItemsParamsZ>;

export const billContract = initContract().router({

  getBills: {
    summary: "Get bills",
    method: "GET",
    path: basePath,
    query: BillListParamsZ,
    responses: { 200: z.object({ oids: z.array(z.string()) }) },
  },

  createBill: {
    summary: "Create a new bill",
    method: "POST",
    path: basePath,
    body: CreateBillZ,
    responses: { 200: z.string() },
  },

  batchUpdateBills: {
    summary: "Update multiple bills",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateBillZ),
    responses: { 200: z.array(z.string()) },
  },

  batchStatus: {
    summary: "Update statuses of multiple bills",
    method: "POST",
    path: `${basePath}/batch-status`,
    body: z.record(
      z.string().describe("OID of bill to update"),
      z.object({ status: z.nativeEnum(BillStatus) }),
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated bills")),
    },
  },

  batchPaymentStatus: {
    summary: "Update payment statuses of multiple bills",
    method: "POST",
    path: `${basePath}/batch-payment-status`,
    body: z.record(
      z.string().describe("OID of bill to update"),
      z.object({ paymentStatus: z.nativeEnum(BillPaymentStatus) }),
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated bills")),
    },
  },

  linkItemsToBill: {
    summary: "Link ExchangeOrders and MatchDocs to a bill",
    method: "POST",
    path: `${basePath}/:billOID/link-items`,
    pathParams: z.object({ billOID: z.string() }),
    body: LinkItemsToBillZ,
    responses: { 200: z.boolean() },
  },

  unlinkItemsFromBill: {
    summary: "Unlink ExchangeOrders and MatchDocs from a bill",
    method: "POST",
    path: `${basePath}/:billOID/unlink-items`,
    pathParams: z.object({ billOID: z.string() }),
    body: z.object({
      exchangeOrderOIDs: z.array(z.string()).optional(),
      matchDocOIDs: z.array(z.string()).optional(),
    }),
    responses: { 200: z.boolean() },
  },

  getUnbilledExchangeOrders: {
    summary: "Get unbilled ExchangeOrders for a supplier",
    method: "GET",
    path: `${basePath}/unbilled-exchange-orders`,
    query: UnbilledItemsParamsZ,
    responses: { 200: z.object({ oids: z.array(z.string()) }) },
  },

  getUnbilledMatchDocs: {
    summary: "Get unbilled MatchDocs for a supplier",
    method: "GET",
    path: `${basePath}/unbilled-match-docs`,
    query: UnbilledItemsParamsZ,
    responses: { 200: z.object({ oids: z.array(z.string()) }) },
  },

  deleteBills: {
    summary: "Delete multiple bills",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      billOIDs: z.array(z.string().describe("OIDs of bills to delete")),
    }),
    responses: { 200: z.boolean() },
  },

});
