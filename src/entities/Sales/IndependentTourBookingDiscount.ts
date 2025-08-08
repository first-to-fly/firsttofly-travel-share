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

// Flexible metadata that can contain any fields
export const IndependentTourBookingDiscountMetadataZ = z.object({
  reason: z.string().optional(),
  approvedBy: z.string().optional(),
  approvalRequestOID: z.string().optional(),
}).passthrough().optional();

export const IndependentTourBookingDiscountZ = EntityZ.extend({
  independentTourBookingOID: EntityOIDZ,
  
  discountType: BookingDiscountTypeZ,
  discountId: z.string().optional(), // UUID reference to Discount entity
  appliedDiscountCode: z.string().max(20).optional(),
  description: z.string(),
  appliedAmount: z.number().positive(),
  discountMode: DiscountModeZ,
  metadata: IndependentTourBookingDiscountMetadataZ,
});

export type IndependentTourBookingDiscount = z.infer<typeof IndependentTourBookingDiscountZ>;

export enum IndependentTourBookingDiscountEvents {
  INDEPENDENT_TOUR_BOOKING_DISCOUNT_UPDATED = "INDEPENDENT_TOUR_BOOKING_DISCOUNT_UPDATED",
  INDEPENDENT_TOUR_BOOKING_DISCOUNT_LIST_UPDATED = "INDEPENDENT_TOUR_BOOKING_DISCOUNT_LIST_UPDATED",
}