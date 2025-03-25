import { z } from "zod";

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

  tenantOID: z.string(),

  code: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  type: z.nativeEnum(InsuranceDiscountType),
  valuePercentage: z.number(), // Value for primary discount (percentage or fixed amount)
  valueFixed: z.number(), // Value for secondary discount (if needed)
  remarks: z.string().nullable(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string().nullable(),
});

export type InsuranceDiscount = z.infer<typeof InsuranceDiscountZ>;
