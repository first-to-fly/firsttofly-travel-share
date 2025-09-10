// simple-import-sort
import { z } from "zod";

import { BookingPaymentStatus, BookingPaymentStatusZ, BookingStatus, BookingStatusZ } from "../../enums/BookingTypes";
import { EntityOIDZ, EntityZ } from "../entity";
import { GroupTourBookingMetadataZ } from "./GroupTourBookingMetadata";


export const GroupTourBookingZ = EntityZ.extend({

  tourDepartureOID: EntityOIDZ,
  departmentOID: EntityOIDZ.nullish(),
  stationCodeOID: EntityOIDZ.nullish(), // Added station code OID
  tcpBookingOID: EntityOIDZ.nullish(),

  bookingReference: z.string().max(50),
  paymentStatus: BookingPaymentStatusZ.default(BookingPaymentStatus.UNPAID),
  bookingStatus: BookingStatusZ.default(BookingStatus.IN_PROGRESS),
  totalAmount: z.number().nullish(),
  receivedAmount: z.number().nullish(),
  fullPaymentDueDate: z.string().nullable().nullish(),
  metadata: GroupTourBookingMetadataZ.nullish(),
  specialInstructions: z.array(z.string()).nullish(),
  overwriteTax: z.object({
    scheme: z.string(),
    rate: z.number().nonnegative(),
  }).nullish(),

  // Owner information
  ownerOIDs: z.array(EntityOIDZ).nullish(),
});

export type GroupTourBooking = z.infer<typeof GroupTourBookingZ>;

export enum GroupTourBookingEvents {
  GROUP_TOUR_BOOKING_UPDATED = "GROUP_TOUR_BOOKING_UPDATED",
  GROUP_TOUR_BOOKING_LIST_UPDATED = "GROUP_TOUR_BOOKING_LIST_UPDATED",
}
