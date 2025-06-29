import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { NamedURLZ } from "../../types/url";
import { EntityOIDZ, EntityZ } from "../entity";


export enum BookingTransferType {
  PAYMENT_RECEIVED = "payment_received",
  REFUND_ISSUED = "refund_issued",
  BOOKING_CREDIT = "booking_credit",
  BOOKING_DEBIT = "booking_debit",
}

export const BookingTransferTypeZ = z.nativeEnum(BookingTransferType);

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


export const BookingTransferZ = EntityZ.extend({

  transferType: BookingTransferTypeZ,

  amount: z.number().positive(),
  currencyCode: z.string().length(3),
  paymentMethod: PaymentMethodZ.optional(),
  transactionReference: z.string().max(255).optional(),
  transactionDate: DateISOStringZ,
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  files: z.array(NamedURLZ).optional().default([]),

  bookingOID: EntityOIDZ,

});

export type BookingTransfer = z.infer<typeof BookingTransferZ>;

export enum BookingTransferEvents {
  BOOKING_TRANSFER_UPDATED = "BOOKING_TRANSFER_UPDATED",
  BOOKING_TRANSFER_LIST_UPDATED = "BOOKING_TRANSFER_LIST_UPDATED",
}
