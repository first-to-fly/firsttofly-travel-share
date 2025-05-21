// simple-import-sort
import { z } from "zod";

import { EntityZ } from "../entity";
// Corrected path


export const TourTransactionRoomStatusEnum = z.enum([
  "requested",
  "confirmed",
  "waitlisted",
  "cancelled",
]);
export type TourTransactionRoomStatusEnum = z.infer<typeof TourTransactionRoomStatusEnum>;

export const TourTransactionRoomZ = EntityZ.extend({
  bookingRoomId: z.string().uuid(),
  bookingId: z.string().uuid(),
  roomConfigurationRuleId: z.string().uuid(),
  roomNumber: z.string().max(20).optional(),
  isDbl: z.boolean().default(false),
  status: TourTransactionRoomStatusEnum,
  notes: z.string().optional(),
});

export type TourTransactionRoom = z.infer<typeof TourTransactionRoomZ>;

export const TOUR_TRANSACTION_ROOM_EVENT_PREFIX = "tour_transaction_room";
export const TourTransactionRoomEvents = {
  CREATED: `${TOUR_TRANSACTION_ROOM_EVENT_PREFIX}:created`,
  UPDATED: `${TOUR_TRANSACTION_ROOM_EVENT_PREFIX}:updated`,
  DELETED: `${TOUR_TRANSACTION_ROOM_EVENT_PREFIX}:deleted`,
} as const;
