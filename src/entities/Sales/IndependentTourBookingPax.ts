// simple-import-sort
import { z } from "zod";

import { BookingPaxPersonalDetailsZ, BookingPaxTypeZ } from "../../enums/BookingTypes";
import { EntityOIDZ, EntityZ } from "../entity";


export const IndependentTourBookingPaxZ = EntityZ.extend({
  independentTourBookingRoomOID: EntityOIDZ,

  type: BookingPaxTypeZ,
  personalDetails: BookingPaxPersonalDetailsZ.nullish(),
  mealPreference: z.string().nullish(),
  documentOIDs: z.array(EntityOIDZ).nullish(),
  remarks: z.string().nullish(),
  isConfirmed: z.boolean().default(false),
  confirmedAt: z.string().nullish(),
  confirmedByEmail: z.string().nullish(),
  isLocked: z.boolean().default(false),
  lockedAt: z.string().nullish(),
  lockedBy: z.string().nullish(),
});

export type IndependentTourBookingPax = z.infer<typeof IndependentTourBookingPaxZ>;

export enum IndependentTourBookingPaxEvents {
  INDEPENDENT_TOUR_BOOKING_PAX_UPDATED = "INDEPENDENT_TOUR_BOOKING_PAX_UPDATED",
  INDEPENDENT_TOUR_BOOKING_PAX_LIST_UPDATED = "INDEPENDENT_TOUR_BOOKING_PAX_LIST_UPDATED",
}
