import { z } from "zod";

import { BookingPaxPersonalDetailsZ } from "../../enums/BookingTypes";
import { EntityOIDZ } from "../entity";


/**
 * Base customer/contact metadata reused across bookings.
 * Contains the primary contact details for the booking.
 */
export const BaseBookingCustomerMetadataZ = z.object({
  /** Primary customer/contact information (required across bookings) */
  customer: BookingPaxPersonalDetailsZ,
});
export type BaseBookingCustomerMetadata = z.infer<typeof BaseBookingCustomerMetadataZ>;

/**
 * Minimal passenger audit info recorded during a transfer.
 */
export const TransferPassengerBaseZ = z.object({
  /** Original passenger OID on the source booking (if available) */
  oid: z.string().optional(),
  /** Passenger name captured at the time of transfer (if available) */
  name: z.string().optional(),
});

/**
 * GTB-specific passenger info with target tour departure linkage.
 */
export const GTBTransferPassengerZ = TransferPassengerBaseZ.extend({
  /** For GTB→GTB, target tour departure OID the passenger moves into */
  targetTourDepartureOID: EntityOIDZ.optional(),
});

/**
 * Common transfer-related metadata used by both GTB and ITB.
 */
export const BaseTransferMetadataZ = z
  .object({
    /** If destination booking, OID of the source booking it was transferred from */
    transferredFrom: z.string().optional(),
    /** If source booking, list of destination booking OIDs created */
    transferredTo: z.array(z.string()).optional(),
    /** The approval request OID governing this transfer operation */
    transferApprovalRequestOID: z.string().optional(),
    /** ISO datetime string when the transfer was executed/recorded */
    transferDate: z.string().optional(),
    /** The user OID who approved the transfer upon completion */
    transferApprovedBy: z.string().optional(),

    /** Mapping of original passenger OIDs → new passenger OIDs on destination booking(s) */
    passengerMapping: z.record(z.string(), z.string()).optional(),
    /** Mapping of original room OIDs → new room OIDs created by the transfer */
    roomMapping: z.record(z.string(), z.string()).optional(),
    /** Mapping of original addon OIDs → new addon OIDs on destination booking(s) */
    addonMapping: z.record(z.string(), z.string()).optional(),
    /** Mapping of original discount OIDs → new discount OIDs on destination booking(s) */
    discountMapping: z.record(z.string(), z.string()).optional(),

    /** Cross-module correlation details for GTB↔ITB transfer scenarios */
    crossModuleTransfer: z
      .object({
        /** Booking type of the original/source booking */
        originalBookingType: z.enum(["GTB", "ITB"]).optional(),
        /** Booking type of the destination(s); use "mixed" if both GTB and ITB */
        targetBookingType: z.enum(["GTB", "ITB", "mixed"]).optional(),
        /** All destination booking OIDs created by this transfer */
        targetBookingOIDs: z.array(z.string()).optional(),
      })
      .optional(),
  })
  .partial();

/** GTB-specific transfer metadata. */
export const GTBTransferMetadataZ = BaseTransferMetadataZ.extend({
  /** Passengers included in the transfer (GTB flavor) */
  transferPassengers: z.array(GTBTransferPassengerZ).optional(),
});

/** ITB-specific transfer metadata. */
export const ITBTransferMetadataZ = BaseTransferMetadataZ.extend({
  /** Passengers included in the transfer (generic) */
  transferPassengers: z.array(TransferPassengerBaseZ).optional(),
});

export type BaseTransferMetadata = z.infer<typeof BaseTransferMetadataZ>;
export type GTBTransferMetadata = z.infer<typeof GTBTransferMetadataZ>;
export type ITBTransferMetadata = z.infer<typeof ITBTransferMetadataZ>;
