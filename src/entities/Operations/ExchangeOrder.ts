import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";

/**
 * Exchange Order type enum
 */
export enum ExchangeOrderType {
  PURCHASE = "purchase",
  SALE = "sale",
  TRANSFER = "transfer",
  REFUND = "refund",
  ADJUSTMENT = "adjustment",
}

/**
 * Exchange Order status enum
 */
export enum ExchangeOrderStatus {
  DRAFT = "draft",
  WFA = "wfa",
  APPROVED = "approved",
  REJECTED = "rejected",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  VOIDED = "voided",
}

export enum ExchangeOrderEvents {
  EXCHANGE_ORDER_UPDATED = "EXCHANGE_ORDER_UPDATED",
  EXCHANGE_ORDER_LIST_UPDATED = "EXCHANGE_ORDER_LIST_UPDATED",
}

/**
 * Zod schema for ExchangeOrder
 */
export const ExchangeOrderZ = EntityZ.extend({
  entityType: z.literal(EntityType.EXCHANGE_ORDER),

  exchangeOrderNo: z.string(),
  status: z.nativeEnum(ExchangeOrderStatus),

  issueDate: z.string(),
  dueDate: z.string().optional(),

  parentExchangeOrderOID: EntityOIDZ.optional(),
  budgetOID: EntityOIDZ.optional(),
  supplierOID: EntityOIDZ.optional(),

  // Supplier-related fields (1:1 relationship)
  supplierPersonOID: EntityOIDZ.optional(),
  supplierPaymentOID: EntityOIDZ.optional(),
  supplierAddressOID: EntityOIDZ.optional(),

  totalAmount: z.number(),
  currency: z.string(),

  remarks: z.string().optional(),

  isArchived: z.boolean(),

  // Bill relationship fields
  billOID: EntityOIDZ.optional(),
  billUsedAmount: z.number().optional(),
});

export type ExchangeOrder = z.infer<typeof ExchangeOrderZ>;
