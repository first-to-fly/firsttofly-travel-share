import { z } from "zod";

import { BookingPaxPersonalDetailsZ } from "../../enums/BookingTypes";
import { EntityOIDZ } from "../entity";

/**
 * Transfer-specific metadata fields schema
 */
export const TransferMetadataZ = z.object({
  // === Original GroupTourBooking (being transferred FROM) ===
  transferredTo: z.array(z.string()).nullish(),
  transferringOIDs: z.array(EntityOIDZ).nullish(),
  transferStartDate: z.string().nullish(),
  transferredBy: z.string().nullish(),
  transferPassengers: z.array(z.object({
    oid: z.string().nullish(),
    name: z.string(),
    targetTourDepartureOID: EntityOIDZ,
  })).nullish(),

  // === New GroupTourBooking (created FROM transfer) ===
  transferredFrom: z.string().nullish(),
  transferredFromBookingNumber: z.string().nullish(),
  transferDate: z.string().nullish(),
  transferApprovedBy: z.string().nullish(),
  passengerMapping: z.record(z.string(), z.string()).nullish(),
}).partial();

export type TransferMetadata = z.infer<typeof TransferMetadataZ>;

/**
 * Base metadata schema for GroupTourBooking
 */
export const BaseGroupTourBookingMetadataZ = z.object({
  customer: BookingPaxPersonalDetailsZ,
});

export type BaseGroupTourBookingMetadata = z.infer<typeof BaseGroupTourBookingMetadataZ>;

/**
 * Complete GroupTourBooking metadata schema
 * Combines base metadata with optional transfer metadata
 */
export const GroupTourBookingMetadataZ = BaseGroupTourBookingMetadataZ.merge(TransferMetadataZ);

export type GroupTourBookingMetadata = z.infer<typeof GroupTourBookingMetadataZ>;
