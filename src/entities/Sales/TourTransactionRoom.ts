// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
// Corrected path


export enum TourTransactionRoomStatus {
  REQUESTED = "requested",
  CONFIRMED = "confirmed",
  WAITLISTED = "waitlisted",
  CANCELLED = "cancelled",
}

export const TourTransactionRoomStatusZ = z.nativeEnum(TourTransactionRoomStatus);

export const TourTransactionRoomZ = EntityZ.extend({
  tourTransactionOID: EntityOIDZ,
  roomConfigurationRuleOID: EntityOIDZ,
  roomNumber: z.string().max(20).optional(),
  isDbl: z.boolean().default(false),
  status: TourTransactionRoomStatusZ,
  notes: z.string().optional(),
});

export type TourTransactionRoom = z.infer<typeof TourTransactionRoomZ>;

export enum TourTransactionRoomEvents {
  TOUR_TRANSACTION_ROOM_UPDATED = "TOUR_TRANSACTION_ROOM_UPDATED",
  TOUR_TRANSACTION_ROOM_LIST_UPDATED = "TOUR_TRANSACTION_ROOM_LIST_UPDATED",
}
