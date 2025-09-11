// simple-import-sort
import { z } from "zod";

import { BookingTypeZ } from "../../enums/BookingTypes";
import { DateISOStringZ, EntityOIDZ, EntityZ } from "../entity";


export const CustomerBookingLinkZ = EntityZ.extend({

  bookingOID: EntityOIDZ,
  bookingType: BookingTypeZ,
  secureToken: z.string().min(32).max(256),
  expiresAt: DateISOStringZ.optional(),
  isActive: z.boolean().default(true),
  accessCount: z.number().default(0),
  lastAccessedAt: DateISOStringZ.optional(),
  customerEmail: z.string().email().optional(),
  isVerified: z.boolean().default(false),
  verifiedAt: DateISOStringZ.optional(),
  metadata: z.record(z.unknown()).optional(),

});

export type CustomerBookingLink = z.infer<typeof CustomerBookingLinkZ>;

export enum CustomerBookingLinkEvents {
  CUSTOMER_BOOKING_LINK_GENERATED = "CUSTOMER_BOOKING_LINK_GENERATED",
  CUSTOMER_BOOKING_LINK_ACCESSED = "CUSTOMER_BOOKING_LINK_ACCESSED",
  CUSTOMER_BOOKING_LINK_VERIFIED = "CUSTOMER_BOOKING_LINK_VERIFIED",
  CUSTOMER_BOOKING_LINK_UPDATED = "CUSTOMER_BOOKING_LINK_UPDATED",
  CUSTOMER_BOOKING_LINK_LIST_UPDATED = "CUSTOMER_BOOKING_LINK_LIST_UPDATED",
}
