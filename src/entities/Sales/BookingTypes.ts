// simple-import-sort
import { z } from "zod";


// Unified booking pax types for both Group Tour and Independent Tour bookings
export enum BookingPaxType {
  TWIN = "twin",
  SINGLE = "single",
  TRIPLE = "triple",
  QUAD = "quad",
  CHILD_TWIN = "child_twin",
  CHILD_WITH_BED = "child_with_bed",
  CHILD_NO_BED = "child_no_bed",
  INFANT = "infant",
}

export const BookingPaxTypeZ = z.nativeEnum(BookingPaxType);

// Unified personal details for booking passengers
export const BookingPaxPersonalDetailsZ = z.object({
  title: z.string(),
  gender: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  alternativeMobile: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  emergencyContact: z.object({
    name: z.string(),
    phone: z.string(),
    relationship: z.string(),
  }).optional(),
  travelDocuments: z.object({
    visaApplicationRequired: z.boolean(),
    passportNumber: z.string().optional(),
    passportIssueDate: z.string().optional(),
    passportExpiry: z.string().optional(),
  }).optional(),
  specialNeeds: z.object({
    mealRequest: z.string().optional(),
    healthDeclaration: z.string().optional(),
    wheelchairRequired: z.boolean(),
  }).optional(),
  isLeadPassenger: z.boolean().optional(),
});

export type BookingPaxPersonalDetails = z.infer<typeof BookingPaxPersonalDetailsZ>;

// Unified payment status for all booking types
export enum BookingPaymentStatus {
  UNPAID = "unpaid",
  PARTIAL_DEPOSIT = "partial_deposit",
  DEPOSIT_PAID = "deposit_paid",
  FULLY_PAID = "fully_paid",
}

export const BookingPaymentStatusZ = z.nativeEnum(BookingPaymentStatus);

// Unified booking status for all booking types
export enum BookingStatus {
  IN_PROGRESS = "in_progress",
  UNPAID = "unpaid",
  DEPOSIT_PAID = "deposit_paid",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  VOIDED = "voided",
  TRANSFERRED = "transferred",
}

export const BookingStatusZ = z.nativeEnum(BookingStatus);

// Unified room status for all booking types
export enum BookingRoomStatus {
  REQUESTED = "requested",
  CONFIRMED = "confirmed",
  WAITLISTED = "waitlisted",
  CANCELLED = "cancelled",
}

export const BookingRoomStatusZ = z.nativeEnum(BookingRoomStatus);

// Unified discount types for all booking types
export enum BookingDiscountType {
  CODE_BASED = "CODE_BASED",
  SPECIAL_REQUEST = "SPECIAL_REQUEST",
  TOUR_DEPARTURE_DISCOUNT = "TOUR_DEPARTURE_DISCOUNT", // Specific to group tours
}

export const BookingDiscountTypeZ = z.nativeEnum(BookingDiscountType);
