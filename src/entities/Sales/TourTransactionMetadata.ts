import { z } from "zod";

import { TourTransactionPaxPersonalDetailsZ } from "./TourTransactionPax";

/**
 * Transfer-specific metadata fields schema
 */
export const TransferMetadataZ = z.object({
  // === Original Transaction (being transferred FROM) ===
  transferredTo: z.array(z.string()).optional(),
  transferringOIDs: z.array(z.string()).optional(),
  transferStartDate: z.string().optional(),
  transferredBy: z.string().optional(),
  transferPassengers: z.array(z.object({
    oid: z.string().optional(),
    name: z.string(),
    targetTourDepartureOID: z.string(),
  })).optional(),

  // === New Transaction (created FROM transfer) ===
  transferredFrom: z.string().optional(),
  transferredFromBookingNumber: z.string().optional(),
  transferDate: z.string().optional(),
  transferApprovedBy: z.string().optional(),
  passengerMapping: z.record(z.string(), z.string()).optional(),
}).partial();

export type TransferMetadata = z.infer<typeof TransferMetadataZ>;

/**
 * Base metadata schema for TourTransaction
 */
export const BaseTourTransactionMetadataZ = z.object({
  customer: TourTransactionPaxPersonalDetailsZ,
});

export type BaseTourTransactionMetadata = z.infer<typeof BaseTourTransactionMetadataZ>;

/**
 * Complete TourTransaction metadata schema
 * Combines base metadata with optional transfer metadata
 */
export const TourTransactionMetadataZ = BaseTourTransactionMetadataZ.merge(TransferMetadataZ);

export type TourTransactionMetadata = z.infer<typeof TourTransactionMetadataZ>;
