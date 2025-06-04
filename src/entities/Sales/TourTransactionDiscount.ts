import { z } from "zod";

import { TourDepartureDiscountResultZ } from "../../utils/tourTransaction/calculateTourDepartureDiscount";
import { EntityZ } from "../entity";
import { ApprovalRequestTourTransactionSpecialDiscountPayloadZ } from "../Operations/ApprovalRequest";
import { DiscountMode, DiscountZ } from "../Settings/Product/Discount";


export enum TourTransactionDiscountType {
  CODE_BASED = "code_based",
  TOUR_DEPARTURE_DISCOUNT = "tour_departure_discount",
  SPECIAL_REQUEST = "special_request",
}

export const TourTransactionDiscountTypeZ = z.nativeEnum(TourTransactionDiscountType);

// Metadata type definitions for different discount types
export const CodeBasedDiscountMetadataZ = z.object({
  type: z.literal(TourTransactionDiscountType.CODE_BASED),
  discountCodeItem: DiscountZ,
});

export const TourDepartureDiscountMetadataZ = z.object({
  type: z.literal(TourTransactionDiscountType.TOUR_DEPARTURE_DISCOUNT),
  groupIndex: z.number(),
  discountBreakdown: TourDepartureDiscountResultZ,
});

export const SpecialRequestDiscountMetadataZ = z.object({
  type: z.literal(TourTransactionDiscountType.SPECIAL_REQUEST),
  approvalRequestOID: z.string(),
  approvalRequestPayload: ApprovalRequestTourTransactionSpecialDiscountPayloadZ,
  approvalNote: z.string().optional(),
});

export const TourTransactionDiscountMetadataZ = z.discriminatedUnion("type", [
  CodeBasedDiscountMetadataZ,
  TourDepartureDiscountMetadataZ,
  SpecialRequestDiscountMetadataZ,
]);

export type CodeBasedDiscountMetadata = z.infer<typeof CodeBasedDiscountMetadataZ>;
export type TourDepartureDiscountMetadata = z.infer<typeof TourDepartureDiscountMetadataZ>;
export type SpecialRequestDiscountMetadata = z.infer<typeof SpecialRequestDiscountMetadataZ>;
export type TourTransactionDiscountMetadata = z.infer<typeof TourTransactionDiscountMetadataZ>;

export const TourTransactionDiscountZ = EntityZ.extend({
  tourTransactionOID: z.string(),

  discountType: TourTransactionDiscountTypeZ,
  discountOID: z.string().optional(),

  appliedDiscountCode: z.string().optional(),

  description: z.string(),
  appliedAmount: z.number(),
  discountMode: z.nativeEnum(DiscountMode),

  metadata: TourTransactionDiscountMetadataZ.optional(),
});

export type TourTransactionDiscount = z.infer<typeof TourTransactionDiscountZ>;

export enum TourTransactionDiscountEvents {
  TOUR_TRANSACTION_DISCOUNT_UPDATED = "TOUR_TRANSACTION_DISCOUNT_UPDATED",
  TOUR_TRANSACTION_DISCOUNT_LIST_UPDATED = "TOUR_TRANSACTION_DISCOUNT_LIST_UPDATED",
}
