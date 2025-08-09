// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { BookingRoomStatusZ } from "../../enums/BookingTypes";


export const GroupTourBookingRoomZ = EntityZ.extend({
  bookingOID: EntityOIDZ,
  roomConfigurationRuleOID: EntityOIDZ,
  roomNumber: z.string().max(20).optional(),
  isDbl: z.boolean().default(false),
  status: BookingRoomStatusZ,
  notes: z.string().optional(),
});

export type GroupTourBookingRoom = z.infer<typeof GroupTourBookingRoomZ>;

export enum GroupTourBookingRoomEvents {
  GROUP_TOUR_BOOKING_ROOM_UPDATED = "GROUP_TOUR_BOOKING_ROOM_UPDATED",
  GROUP_TOUR_BOOKING_ROOM_LIST_UPDATED = "GROUP_TOUR_BOOKING_ROOM_LIST_UPDATED",
}
