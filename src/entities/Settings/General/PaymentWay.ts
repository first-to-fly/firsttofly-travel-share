import { z } from "zod";

import { DateISOStringZ, EntityOIDZ, EntityZ } from "../../entity";
import { PaymentMethod } from "../../Sales/Transaction";


// Enums
export enum PaymentMode {
  ONLINE = "online",
  OFFLINE = "offline",
}

export enum PaymentWayStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

// Schemas
export const PaymentModeZ = z.nativeEnum(PaymentMode);
export const PaymentWayStatusZ = z.nativeEnum(PaymentWayStatus);
export const PaymentMethodZ = z.nativeEnum(PaymentMethod);

export const PaymentWayZ = EntityZ.extend({
  tenantOID: EntityOIDZ,

  // Core Payment Configuration
  paymentMethod: PaymentMethodZ,
  name: z.string(),
  mode: PaymentModeZ,

  // UI and Display
  icon: z.string().optional(),
  remarks: z.string().optional(),

  // Status
  status: PaymentWayStatusZ.default(PaymentWayStatus.ACTIVE),

  // Business Rules
  isDaily: z.boolean().default(false),
  isEvent: z.boolean().default(false),
  isRefund: z.boolean().default(false),
  isPaymentLink: z.boolean().default(false),

  // Transaction Fees
  txnRatePercent: z.number().min(0).max(100).optional(),
  txnRateAmount: z.number().min(0).optional(),

  // Account Codes
  accountCodeId: z.string(),
  txnRateAccountCodeId: z.string().optional(),

  // Audit fields
  createdAt: DateISOStringZ,
  updatedAt: DateISOStringZ,
  createdBy: z.string(),
  updatedBy: z.string().optional(),
  deletedAt: DateISOStringZ.optional(),
});

export type PaymentWay = z.infer<typeof PaymentWayZ>;

// Events
export enum PaymentWayEvents {
  PAYMENT_WAY_UPDATED = "PAYMENT_WAY_UPDATED",
  PAYMENT_WAY_LIST_UPDATED = "PAYMENT_WAY_LIST_UPDATED",
}
