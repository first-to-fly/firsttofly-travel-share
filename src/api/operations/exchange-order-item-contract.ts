import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ExchangeOrderItemZ } from "../../entities/Operations/ExchangeOrderItem";


const basePath = "/api/operations/exchange-order-items";

const CreateExchangeOrderItemZ = ExchangeOrderItemZ.pick({
  tenantOID: true,
  exchangeOrderOID: true,
  order: true,
  name: true,
  quantity: true,
  unitPrice: true,
});

const UpdateExchangeOrderItemZ = CreateExchangeOrderItemZ.omit({
  tenantOID: true,
  exchangeOrderOID: true,
}).partial();

export type CreateExchangeOrderItem = z.infer<typeof CreateExchangeOrderItemZ>;
export type UpdateExchangeOrderItem = z.infer<typeof UpdateExchangeOrderItemZ>;

export const exchangeOrderItemContract = initContract().router({

  getExchangeOrderItems: {
    summary: "Get exchange order items",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      exchangeOrderOID: z.string().optional(),
    }).passthrough(),
    responses: { 200: z.object({ oids: z.array(z.string()) }) },
  },

  createExchangeOrderItem: {
    summary: "Create a new exchange order item",
    method: "POST",
    path: basePath,
    body: CreateExchangeOrderItemZ,
    responses: { 200: z.string() },
  },

  batchUpdateExchangeOrderItems: {
    summary: "Update multiple exchange order items",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateExchangeOrderItemZ),
    responses: { 200: z.array(z.string()) },
  },

  linkToBudgetEntries: {
    summary: "Link exchange order item to budget entries",
    method: "POST",
    path: `${basePath}/link-to-budget-entries`,
    body: z.record(
      z.string().describe("Exchange order item OID"),
      z.array(z.object({
        budgetEntryOID: z.string(),
        amountUsed: z.number(),
      })),
    ),
    responses: { 200: z.boolean() },
  },

  deleteExchangeOrderItems: {
    summary: "Delete multiple exchange order items",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      exchangeOrderItemOIDs: z.array(z.string().describe("OIDs of exchange order items to delete")),
    }),
    responses: { 200: z.boolean() },
  },

});
