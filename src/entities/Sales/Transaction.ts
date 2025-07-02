import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { NamedURLZ } from "../../types/url";
import { EntityOIDZ, EntityZ } from "../entity";


export enum TransactionType {
  RECEIPT = "receipt",
  REFUND = "refund",
  CANCELLATION_FEE = "cancellation_fee",
  JOURNAL = "journal",
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export const TransactionTypeZ = z.nativeEnum(TransactionType);
export const TransactionStatusZ = z.nativeEnum(TransactionStatus);

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

export const PaymentWayZ = z.object({
  method: PaymentMethodZ,
  details: z.record(z.unknown()).optional(),
});

export const TransactionZ = EntityZ.extend({
  paymentOrderOID: EntityOIDZ,
  payerFirstName: z.string().optional(),
  payerLastName: z.string().optional(),
  payerMobile: z.string().optional(),
  payerEmail: z.string().email().optional(),
  amount: z.number(),
  serviceFee: z.number().min(0).default(0),
  transactionType: TransactionTypeZ,
  transactionDate: DateISOStringZ,
  paymentWay: PaymentWayZ.optional(),
  status: TransactionStatusZ,
  transactionReference: z.string().optional(),
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  files: z.array(NamedURLZ).default([]),
});

export type Transaction = z.infer<typeof TransactionZ>;
export type PaymentWay = z.infer<typeof PaymentWayZ>;

export enum TransactionEvents {
  TRANSACTION_UPDATED = "TRANSACTION_UPDATED",
  TRANSACTION_LIST_UPDATED = "TRANSACTION_LIST_UPDATED",
}
