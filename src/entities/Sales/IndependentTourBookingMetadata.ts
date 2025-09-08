import { z } from "zod";

import { BookingPaxPersonalDetailsZ } from "../../enums/BookingTypes";


/**
 * Base metadata schema for IndependentTourBooking
 * Contains primary customer/contact information required for all bookings
 */
export const BaseIndependentTourBookingMetadataZ = z.object({
  /**
   * Primary customer/contact information
   * This is required for all independent tour bookings
   */
  customer: BookingPaxPersonalDetailsZ,
});

export type BaseIndependentTourBookingMetadata = z.infer<typeof BaseIndependentTourBookingMetadataZ>;

/**
 * Complete IndependentTourBooking metadata schema
 * Can be extended in the future with additional fields if needed
 */
export const TransferMetadataZ = z.object({
  /** If this is a destination booking, the OID of the source booking it was transferred from */
  transferredFrom: z.string().optional(),
  /** If this is a source booking, the list of newly created destination booking OIDs */
  transferredTo: z.array(z.string()).optional(),
  /** The approval request OID that governs this transfer operation */
  transferApprovalRequestOID: z.string().optional(),
  /** Timestamp (ISO string) when the transfer was executed/recorded */
  transferDate: z.string().optional(),
  /** The user OID who approved the transfer at completion */
  transferApprovedBy: z.string().optional(),

  /** Optional minimal audit trail of passengers included in the transfer */
  transferPassengers: z.array(z.object({
    /** Original passenger OID on the source booking (if available) */
    oid: z.string().optional(),
    /** Human-readable passenger name at time of transfer */
    name: z.string().optional(),
  })).optional(),
  /** Mapping of original passenger OIDs → new passenger OIDs on destination booking(s) */
  passengerMapping: z.record(z.string(), z.string()).optional(),
  /** Mapping of original room OIDs → new room OIDs created by the transfer */
  roomMapping: z.record(z.string(), z.string()).optional(),
  /** Mapping of original addon OIDs → new addon OIDs on destination booking(s) */
  addonMapping: z.record(z.string(), z.string()).optional(),
  /** Mapping of original discount OIDs → new discount OIDs on destination booking(s) */
  discountMapping: z.record(z.string(), z.string()).optional(),

  /** Cross-module correlation when the transfer crosses booking types (GTB↔ITB) */
  crossModuleTransfer: z.object({
    /** The booking type of the original/source booking */
    originalBookingType: z.enum(["GTB", "ITB"]).optional(),
    /** The booking type of the destination(s): "GTB", "ITB", or "mixed" if both */
    targetBookingType: z.string().optional(),
    /** All destination booking OIDs created by this transfer */
    targetBookingOIDs: z.array(z.string()).optional(),
  }).optional(),
}).partial();

// Complete IndependentTourBooking metadata schema (base + unified transfer fields)
export const IndependentTourBookingMetadataZ = BaseIndependentTourBookingMetadataZ.merge(TransferMetadataZ);

export type IndependentTourBookingMetadata = z.infer<typeof IndependentTourBookingMetadataZ>;
