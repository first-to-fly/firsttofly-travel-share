import { z } from "zod";

import { BookingDiscountType, BookingDiscountTypeZ } from "../../enums/BookingTypes";
import { TourDepartureDiscountResultZ } from "../../utils/group-tour-booking/calculateTourDepartureDiscount";
import { EntityOIDZ, EntityZ } from "../entity";
import { ApprovalRequestGroupTourBookingSpecialDiscountMetadataZ } from "../Operations/ApprovalRequestMetadata";
import { DiscountMode, DiscountZ } from "../Settings/Product/Discount";


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
  approvalRequestPayload: ApprovalRequestGroupTourBookingSpecialDiscountMetadataZ,
  approvalNote: z.string().nullish(),
});

export const GroupTourBookingDiscountMetadataZ = z.discriminatedUnion("type", [
  CodeBasedDiscountMetadataZ,
  TourDepartureDiscountMetadataZ,
  SpecialRequestDiscountMetadataZ,
]);

export type CodeBasedDiscountMetadata = z.infer<typeof CodeBasedDiscountMetadataZ>;
export type TourDepartureDiscountMetadata = z.infer<typeof TourDepartureDiscountMetadataZ>;
export type SpecialRequestDiscountMetadata = z.infer<typeof SpecialRequestDiscountMetadataZ>;

export type GroupTourBookingDiscountMetadata = z.infer<typeof GroupTourBookingDiscountMetadataZ>;

export const GroupTourBookingDiscountZ = EntityZ.extend({
  bookingOID: EntityOIDZ,

  discountType: BookingDiscountTypeZ,
  discountOID: EntityOIDZ.nullish(),

  appliedDiscountCode: z.string().nullish(),

  description: z.string(),
  appliedAmount: z.number(),
  discountMode: z.nativeEnum(DiscountMode),

  metadata: GroupTourBookingDiscountMetadataZ.nullish(),
});

export type GroupTourBookingDiscount = z.infer<typeof GroupTourBookingDiscountZ>;

export enum GroupTourBookingDiscountEvents {
  GROUP_TOUR_BOOKING_DISCOUNT_UPDATED = "GROUP_TOUR_BOOKING_DISCOUNT_UPDATED",
  GROUP_TOUR_BOOKING_DISCOUNT_LIST_UPDATED = "GROUP_TOUR_BOOKING_DISCOUNT_LIST_UPDATED",
}
