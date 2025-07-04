import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";

export enum PaymentOrderStatus {
  PENDING = "pending",
  PARTIAL = "partial",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export const PaymentOrderStatusZ = z.nativeEnum(PaymentOrderStatus);

export const PaymentOrderZ = EntityZ.extend({
  amount: z.number().positive(),
  received: z.number().min(0).default(0),
  minPaymentPrice: z.number().positive(),
  currencyCode: z.string().length(3),
  status: PaymentOrderStatusZ,
  groupTourBookingOID: EntityOIDZ,
});

export type PaymentOrder = z.infer<typeof PaymentOrderZ>;

export enum PaymentOrderEvents {
  PAYMENT_ORDER_UPDATED = "PAYMENT_ORDER_UPDATED",
  PAYMENT_ORDER_LIST_UPDATED = "PAYMENT_ORDER_LIST_UPDATED",
}