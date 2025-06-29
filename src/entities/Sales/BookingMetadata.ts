import { z } from "zod";

import { EntityOIDZ } from "../entity";
import { BookingPaxPersonalDetailsZ } from "./BookingPax";

/**
 * Transfer-specific metadata fields schema
 */
export const TransferMetadataZ = z.object({
  // === Original Booking (being transferred FROM) ===
  transferredTo: z.array(z.string()).optional(),
  transferringOIDs: z.array(EntityOIDZ).optional(),
  transferStartDate: z.string().optional(),
  transferredBy: z.string().optional(),
  transferPassengers: z.array(z.object({
    oid: z.string().optional(),
    name: z.string(),
    targetTourDepartureOID: EntityOIDZ,
  })).optional(),

  // === New Booking (created FROM transfer) ===
  transferredFrom: z.string().optional(),
  transferredFromBookingNumber: z.string().optional(),
  transferDate: z.string().optional(),
  transferApprovedBy: z.string().optional(),
  passengerMapping: z.record(z.string(), z.string()).optional(),
}).partial();

export type TransferMetadata = z.infer<typeof TransferMetadataZ>;

/**
 * Base metadata schema for Booking
 */
export const BaseBookingMetadataZ = z.object({
  customer: BookingPaxPersonalDetailsZ,
});

export type BaseBookingMetadata = z.infer<typeof BaseBookingMetadataZ>;

/**
 * Complete Booking metadata schema
 * Combines base metadata with optional transfer metadata
 */
export const BookingMetadataZ = BaseBookingMetadataZ.merge(TransferMetadataZ);

export type BookingMetadata = z.infer<typeof BookingMetadataZ>;
