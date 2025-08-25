import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum PaymentType {
  BANK_TRANSFER = "bank_transfer",
  CREDIT_CARD = "credit_card",
  PAYPAL = "paypal",
  CHECK = "check",
  CASH = "cash",
  OTHER = "other",
}

export const PaymentInfoZ = z.object({
  notes: z.string().optional(),
  referenceNumber: z.string().optional(),
}).optional();

export const SupplierPaymentZ = EntityZ.extend({
  supplierOID: EntityOIDZ,
  paymentType: z.nativeEnum(PaymentType),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),
  bankCode: z.string().optional(),
  routingNumber: z.string().optional(),
  swiftCode: z.string().optional(),
  iban: z.string().optional(),
  currency: z.string().optional(),
  cnapCode: z.string().optional(),
  bicCode: z.string().optional(),
  branchNo: z.string().optional(),
  branch: z.string().optional(),
  beneficiary: z.string().optional(),
  remarks: z.string().optional(),
});

export type SupplierPayment = z.infer<typeof SupplierPaymentZ>;
export type PaymentInfo = z.infer<typeof PaymentInfoZ>;

export enum SupplierPaymentEvents {
  SUPPLIER_PAYMENT_UPDATED = "SUPPLIER_PAYMENT_UPDATED",
  SUPPLIER_PAYMENT_LIST_UPDATED = "SUPPLIER_PAYMENT_LIST_UPDATED",
}
