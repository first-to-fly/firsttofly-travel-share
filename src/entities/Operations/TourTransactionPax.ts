// simple-import-sort
import { z } from "zod";

import { EntityZ } from "../entity";
// Corrected path

export const TourTransactionPaxTypeEnum = z.enum([
  "twin",
  "single",
  "triple",
  "quad",
  "child_twin",
  "child_with_bed",
  "child_no_bed",
  "infant",
]);
export type TourTransactionPaxTypeEnum = z.infer<typeof TourTransactionPaxTypeEnum>;

export const TourTransactionPaxZ = EntityZ.extend({
  paxId: z.string().uuid(),
  // bookingId: z.string().uuid(), // Removed
  bookingRoomId: z.string().uuid(),
  type: TourTransactionPaxTypeEnum,
  isLandTourOnly: z.boolean().default(false),
  personalDetails: z.record(z.unknown()).optional(), // JSONB
  mealPreference: z.string().optional(),
  transportRecordId: z.string().uuid().optional(),
});

export type TourTransactionPax = z.infer<typeof TourTransactionPaxZ>;

export const TOUR_TRANSACTION_PAX_EVENT_PREFIX = "tour_transaction_pax";
export const TourTransactionPaxEvents = {
  CREATED: `${TOUR_TRANSACTION_PAX_EVENT_PREFIX}:created`,
  UPDATED: `${TOUR_TRANSACTION_PAX_EVENT_PREFIX}:updated`,
  DELETED: `${TOUR_TRANSACTION_PAX_EVENT_PREFIX}:deleted`,
} as const;
