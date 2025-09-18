import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ExchangeOrderStatus, ExchangeOrderZ } from "../../entities/Operations/ExchangeOrder";


const basePath = "/api/operations/exchange-orders";

const CreateExchangeOrderZ = ExchangeOrderZ.pick({
  tenantOID: true,
  issueDate: true,
  dueDate: true,
  budgetOID: true,
  supplierOID: true,
  supplierPersonOID: true,
  supplierPaymentOID: true,
  supplierAddressOID: true,
  currency: true,
  remarks: true,
  isArchived: true,
  billOID: true,
  billUsedAmount: true,
}).extend({
  exchangeOrderNo: ExchangeOrderZ.shape.exchangeOrderNo.optional(),
});

const UpdateExchangeOrderZ = CreateExchangeOrderZ.omit({
  tenantOID: true,
  exchangeOrderNo: true,
  status: true,
}).partial();

const ExchangeOrderListParamsZ = z.object({
  tenantOID: z.string(),
  tourDepartureOID: z.string().optional(),
  parentExchangeOrderOID: z.string().optional(),
}).passthrough();

// Batch Create and Link types
const BatchCreateAndLinkItemZ = z.object({
  budgetEntryOID: z.string(),
  quantity: z.number(),
  unitAmount: z.number(),
  tax: z.number(),
  total: z.number(),
});

const BatchCreateAndLinkGroupZ = z.object({
  supplierOID: z.string(),
  currency: z.string(),
  items: z.array(BatchCreateAndLinkItemZ),
});

const BatchCreateAndLinkExchangeOrdersRequestZ = z.object({
  tenantOID: z.string(),
  tourDepartureOID: z.string(),
  groups: z.array(BatchCreateAndLinkGroupZ),
});

export type CreateExchangeOrder = z.infer<typeof CreateExchangeOrderZ>;
export type UpdateExchangeOrder = z.infer<typeof UpdateExchangeOrderZ>;
export type ExchangeOrderListParams = z.infer<typeof ExchangeOrderListParamsZ>;
export type BatchCreateAndLinkExchangeOrdersRequest = z.infer<typeof BatchCreateAndLinkExchangeOrdersRequestZ>;

export const exchangeOrderContract = initContract().router({

  getExchangeOrders: {
    summary: "Get exchange orders",
    method: "GET",
    path: basePath,
    query: ExchangeOrderListParamsZ,
    responses: { 200: z.object({ oids: z.array(z.string()) }) },
  },

  createExchangeOrder: {
    summary: "Create a new exchange order",
    method: "POST",
    path: basePath,
    body: CreateExchangeOrderZ,
    responses: { 200: z.string() },
  },

  batchUpdateExchangeOrders: {
    summary: "Update multiple exchange orders",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateExchangeOrderZ),
    responses: { 200: z.array(z.string()) },
  },

  batchStatus: {
    summary: "Update statuses of multiple exchange orders",
    method: "POST",
    path: `${basePath}/batch-status`,
    body: z.record(
      z.string().describe("OID of exchange order to update"),
      z.object({ status: z.nativeEnum(ExchangeOrderStatus) }),
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated exchange orders")),
    },
  },

  deleteExchangeOrders: {
    summary: "Delete multiple exchange orders",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      exchangeOrderOIDs: z.array(z.string().describe("OIDs of exchange orders to delete")),
    }),
    responses: { 200: z.boolean() },
  },

  batchCreateAndLinkExchangeOrders: {
    summary: "Batch create exchange orders and link items to budget entries",
    method: "POST",
    path: `${basePath}/batch-create-and-link`,
    body: BatchCreateAndLinkExchangeOrdersRequestZ,
    responses: { 200: z.array(z.string().describe("OIDs of created exchange orders")) },
  },

});
