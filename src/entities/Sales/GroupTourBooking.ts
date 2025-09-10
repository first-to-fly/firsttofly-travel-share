// simple-import-sort
import { z } from "zod";

import { BookingPaymentStatus, BookingPaymentStatusZ, BookingStatus, BookingStatusZ } from "../../enums/BookingTypes";
import { EntityOIDZ, EntityZ } from "../entity";
import { BaseBookingCustomerMetadataZ, GTBTransferMetadataZ } from "./BookingMetadata";

// Inline metadata schemas for GTB
// Combines base customer info with GTB-specific transfer metadata fields
export const GroupTourBookingMetadataZ = BaseBookingCustomerMetadataZ.merge(GTBTransferMetadataZ);
export type GroupTourBookingMetadata = z.infer<typeof GroupTourBookingMetadataZ>;


export const GroupTourBookingZ = EntityZ.extend({

  tourDepartureOID: EntityOIDZ,
  departmentOID: EntityOIDZ.optional(),
  stationCodeOID: EntityOIDZ.optional(), // Added station code OID
  tcpBookingOID: EntityOIDZ.optional(),

  bookingReference: z.string().max(50),
  paymentStatus: BookingPaymentStatusZ.default(BookingPaymentStatus.UNPAID),
  bookingStatus: BookingStatusZ.default(BookingStatus.IN_PROGRESS),
  totalAmount: z.number().optional(),
  receivedAmount: z.number().optional(),
  fullPaymentDueDate: z.string().nullable().optional(),
  metadata: GroupTourBookingMetadataZ.optional(),
  specialInstructions: z.array(z.string()).optional(),
  overwriteTax: z.object({
    scheme: z.string(),
    rate: z.number().nonnegative(),
  }).optional(),

  // Owner information
  ownerOIDs: z.array(EntityOIDZ).optional(),
});

export type GroupTourBooking = z.infer<typeof GroupTourBookingZ>;

export enum GroupTourBookingEvents {
  GROUP_TOUR_BOOKING_UPDATED = "GROUP_TOUR_BOOKING_UPDATED",
  GROUP_TOUR_BOOKING_LIST_UPDATED = "GROUP_TOUR_BOOKING_LIST_UPDATED",
}
