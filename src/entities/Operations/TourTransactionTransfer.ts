// Attempting to use the alias again, assuming it might be resolvable now or configured at a higher level

import { z } from "zod";

import { NamedURLZ } from "../../types/url";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum TourTransactionTransferType {
  PAYMENT_RECEIVED = "payment_received",
  REFUND_ISSUED = "refund_issued",
  BOOKING_CREDIT = "booking_credit",
  BOOKING_DEBIT = "booking_debit",
}

export const TourTransactionTransferTypeZ = z.nativeEnum(TourTransactionTransferType);

export enum PaymentMethod {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  BANK_TRANSFER = "bank_transfer",
  ONLINE_GATEWAY = "online_gateway",
  VOUCHER = "voucher",
  OTHER = "other",
}

export const PaymentMethodZ = z.nativeEnum(PaymentMethod);


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
