// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { BookingMetadataZ } from "./BookingMetadata";


export enum BookingPaymentStatus {
  UNPAID = "unpaid",
  PARTIAL_DEPOSIT = "partial_deposit",
  DEPOSIT_PAID = "deposit_paid",
  FULLY_PAID = "fully_paid",
}

export const BookingPaymentStatusZ = z.nativeEnum(BookingPaymentStatus);

export enum BookingBookingStatus {
  IN_PROGRESS = "in_progress",
  UNPAID = "unpaid",
  DEPOSIT_PAID = "deposit_paid",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  VOIDED = "voided",
  TRANSFERRED = "transferred",
}

export const BookingBookingStatusZ = z.nativeEnum(BookingBookingStatus);

export const BookingZ = EntityZ.extend({

  tourDepartureOID: EntityOIDZ,
  departmentOID: EntityOIDZ.optional(),

  bookingReference: z.string().max(50),
  paymentStatus: BookingPaymentStatusZ.default(BookingPaymentStatus.UNPAID),
  bookingStatus: BookingBookingStatusZ.default(BookingBookingStatus.IN_PROGRESS),
  totalAmount: z.number(),
  receivedAmount: z.number().default(0),
  metadata: BookingMetadataZ.optional(),
  specialInstructions: z.array(z.string()).optional(),
  overwriteTax: z.object({
    scheme: z.string(),
    rate: z.number().nonnegative(),
  }).optional(),
});

export type Booking = z.infer<typeof BookingZ>;

export enum BookingEvents {
  BOOKING_UPDATED = "BOOKING_UPDATED",
  BOOKING_LIST_UPDATED = "BOOKING_LIST_UPDATED",
}
