// simple-import-sort
import { z } from "zod";

import { BookingPaxPersonalDetailsZ, BookingPaxTypeZ } from "../../enums/BookingTypes";
import { EntityOIDZ, EntityZ } from "../entity";


export const GroupTourBookingPaxZ = EntityZ.extend({
  bookingRoomOID: EntityOIDZ,
  type: BookingPaxTypeZ,
  isLandTourOnly: z.boolean().default(false),
  personalDetails: BookingPaxPersonalDetailsZ.nullish(),
  mealPreference: z.string().nullish(),
  transportRecordOID: EntityOIDZ.nullish(),
  documentOIDs: z.array(EntityOIDZ).nullish(),
  remarks: z.string().nullish(),
  isConfirmed: z.boolean().default(false),
  confirmedAt: z.string().nullish(),
}).omit({
  tenantOID: true,
});

export type GroupTourBookingPax = z.infer<typeof GroupTourBookingPaxZ>;

export enum GroupTourBookingPaxEvents {
  GROUP_TOUR_BOOKING_PAX_UPDATED = "GROUP_TOUR_BOOKING_PAX_UPDATED",
  GROUP_TOUR_BOOKING_PAX_LIST_UPDATED = "GROUP_TOUR_BOOKING_PAX_LIST_UPDATED",
}
