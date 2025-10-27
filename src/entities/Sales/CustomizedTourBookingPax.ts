// simple-import-sort
import { z } from "zod";

import { BookingPaxPersonalDetailsZ, BookingPaxTypeZ } from "../../enums/BookingTypes";
import { EntityOIDZ, EntityZ } from "../entity";


export const CustomizedTourBookingPaxZ = EntityZ.extend({
  customizedTourBookingOID: EntityOIDZ,

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

export type CustomizedTourBookingPax = z.infer<typeof CustomizedTourBookingPaxZ>;

export enum CustomizedTourBookingPaxEvents {
  CUSTOMIZED_TOUR_BOOKING_PAX_UPDATED = "CUSTOMIZED_TOUR_BOOKING_PAX_UPDATED",
  CUSTOMIZED_TOUR_BOOKING_PAX_LIST_UPDATED = "CUSTOMIZED_TOUR_BOOKING_PAX_LIST_UPDATED",
}
