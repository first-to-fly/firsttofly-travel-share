// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { GroupTourBookingMetadataZ } from "./GroupTourBookingMetadata";


export enum GroupTourBookingPaymentStatus {
  UNPAID = "unpaid",
  PARTIAL_DEPOSIT = "partial_deposit",
  DEPOSIT_PAID = "deposit_paid",
  FULLY_PAID = "fully_paid",
}

export const GroupTourBookingPaymentStatusZ = z.nativeEnum(GroupTourBookingPaymentStatus);

export enum GroupTourBookingBookingStatus {
  IN_PROGRESS = "in_progress",
  UNPAID = "unpaid",
  DEPOSIT_PAID = "deposit_paid",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  VOIDED = "voided",
  TRANSFERRED = "transferred",
}

export const GroupTourBookingBookingStatusZ = z.nativeEnum(GroupTourBookingBookingStatus);

export const GroupTourBookingZ = EntityZ.extend({

  tourDepartureOID: EntityOIDZ,
  departmentOID: EntityOIDZ.optional(),

  bookingReference: z.string().max(50),
  paymentStatus: GroupTourBookingPaymentStatusZ.default(GroupTourBookingPaymentStatus.UNPAID),
  bookingStatus: GroupTourBookingBookingStatusZ.default(GroupTourBookingBookingStatus.IN_PROGRESS),
  totalAmount: z.number(),
  receivedAmount: z.number().default(0),
  metadata: GroupTourBookingMetadataZ.optional(),
  specialInstructions: z.array(z.string()).optional(),
  overwriteTax: z.object({
    scheme: z.string(),
    rate: z.number().nonnegative(),
  }).optional(),
});

export type GroupTourBooking = z.infer<typeof GroupTourBookingZ>;

export enum GroupTourBookingEvents {
  GROUP_TOUR_BOOKING_UPDATED = "GROUP_TOUR_BOOKING_UPDATED",
  GROUP_TOUR_BOOKING_LIST_UPDATED = "GROUP_TOUR_BOOKING_LIST_UPDATED",
}
