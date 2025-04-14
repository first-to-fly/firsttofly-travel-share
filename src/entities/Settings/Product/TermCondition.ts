import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum TermConditionEvents {
  TERM_CONDITION_UPDATED= "TERM_CONDITION_UPDATED",
  TERM_CONDITION_LIST_UPDATED= "TERM_CONDITION_LIST_UPDATED",
}


export const FTFTermConditionZ = EntityZ.extend({
  entityType: z.literal(EntityType.TERM_CONDITION),

  name: z.string(),
  pdf: z.string().optional(),
  isCustomized: z.boolean(),
  isPrint: z.boolean(),
  type: z.number().optional(),
  status: z.boolean(),
  description: z.string().optional(),
  remarks: z.string().optional(),
  offlineOperator: z.string().optional(),
  productTypeOIDs: z.array(z.string()).optional(),
});

export type FTFTermCondition = z.infer<typeof FTFTermConditionZ>;

export const TermConditionCoverageZ = EntityZ.extend({
  entityType: z.literal(EntityType.TERM_CONDITION_COVERAGE),

  termConditionOID: z.string(),
  coverageType: z.enum(["sectors", "sector-group", "products"]),
  coverageOID: z.string(),
});

export type TermConditionCoverage = z.infer<typeof TermConditionCoverageZ>;

export const TermConditionProductTypeZ = EntityZ.extend({
  entityType: z.literal(EntityType.TERM_CONDITION_PRODUCT_TYPES),

  termConditionOID: z.string(),
  productTypeOID: z.string(),
});

export type TermConditionProductType = z.infer<typeof TermConditionProductTypeZ>;
