import { z } from "zod";

import { FTFSafeMaxNumberZ } from "../../../types/number";
import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum InsuranceDiscountType {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

export enum InsuranceDiscountEvents {
  INSURANCE_DISCOUNT_UPDATED = "INSURANCE_DISCOUNT_UPDATED",
  INSURANCE_DISCOUNT_LIST_UPDATED = "INSURANCE_DISCOUNT_LIST_UPDATED",
}

export const InsuranceDiscountZ = EntityZ.extend({
  entityType: z.literal(EntityType.INSURANCE_DISCOUNT),

  code: z.number(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  type: z.nativeEnum(InsuranceDiscountType),
  valuePercentage: FTFSafeMaxNumberZ({ name: "Value percentage" }), // Value for primary discount (percentage or fixed amount)
  valueFixed: FTFSafeMaxNumberZ({ name: "Value fixed" }), // Value for secondary discount (if needed)
  remarks: z.string().optional(),

});

export type InsuranceDiscount = z.infer<typeof InsuranceDiscountZ>;
