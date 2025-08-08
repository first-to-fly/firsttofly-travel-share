// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { BookingDiscountTypeZ } from "./BookingTypes";


export { BookingDiscountType } from "./BookingTypes";


export enum DiscountMode {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
}

export const DiscountModeZ = z.nativeEnum(DiscountMode);

export const IndependentTourBookingDiscountZ = EntityZ.extend({

  independentTourBookingOID: EntityOIDZ,

  discountType: BookingDiscountTypeZ,
  discountOID: EntityOIDZ.optional(), // Reference to Discount entity if applicable

  discountCode: z.string().optional(),
  discountName: z.string(),
  description: z.string().optional(),

  discountMode: DiscountModeZ,
  discountValue: z.number(), // Percentage (0-100) or fixed amount
  appliedAmount: z.number(), // Actual amount discounted

  // Validation metadata
  metadata: z.object({
    validFrom: z.string().optional(), // ISO date string
    validUntil: z.string().optional(), // ISO date string
    minimumPurchase: z.number().optional(),
    maximumDiscount: z.number().optional(),
    usageCount: z.number().optional(),
    maxUsageCount: z.number().optional(),
    applicableServices: z.array(z.string()).optional(),
    excludedServices: z.array(z.string()).optional(),
    termsAndConditions: z.string().optional(),
  }).optional(),

  // Approval tracking for special discounts
  approvalRequired: z.boolean().default(false),
  approvalRequestOID: EntityOIDZ.optional(),
  approvedBy: z.string().optional(),
  approvedAt: z.string().optional(), // ISO date string

  sortOrder: z.number().optional(),
});

export type IndependentTourBookingDiscount = z.infer<typeof IndependentTourBookingDiscountZ>;
