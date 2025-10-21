import { z } from "zod";

import { DateISOStringZ, EntityOIDZ, EntityZ } from "../../entity";
import { PaymentMethod } from "../../Sales/Transaction";


// Enums
export enum PaymentMode {
  ONLINE = "online",
  OFFLINE = "offline",
}

export enum CreditCardBank {
  AMEX = "amex",
  UOB = "uob",
  DBS = "dbs",
  CITI = "citi",
  VISA = "visa",
  MASTERCARD = "mastercard",
  OTHERS = "others",
}

// Schemas
export const PaymentModeZ = z.nativeEnum(PaymentMode);
export const PaymentMethodZ = z.nativeEnum(PaymentMethod);
export const CreditCardBankZ = z.nativeEnum(CreditCardBank);

// Unified Payment Configuration (for all payment methods)
export const PaymentConfigZ = z.object({
  // For CREDIT_CARD methods only
  bank: CreditCardBankZ.nullish(),
  // Core account configuration (required for all)
  accountCodeOID: z.string(),
  txnRateAccountCodeOID: z.string().nullish(),
  txnRatePercent: z.number().min(0).max(100).nullish(),
  txnRateAmount: z.number().min(0).nullish(),
});

export type PaymentConfig = z.infer<typeof PaymentConfigZ>;

export const PaymentWayZ = EntityZ.extend({
  tenantOID: EntityOIDZ,

  // Core Payment Configuration
  paymentMethod: PaymentMethodZ,
  name: z.string(),
  mode: PaymentModeZ,

  // UI and Display
  icon: z.string().nullish(),
  remarks: z.string().nullish(),

  // Status
  isActive: z.boolean().default(true),
  isRefund: z.boolean().default(false),

  // Business Rules
  isDaily: z.boolean().default(false),
  isEvent: z.boolean().default(false),

  // Unified Payment Configurations (for all payment methods)
  paymentConfigs: z.array(PaymentConfigZ).min(1),

  // Audit fields
  createdAt: DateISOStringZ,
  updatedAt: DateISOStringZ,
  createdBy: z.string(),
  updatedBy: z.string().nullish(),
  deletedAt: DateISOStringZ.nullish(),
});

export type PaymentWay = z.infer<typeof PaymentWayZ>;

// Events
export enum PaymentWayEvents {
  PAYMENT_WAY_UPDATED = "PAYMENT_WAY_UPDATED",
  PAYMENT_WAY_LIST_UPDATED = "PAYMENT_WAY_LIST_UPDATED",
}
