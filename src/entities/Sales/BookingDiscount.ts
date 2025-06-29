import { z } from "zod";

import { TourDepartureDiscountResultZ } from "../../utils/booking/calculateTourDepartureDiscount";
import { EntityOIDZ, EntityZ } from "../entity";
import { ApprovalRequestBookingSpecialDiscountPayloadZ } from "../Operations/ApprovalRequest";
import { DiscountMode, DiscountZ } from "../Settings/Product/Discount";


export enum BookingDiscountType {
  CODE_BASED = "code_based",
  TOUR_DEPARTURE_DISCOUNT = "tour_departure_discount",
  SPECIAL_REQUEST = "special_request",
}

export const BookingDiscountTypeZ = z.nativeEnum(BookingDiscountType);

// Metadata type definitions for different discount types
export const CodeBasedDiscountMetadataZ = z.object({
  type: z.literal(BookingDiscountType.CODE_BASED),
  discountCodeItem: DiscountZ,
});

export const TourDepartureDiscountMetadataZ = z.object({
  type: z.literal(BookingDiscountType.TOUR_DEPARTURE_DISCOUNT),
  groupIndex: z.number(),
  discountBreakdown: TourDepartureDiscountResultZ,
});

export const SpecialRequestDiscountMetadataZ = z.object({
  type: z.literal(BookingDiscountType.SPECIAL_REQUEST),
  approvalRequestOID: EntityOIDZ,
  approvalRequestPayload: ApprovalRequestBookingSpecialDiscountPayloadZ,
  approvalNote: z.string().optional(),
});

export const BookingDiscountMetadataZ = z.discriminatedUnion("type", [
  CodeBasedDiscountMetadataZ,
  TourDepartureDiscountMetadataZ,
  SpecialRequestDiscountMetadataZ,
]);

export type CodeBasedDiscountMetadata = z.infer<typeof CodeBasedDiscountMetadataZ>;
export type TourDepartureDiscountMetadata = z.infer<typeof TourDepartureDiscountMetadataZ>;
export type SpecialRequestDiscountMetadata = z.infer<typeof SpecialRequestDiscountMetadataZ>;

export type BookingDiscountMetadata = z.infer<typeof BookingDiscountMetadataZ>;

export const BookingDiscountZ = EntityZ.extend({
  bookingOID: EntityOIDZ,

  discountType: BookingDiscountTypeZ,
  discountOID: EntityOIDZ.optional(),

  appliedDiscountCode: z.string().optional(),

  description: z.string(),
  appliedAmount: z.number(),
  discountMode: z.nativeEnum(DiscountMode),

  metadata: BookingDiscountMetadataZ.optional(),
});

export type BookingDiscount = z.infer<typeof BookingDiscountZ>;

export enum BookingDiscountEvents {
  BOOKING_DISCOUNT_UPDATED = "BOOKING_DISCOUNT_UPDATED",
  BOOKING_DISCOUNT_LIST_UPDATED = "BOOKING_DISCOUNT_LIST_UPDATED",
}
