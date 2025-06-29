// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum BookingRoomStatus {
  REQUESTED = "requested",
  CONFIRMED = "confirmed",
  WAITLISTED = "waitlisted",
  CANCELLED = "cancelled",
}

export const BookingRoomStatusZ = z.nativeEnum(BookingRoomStatus);

export const BookingRoomZ = EntityZ.extend({
  bookingOID: EntityOIDZ,
  roomConfigurationRuleOID: EntityOIDZ,
  roomNumber: z.string().max(20).optional(),
  isDbl: z.boolean().default(false),
  status: BookingRoomStatusZ,
  notes: z.string().optional(),
});

export type BookingRoom = z.infer<typeof BookingRoomZ>;

export enum BookingRoomEvents {
  BOOKING_ROOM_UPDATED = "BOOKING_ROOM_UPDATED",
  BOOKING_ROOM_LIST_UPDATED = "BOOKING_ROOM_LIST_UPDATED",
}
