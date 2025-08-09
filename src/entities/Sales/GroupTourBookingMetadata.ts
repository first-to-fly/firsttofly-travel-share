import { z } from "zod";

import { EntityOIDZ } from "../entity";
import { BookingPaxPersonalDetailsZ } from "../../enums/BookingTypes";

/**
 * Transfer-specific metadata fields schema
 */
export const TransferMetadataZ = z.object({
  // === Original GroupTourBooking (being transferred FROM) ===
  transferredTo: z.array(z.string()).optional(),
  transferringOIDs: z.array(EntityOIDZ).optional(),
  transferStartDate: z.string().optional(),
  transferredBy: z.string().optional(),
  transferPassengers: z.array(z.object({
    oid: z.string().optional(),
    name: z.string(),
    targetTourDepartureOID: EntityOIDZ,
  })).optional(),

  // === New GroupTourBooking (created FROM transfer) ===
  transferredFrom: z.string().optional(),
  transferredFromBookingNumber: z.string().optional(),
  transferDate: z.string().optional(),
  transferApprovedBy: z.string().optional(),
  passengerMapping: z.record(z.string(), z.string()).optional(),
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
