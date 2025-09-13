// simple-import-sort
import { z } from "zod";

import { DateISOStringZ, EntityOIDZ, EntityZ } from "../entity";


export const CustomerBookingLinkZ = EntityZ.extend({

  bookingOID: EntityOIDZ,
  secureToken: z.string().min(32).max(256),
  expiresAt: DateISOStringZ.optional(),
  isActive: z.boolean().default(true),
  accessCount: z.number().default(0), // Successful accesses
  failedAccessCount: z.number().default(0), // Failed verification attempts
  lastAccessedAt: DateISOStringZ.optional(),
  customerEmail: z.string().email(),
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
