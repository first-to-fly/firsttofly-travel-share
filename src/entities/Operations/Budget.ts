import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";

/**
 * Budget status enum
 */
export enum BudgetStatus {
  DRAFT = "draft",
  WFA = "wfa",
  APPROVED = "approved",
  REJECTED = "rejected",
  COMPLETED = "completed",
}

export enum BudgetEvents {
  BUDGET_UPDATED = "BUDGET_UPDATED",
  BUDGET_LIST_UPDATED = "BUDGET_LIST_UPDATED",
}

/**
 * Zod schema for Budget
 */
export const BudgetZ = EntityZ.extend({
  entityType: z.literal(EntityType.BUDGET),

  tourDepartureOID: EntityOIDZ,
  status: z.nativeEnum(BudgetStatus),
  remarks: z.string().optional(),
  isArchived: z.boolean(),
});

export type Budget = z.infer<typeof BudgetZ>;
