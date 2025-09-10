// simple-import-sort
import { z } from "zod";

import { BookingPaymentStatus, BookingPaymentStatusZ, BookingStatus, BookingStatusZ } from "../../enums/BookingTypes";
import { DateISOStringZ, EntityOIDZ, EntityZ } from "../entity";
import { BaseBookingCustomerMetadataZ, ITBTransferMetadataZ } from "./BookingMetadata";

// Inline metadata schemas for ITB
// Combines base customer info with ITB-specific transfer metadata fields
export const IndependentTourBookingMetadataZ = BaseBookingCustomerMetadataZ.merge(ITBTransferMetadataZ);
export type IndependentTourBookingMetadata = z.infer<typeof IndependentTourBookingMetadataZ>;


export const IndependentTourBookingZ = EntityZ.extend({
  independentTourProductOID: EntityOIDZ,
  independentTourAccommodationOID: EntityOIDZ.optional(),
  departmentOID: EntityOIDZ.optional(),
  stationCodeOID: EntityOIDZ.optional(), // Added station code OID
  tcpBookingOID: EntityOIDZ.optional(),

  bookingReference: z.string().max(50),
  paymentStatus: BookingPaymentStatusZ.default(BookingPaymentStatus.UNPAID),
  bookingStatus: BookingStatusZ.default(BookingStatus.IN_PROGRESS),

  totalAmount: z.number(),
  receivedAmount: z.number().default(0),
  fullPaymentDueDate: z.string().nullable().optional(),

  travelStartDate: DateISOStringZ.optional(), // ISO datetime string
  travelEndDate: DateISOStringZ.optional(), // ISO datetime string

  snapshot: z.any().optional(), // IndependentTourBookingSnapshotData
  metadata: IndependentTourBookingMetadataZ.optional(),
  specialInstructions: z.array(z.string()).optional(),
  overwriteTax: z.object({
    scheme: z.string(),
    rate: z.number(),
  }).optional(),
});

export type IndependentTourBooking = z.infer<typeof IndependentTourBookingZ>;

export enum IndependentTourBookingEvents {
  INDEPENDENT_TOUR_BOOKING_UPDATED = "INDEPENDENT_TOUR_BOOKING_UPDATED",
  INDEPENDENT_TOUR_BOOKING_LIST_UPDATED = "INDEPENDENT_TOUR_BOOKING_LIST_UPDATED",
}
