// simple-import-sort
import { z } from "zod";

import { EntityZ } from "../entity";
// Corrected path

export const TourTransactionPaymentStatusEnum = z.enum([
  "unpaid",
  "partial_deposit",
  "deposit_paid",
  "fully_paid",
]);
export type TourTransactionPaymentStatusEnum = z.infer<typeof TourTransactionPaymentStatusEnum>;

export const TourTransactionBookingStatusEnum = z.enum([
  "in_progress",
  "unpaid",
  "deposit_paid",
  "completed",
  "cancelled",
  "voided",
]);
export type TourTransactionBookingStatusEnum = z.infer<typeof TourTransactionBookingStatusEnum>;

export const TourTransactionTransportTypeEnum = z.enum([
  "flight",
  "bus",
  "cruise",
  "train",
  "ferry",
]);
export type TourTransactionTransportTypeEnum = z.infer<typeof TourTransactionTransportTypeEnum>;

export const TourTransactionZ = EntityZ.extend({
  bookingId: z.string().uuid(),
  tenantId: z.string().uuid(),
  productId: z.string().uuid(),
  tourDepartureId: z.string().uuid(),
  costingId: z.string().uuid(),
  productPricingId: z.string().uuid(),
  departmentId: z.string().uuid().optional(), // Added departmentId as optional
  bookingReference: z.string().max(50),
  paymentStatus: TourTransactionPaymentStatusEnum.default("unpaid"),
  bookingStatus: TourTransactionBookingStatusEnum.default("unpaid"),
  totalAmount: z.number(), // Assuming decimal is represented as number in Zod
  receivedAmount: z.number().default(0),
  discounts: z.number().default(0),
  addOns: z.number().default(0),
  transportType: TourTransactionTransportTypeEnum.optional(),
  snapshot: z.record(z.unknown()), // JSONB represented as record(z.unknown()) or a more specific schema if available
  metadata: z.record(z.unknown()).optional(), // JSONB
});

export type TourTransaction = z.infer<typeof TourTransactionZ>;

export const TOUR_TRANSACTION_EVENT_PREFIX = "tour_transaction";
export const TourTransactionEvents = {
  CREATED: `${TOUR_TRANSACTION_EVENT_PREFIX}:created`,
  UPDATED: `${TOUR_TRANSACTION_EVENT_PREFIX}:updated`,
  DELETED: `${TOUR_TRANSACTION_EVENT_PREFIX}:deleted`,
  // Add other specific events if needed, e.g., PAX_ADDED, ROOM_UPDATED_IN_TRANSACTION
} as const;
