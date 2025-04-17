import { z } from "zod";

import { NamedURLZ } from "../../../types/url";
import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum TermConditionType {
  TERM_CONDITION = "term-condition",
  ADDENDUM = "addendum",
}


export enum TermConditionEvents {
  TERM_CONDITION_UPDATED= "TERM_CONDITION_UPDATED",
  TERM_CONDITION_LIST_UPDATED= "TERM_CONDITION_LIST_UPDATED",
}


export const TermConditionZ = EntityZ.extend({
  entityType: z.literal(EntityType.TERM_CONDITION),

  name: z.string(),

  pdf: NamedURLZ,

  isCustomized: z.boolean(),
  isPrint: z.boolean(),

  type: z.nativeEnum(TermConditionType).default(TermConditionType.TERM_CONDITION),

  isActive: z.boolean(),
  description: z.string().optional(),
  remarks: z.string().optional(),

  coveredEntityOIDs: z.array(z.string()), // OIDs of Sectors / SectorGroups / GroupTourProducts

  productTypeOIDs: z.array(z.string()),
});

export type TermCondition = z.infer<typeof TermConditionZ>;
