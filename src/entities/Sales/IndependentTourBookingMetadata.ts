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
export const IndependentTourBookingMetadataZ = BaseIndependentTourBookingMetadataZ.passthrough();

export type IndependentTourBookingMetadata = z.infer<typeof IndependentTourBookingMetadataZ>;
