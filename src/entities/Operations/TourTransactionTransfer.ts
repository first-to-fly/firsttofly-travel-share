// Attempting to use the alias again, assuming it might be resolvable now or configured at a higher level

import { z } from "zod";

import { NamedURLZ } from "../../types/url";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export const TourTransactionTransferTypeZ = z.enum([
  "payment_received",
  "refund_issued",
  "booking_credit",
  "booking_debit",
]);
export type TourTransactionTransferType = z.infer<typeof TourTransactionTransferTypeZ>;

export const PaymentMethodZ = z.enum([
  "cash",
  "credit_card",
  "bank_transfer",
  "online_gateway",
  "voucher",
  "other",
]);
export type PaymentMethod = z.infer<typeof PaymentMethodZ>;

export const TourTransactionTransferZ = EntityZ.extend({
  transferType: TourTransactionTransferTypeZ,
  amount: z.number().positive(),
  currencyCode: z.string().length(3),
  paymentMethod: PaymentMethodZ.optional(),
  transactionReference: z.string().max(255).optional(),
  transactionDate: z.date().default(() => new Date()),
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  files: z.array(NamedURLZ).optional().default([]),

  tenantId: z.string().uuid(),
  bookingId: z.string().uuid(),

}).merge(z.object({
  entityType: z.literal(EntityType.TOUR_TRANSACTION_TRANSFER).default(EntityType.TOUR_TRANSACTION_TRANSFER),
  tourTransactionTransferOID: z.string().uuid(),
  tenantOID: z.string().uuid(),
  tourTransactionOID: z.string().uuid(),
}));

export type TourTransactionTransfer = z.infer<typeof TourTransactionTransferZ>;

export const TOUR_TRANSACTION_TRANSFER_EVENT_PREFIX = "tour_transaction_transfer";
export const TourTransactionTransferEvents = {
  CREATED: `${TOUR_TRANSACTION_TRANSFER_EVENT_PREFIX}:created`,
} as const;
