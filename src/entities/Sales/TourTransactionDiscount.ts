import { z } from "zod";

import { EntityZ } from "../entity";


export enum TourTransactionDiscountType {
  CODE_BASED = "code_based",
  TOUR_DEPARTURE_DISCOUNT = "tour_departure_discount",
  SPECIAL_REQUEST = "special_request",
}

export const TourTransactionDiscountTypeZ = z.nativeEnum(TourTransactionDiscountType);

export const TourTransactionDiscountZ = EntityZ.extend({
  tourTransactionOID: z.string(),

  discountType: TourTransactionDiscountTypeZ,
  discountOID: z.string().optional(),

  appliedDiscountCode: z.string().optional(),

  description: z.string(),
  appliedAmount: z.number(),
  metadata: z.record(z.unknown()).optional(),
});

export type TourTransactionDiscount = z.infer<typeof TourTransactionDiscountZ>;

export enum TourTransactionDiscountEvents {
  TOUR_TRANSACTION_DISCOUNT_UPDATED = "TOUR_TRANSACTION_DISCOUNT_UPDATED",
  TOUR_TRANSACTION_DISCOUNT_LIST_UPDATED = "TOUR_TRANSACTION_DISCOUNT_LIST_UPDATED",
}
