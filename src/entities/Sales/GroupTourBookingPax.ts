// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { BookingPaxPersonalDetails, BookingPaxPersonalDetailsZ, BookingPaxTypeZ } from "./BookingTypes";


// Use unified types for backward compatibility
export const GroupTourBookingPaxPersonalDetailsZ = BookingPaxPersonalDetailsZ;
export type GroupTourBookingPaxPersonalDetails = BookingPaxPersonalDetails;

export const GroupTourBookingPaxZ = EntityZ.extend({
  bookingRoomOID: EntityOIDZ,
  type: BookingPaxTypeZ,
  isLandTourOnly: z.boolean().default(false),
  personalDetails: GroupTourBookingPaxPersonalDetailsZ.optional(),
  mealPreference: z.string().optional(),
  transportRecordOID: EntityOIDZ.optional(),
  documentOIDs: z.array(EntityOIDZ).optional(),
}).omit({
  tenantOID: true,
});

export type GroupTourBookingPax = z.infer<typeof GroupTourBookingPaxZ>;

export enum GroupTourBookingPaxEvents {
  GROUP_TOUR_BOOKING_PAX_UPDATED = "GROUP_TOUR_BOOKING_PAX_UPDATED",
  GROUP_TOUR_BOOKING_PAX_LIST_UPDATED = "GROUP_TOUR_BOOKING_PAX_LIST_UPDATED",
}
