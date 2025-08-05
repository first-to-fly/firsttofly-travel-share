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

/**
 * Zod schema for MatchDoc
 */
export const MatchDocZ = EntityZ.extend({
  entityType: z.literal(EntityType.MATCH_DOC),

  matchDocNo: z.string(),
  status: z.nativeEnum(MatchDocStatus),

  issueDate: z.string(),
  dueDate: z.string().optional(),

  // Supplier reference
  supplierOID: EntityOIDZ.optional(),

  totalAmount: z.number(),
  currency: z.string(),

  remarks: z.string().optional(),
  documentUrl: z.string().optional(),

  isArchived: z.boolean(),

  // Bill relationship fields
  billOID: EntityOIDZ.optional(),
  billUsedAmount: z.number().optional(),
});

export type MatchDoc = z.infer<typeof MatchDocZ>;
