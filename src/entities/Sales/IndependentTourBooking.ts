// simple-import-sort
import { z } from "zod";

import { BookingPaymentStatus, BookingPaymentStatusZ, BookingStatus, BookingStatusZ } from "../../enums/BookingTypes";
import { EntityOIDZ, EntityZ } from "../entity";
import { IndependentTourBookingMetadataZ } from "./IndependentTourBookingMetadata";


export const IndependentTourBookingZ = EntityZ.extend({
  independentTourProductOID: EntityOIDZ,
  independentTourAccommodationOID: EntityOIDZ.optional(),
  departmentOID: EntityOIDZ.optional(),

  bookingReference: z.string().max(50),
  paymentStatus: BookingPaymentStatusZ.default(BookingPaymentStatus.UNPAID),
  bookingStatus: BookingStatusZ.default(BookingStatus.IN_PROGRESS),

  totalAmount: z.number(),
  receivedAmount: z.number().default(0),

  travelStartDate: z.string(), // ISO datetime string
  travelEndDate: z.string(), // ISO datetime string

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
