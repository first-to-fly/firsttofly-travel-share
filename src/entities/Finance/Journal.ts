import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";

/**
 * Journal events enum
 */
export enum JournalEvents {
  JOURNAL_UPDATED = "JOURNAL_UPDATED",
  JOURNAL_LIST_UPDATED = "JOURNAL_LIST_UPDATED",
}

/**
 * Zod schema for Journal
 */
export const JournalZ = EntityZ.extend({
  entityType: z.literal(EntityType.JOURNAL),

  code: z.string(),
  fromEntityOID: EntityOIDZ,
  toEntityOID: EntityOIDZ,
  amount: z.number().positive(),
  isVoided: z.boolean().default(false),
  description: z.string().nullish(),
  transactionDate: z.string(),
});

export type Journal = z.infer<typeof JournalZ>;
