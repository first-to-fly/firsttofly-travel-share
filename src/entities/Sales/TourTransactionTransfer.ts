// Attempting to use the alias again, assuming it might be resolvable now or configured at a higher level

import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { NamedURLZ } from "../../types/url";
import { EntityOIDZ, EntityZ } from "../entity";


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
  AIR_WALLEX = "air_wallex",
  OTHER = "other",
}

export const PaymentMethodZ = z.nativeEnum(PaymentMethod);


export const TourTransactionTransferZ = EntityZ.extend({

  transferType: TourTransactionTransferTypeZ,

  amount: z.number().positive(),
  currencyCode: z.string().length(3),
  paymentMethod: PaymentMethodZ.optional(),
  transactionReference: z.string().max(255).optional(),
  transactionDate: DateISOStringZ,
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  files: z.array(NamedURLZ).optional().default([]),

  tourTransactionOID: EntityOIDZ,

});

export type TourTransactionTransfer = z.infer<typeof TourTransactionTransferZ>;

export enum TourTransactionTransferEvents {
  TOUR_TRANSACTION_TRANSFER_UPDATED = "TOUR_TRANSACTION_TRANSFER_UPDATED",
  TOUR_TRANSACTION_TRANSFER_LIST_UPDATED = "TOUR_TRANSACTION_TRANSFER_LIST_UPDATED",
}
