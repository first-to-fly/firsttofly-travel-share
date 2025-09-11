import { z } from "zod";

import { ProductType } from "../../../enums/ProductType";
import { NamedURLZ } from "../../../types/url";
import { EntityOIDZ, EntityZ } from "../../entity";
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

  pdf: NamedURLZ.nullish(),

  isCustomized: z.boolean(),
  isPrint: z.boolean(),

  type: z.nativeEnum(TermConditionType).default(TermConditionType.TERM_CONDITION),

  isActive: z.boolean(),
  description: z.string().nullish(),
  remarks: z.string().nullish(),

  coveredEntityOIDs: z.array(EntityOIDZ), // OIDs of Sectors / SectorGroups / GroupTourProducts

  productTypes: z.array(z.nativeEnum(ProductType)).nullish(),
});

export type TermCondition = z.infer<typeof TermConditionZ>;
