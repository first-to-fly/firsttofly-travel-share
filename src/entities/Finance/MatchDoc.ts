import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";

/**
 * Match Document status enum
 */
export enum MatchDocStatus {
  DRAFT = "draft",
  SUBMITTED = "submitted",
  APPROVED = "approved",
  REJECTED = "rejected",
  COMPLETED = "completed",
  VOIDED = "voided",
}

export enum MatchDocEvents {
  MATCH_DOC_UPDATED = "MATCH_DOC_UPDATED",
  MATCH_DOC_LIST_UPDATED = "MATCH_DOC_LIST_UPDATED",
}

export enum MatchDocCategory {
  PAYMENT_MADE = "payment-made",
  PAYMENT_RECEIVED = "payment-received",
  BUDGET_TRANSFER = "budget-transfer",
}

/**
 * Zod schema for MatchDoc
 */
export const MatchDocZ = EntityZ.extend({
  entityType: z.literal(EntityType.MATCH_DOC),

  code: z.string(),
  status: z.nativeEnum(MatchDocStatus),
  category: z.nativeEnum(MatchDocCategory),

  issueDate: z.string(),
  dueDate: z.string().nullish(),

  // Supplier reference
  supplierOID: EntityOIDZ.nullish(),

  totalAmount: z.number(),
  currency: z.string(),
  currencyRate: z.number().nullish(),
  foreignAmount: z.number().nullish(),
  localAmount: z.number().nullish(),

  remarks: z.string().nullish(),
  documentUrl: z.string().nullish(),

  isArchived: z.boolean(),

  // Bill relationship fields
  billOID: EntityOIDZ.nullish(),
  billUsedAmount: z.number().nullish(),
});

export type MatchDoc = z.infer<typeof MatchDocZ>;
