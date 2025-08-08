// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { BookingPaxPersonalDetailsZ, BookingPaxTypeZ } from "./BookingTypes";


export { BookingPaxType, BookingPaxTypeZ } from "./BookingTypes";

export const IndependentTourBookingPaxZ = EntityZ.extend({
  independentTourBookingRoomOID: EntityOIDZ,

  type: BookingPaxTypeZ,
  personalDetails: BookingPaxPersonalDetailsZ.optional(),
  mealPreference: z.string().optional(),
  documentIds: z.array(z.string()).optional(), // UUID array
});

export type IndependentTourBookingPax = z.infer<typeof IndependentTourBookingPaxZ>;

export enum IndependentTourBookingPaxEvents {
  INDEPENDENT_TOUR_BOOKING_PAX_UPDATED = "INDEPENDENT_TOUR_BOOKING_PAX_UPDATED",
  INDEPENDENT_TOUR_BOOKING_PAX_LIST_UPDATED = "INDEPENDENT_TOUR_BOOKING_PAX_LIST_UPDATED",
}
