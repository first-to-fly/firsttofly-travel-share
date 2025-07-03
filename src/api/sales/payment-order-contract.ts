import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/sales/payment-orders";

// PaymentOrder is internal service only - only exposing read operations
export const paymentOrderContract = initContract().router({
  getPaymentOrders: {
    summary: "Get payment orders for tenant",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },
});
