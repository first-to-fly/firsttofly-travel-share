// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { GroupTourBookingMetadataZ } from "./GroupTourBookingMetadata";
import { BookingPaymentStatus, BookingPaymentStatusZ, BookingStatus, BookingStatusZ } from "../../enums/BookingTypes";


export const GroupTourBookingZ = EntityZ.extend({

  tourDepartureOID: EntityOIDZ,
  departmentOID: EntityOIDZ.optional(),

  bookingReference: z.string().max(50),
  paymentStatus: BookingPaymentStatusZ.default(BookingPaymentStatus.UNPAID),
  bookingStatus: BookingStatusZ.default(BookingStatus.IN_PROGRESS),
  totalAmount: z.number().optional(),
  receivedAmount: z.number().optional(),
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
