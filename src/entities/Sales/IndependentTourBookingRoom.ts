// simple-import-sort
import { z } from "zod";

import { BookingRoomStatusZ } from "../../enums/BookingTypes";
import { EntityOIDZ, EntityZ } from "../entity";
import { RoomOccupancyZ } from "../Settings/Product/RoomConfiguration";


export const IndependentTourBookingRoomZ = EntityZ.extend({
  independentTourBookingOID: EntityOIDZ,

  roomNumber: z.string().max(20).optional(),
  occupancy: RoomOccupancyZ, // Required field
  status: BookingRoomStatusZ,
  notes: z.string().optional(),
});

export type IndependentTourBookingRoom = z.infer<typeof IndependentTourBookingRoomZ>;

export enum IndependentTourBookingRoomEvents {
  INDEPENDENT_TOUR_BOOKING_ROOM_UPDATED = "INDEPENDENT_TOUR_BOOKING_ROOM_UPDATED",
  INDEPENDENT_TOUR_BOOKING_ROOM_LIST_UPDATED = "INDEPENDENT_TOUR_BOOKING_ROOM_LIST_UPDATED",
}
