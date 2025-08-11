// simple-import-sort
import { z } from "zod";

import { BookingPaymentStatus, BookingPaymentStatusZ, BookingStatus, BookingStatusZ } from "../../enums/BookingTypes";
import { EntityOIDZ, EntityZ } from "../entity";


export const IndependentTourBookingMetadataZ = z.object({
  source: z.string().optional(),
  campaignCode: z.string().optional(),
  agentCode: z.string().optional(),
  referrerUrl: z.string().optional(),
  customerNotes: z.string().optional(),
  internalNotes: z.string().optional(),
}).optional();

export const IndependentTourBookingZ = EntityZ.extend({

  independentTourProductOID: EntityOIDZ,
  departmentOID: EntityOIDZ.optional(),

  bookingReference: z.string().max(50),
  paymentStatus: BookingPaymentStatusZ.default(BookingPaymentStatus.UNPAID),
  bookingStatus: BookingStatusZ.default(BookingStatus.IN_PROGRESS),

  totalAmount: z.number().optional(),
  receivedAmount: z.number().optional(),

  // Selected accommodation
  accommodationOID: EntityOIDZ.optional(),

  // Travel dates
  startDate: z.string(), // ISO date string
  endDate: z.string(), // ISO date string

  // Customer information
  customerOID: EntityOIDZ.optional(),
  leadGuestName: z.string().optional(),
  leadGuestEmail: z.string().optional(),
  leadGuestPhone: z.string().optional(),

  // Pricing breakdown
  accommodationCost: z.number().optional(),
  optionalServicesCost: z.number().optional(),
  miscellaneousCost: z.number().optional(),
  discountAmount: z.number().optional(),
  taxAmount: z.number().optional(),

  metadata: IndependentTourBookingMetadataZ,
  specialInstructions: z.array(z.string()).optional(),

  // Payment order reference
  paymentOrderOID: EntityOIDZ.optional(),

  // Approval status for special discounts
  approvalRequestOID: EntityOIDZ.optional(),

  // Snapshot data
  snapshot: z.any().optional(), // Will store frozen state at confirmation

  // Owner information
  ownerOIDs: z.array(EntityOIDZ).optional(),
});

export type IndependentTourBooking = z.infer<typeof IndependentTourBookingZ>;

export enum IndependentTourBookingEvents {
  INDEPENDENT_TOUR_BOOKING_UPDATED = "INDEPENDENT_TOUR_BOOKING_UPDATED",
  INDEPENDENT_TOUR_BOOKING_LIST_UPDATED = "INDEPENDENT_TOUR_BOOKING_LIST_UPDATED",
}
