import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum CostingTemplateEvents {
  COSTING_TEMPLATE_UPDATED = "COSTING_TEMPLATE_UPDATED",
  COSTING_TEMPLATE_LIST_UPDATED = "COSTING_TEMPLATE_LIST_UPDATED",
}


export const CostingTemplateZ = EntityZ.extend({
  entityType: z.literal(EntityType.COSTING_TEMPLATE),

  name: z.string(),
  remarks: z.string().nullish(),
  isActive: z.boolean(),

  costingItemOIDs: z.array(EntityOIDZ).nullish(),
});

export type CostingTemplate = z.infer<typeof CostingTemplateZ>;
