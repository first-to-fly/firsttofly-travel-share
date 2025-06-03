import { z } from "zod";

import { TourDepartureDiscountResultZ } from "../../utils/tourTransaction/calculateTourDepartureDiscount";
import { EntityZ } from "../entity";
import { TourTransactionSpecialDiscountPayloadZ } from "../Operations/ApprovalRequest";
import { DiscountZ } from "../Settings/Product/Discount";


export enum TourTransactionDiscountType {
  CODE_BASED = "code_based",
  TOUR_DEPARTURE_DISCOUNT = "tour_departure_discount",
  SPECIAL_REQUEST = "special_request",
}

const TourTransactionDiscountTypeZ = z.nativeEnum(TourTransactionDiscountType);

// Metadata type definitions for different discount types
const CodeBasedDiscountMetadataZ = z.object({
  type: z.literal(TourTransactionDiscountType.CODE_BASED),
  discountCodeItem: DiscountZ,
});

const TourDepartureDiscountMetadataZ = z.object({
  type: z.literal(TourTransactionDiscountType.TOUR_DEPARTURE_DISCOUNT),
  groupIndex: z.number(),
  discountBreakdown: TourDepartureDiscountResultZ,
});


const SpecialRequestDiscountMetadataZ = z.object({
  type: z.literal(TourTransactionDiscountType.SPECIAL_REQUEST),
  approvalRequestOID: z.string().optional(),
  approvalRequestPayload: TourTransactionSpecialDiscountPayloadZ,
  approvalNote: z.string().optional(),
});


export type CodeBasedDiscountMetadata = z.infer<typeof CodeBasedDiscountMetadataZ>;

export type TourDepartureDiscountMetadata = z.infer<typeof TourDepartureDiscountMetadataZ>;

export type SpecialRequestDiscountMetadata = z.infer<typeof SpecialRequestDiscountMetadataZ>;

export type TourTransactionDiscountMetadata =
  | CodeBasedDiscountMetadata
  | TourDepartureDiscountMetadata
  | SpecialRequestDiscountMetadata;

export const TourTransactionDiscountMetadataZ = z.discriminatedUnion("type", [
  CodeBasedDiscountMetadataZ,
  TourDepartureDiscountMetadataZ,
  SpecialRequestDiscountMetadataZ,
]);

export const TourTransactionDiscountZ = EntityZ.extend({
  tourTransactionOID: z.string(),

  discountType: TourTransactionDiscountTypeZ,
  discountOID: z.string().optional(),

  appliedDiscountCode: z.string().optional(),

  description: z.string(),
  appliedAmount: z.number(),
  metadata: TourTransactionDiscountMetadataZ.optional(),
});

export type TourTransactionDiscount = z.infer<typeof TourTransactionDiscountZ>;

export enum TourTransactionDiscountEvents {
  TOUR_TRANSACTION_DISCOUNT_UPDATED = "TOUR_TRANSACTION_DISCOUNT_UPDATED",
  TOUR_TRANSACTION_DISCOUNT_LIST_UPDATED = "TOUR_TRANSACTION_DISCOUNT_LIST_UPDATED",
}
