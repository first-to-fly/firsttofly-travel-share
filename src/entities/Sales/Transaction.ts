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

export const TransactionZ = EntityZ.extend({
  paymentOrderOID: EntityOIDZ,
  payerFirstName: z.string().nullish(),
  payerLastName: z.string().nullish(),
  payerMobile: z.string().nullish(),
  payerEmail: z.string().email().nullish(),
  amount: z.number(),
  serviceFee: z.number().min(0).default(0),
  transactionType: TransactionTypeZ,
  transactionDate: DateISOStringZ,
  paymentWayOID: EntityOIDZ.nullish(),
  status: TransactionStatusZ,
  transactionReference: z.string().nullish(),
  notes: z.string().nullish(),
  metadata: z.record(z.unknown()).nullish(),
  files: z.array(NamedURLZ).default([]),
});

export type Transaction = z.infer<typeof TransactionZ>;

export enum TransactionEvents {
  TRANSACTION_UPDATED = "TRANSACTION_UPDATED",
  TRANSACTION_LIST_UPDATED = "TRANSACTION_LIST_UPDATED",
}
