// simple-import-sort
import { z } from "zod";

import { DiscountBookingChannel, DiscountMode } from "../entities/Settings/Product/Discount";
import { BookingDiscountType, BookingPaxTypeZ } from "../enums/BookingTypes";


// --- Shared Passenger Composition Schema ---
export const PassengerCompositionZ = z.object({
  adults: z.number().min(0),
  children: z.number().min(0),
  childrenWithBed: z.number().min(0),
  childrenNoBed: z.number().min(0),
  totalPax: z.number().min(0),
  passengerTypes: z.array(BookingPaxTypeZ),
});
export type PassengerComposition = z.infer<typeof PassengerCompositionZ>;

// --- Shared Booking Validation Context Schema ---
export const BookingValidationContextZ = z.object({
  bookingChannel: z.nativeEnum(DiscountBookingChannel).default(DiscountBookingChannel.WEB),
  passengerComposition: PassengerCompositionZ,
  totalAmount: z.number().min(0),
  netPrice: z.number().min(0),
  grossPrice: z.number().min(0),
  roomCount: z.number().min(0),
  bookingTimestamp: z.string().datetime().optional(),
});
export type BookingValidationContext = z.infer<typeof BookingValidationContextZ>;

// --- Shared Discount Type Schemas ---
export const CodeBasedDiscountZ = z.object({
  discountType: z.literal(BookingDiscountType.CODE_BASED),
  discountOID: z.string(),
  discountCode: z.string(),
  description: z.string().optional(),
  bookingChannel: z.nativeEnum(DiscountBookingChannel).default(DiscountBookingChannel.WEB),
});
export type CodeBasedDiscount = z.infer<typeof CodeBasedDiscountZ>;

export const SpecialRequestDiscountZ = z.object({
  discountType: z.literal(BookingDiscountType.SPECIAL_REQUEST),
  discountMode: z.nativeEnum(DiscountMode).optional(),
  description: z.string().optional(),
  discountName: z.string().optional(),
});
export type SpecialRequestDiscount = z.infer<typeof SpecialRequestDiscountZ>;

// Tour departure discount (specific to Group bookings)
export const TourDepartureDiscountZ = z.object({
  discountType: z.literal(BookingDiscountType.TOUR_DEPARTURE_DISCOUNT),
  groupIndex: z.number(),
});
export type TourDepartureDiscount = z.infer<typeof TourDepartureDiscountZ>;
