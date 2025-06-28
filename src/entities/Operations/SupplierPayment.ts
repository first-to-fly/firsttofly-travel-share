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
  paymentTerms: z.string().optional(),
  isActive: z.boolean().default(true),
  paymentInfo: PaymentInfoZ,
});

export type SupplierPayment = z.infer<typeof SupplierPaymentZ>;
export type PaymentInfo = z.infer<typeof PaymentInfoZ>;

// Legacy interface for backward compatibility
interface BaseEntityColumns {
  createdAt: string;
  updatedAt?: string;
  createdBy: string;
  updatedBy?: string;
}

export interface LegacySupplierPayment extends BaseEntityColumns {
  id: string;
  supplierId: string;
  paymentType: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  bankCode?: string;
  swiftCode?: string;
  routingNumber?: string;
  isDefault: boolean;
}
