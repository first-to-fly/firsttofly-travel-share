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
  dueDate: z.string().nullish(),

  parentExchangeOrderOID: EntityOIDZ.nullish(),
  budgetOID: EntityOIDZ.nullish(),
  supplierOID: EntityOIDZ,

  // Supplier-related fields (1:1 relationship)
  supplierPersonOID: EntityOIDZ.nullish(),
  supplierPaymentOID: EntityOIDZ.nullish(),
  supplierAddressOID: EntityOIDZ.nullish(),

  currency: z.string(),

  remarks: z.string().nullish(),

  isArchived: z.boolean(),

  // Bill relationship fields
  billOID: EntityOIDZ.nullish(),
  billUsedAmount: z.number().nullish(),
});

export type ExchangeOrder = z.infer<typeof ExchangeOrderZ>;
