import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum TaxTypeEvents {
  TAX_TYPE_UPDATED = "TAX_TYPE_UPDATED",
  TAX_TYPE_LIST_UPDATED = "TAX_TYPE_LIST_UPDATED",
}

export const TaxTypeZ = EntityZ.extend({
  entityType: z.literal(EntityType.TAX_TYPE),
  code: z.string(),
  name: z.string(),
  effectiveRate: z.number(),
  isActive: z.boolean().default(true),

  // No relation OIDs for TaxType currently
  // Note: Xero integration fields are NOT part of the entity
  // They are fetched separately via XeroSyncService in Content Delivery
});


export type TaxType = z.infer<typeof TaxTypeZ>;
