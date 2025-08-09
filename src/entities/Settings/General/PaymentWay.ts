import { z } from "zod";

import { DateISOStringZ, EntityOIDZ, EntityZ } from "../../entity";


// Enums
export enum PaymentMode {
  CREDIT_CARD = "credit-card",
  DEBIT_CARD = "debit-card",
  BANK_TRANSFER = "bank-transfer",
  CASH = "cash",
  CHECK = "check",
  E_WALLET = "e-wallet",
  CRYPTOCURRENCY = "cryptocurrency",
  BANK_DEPOSIT = "bank-deposit",
  WIRE_TRANSFER = "wire-transfer",
  PAYPAL = "paypal",
  STRIPE = "stripe",
  SQUARE = "square",
  OTHER = "other",
}

export enum PaymentWayStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}

// Schemas
export const PaymentModeZ = z.nativeEnum(PaymentMode);
export const PaymentWayStatusZ = z.nativeEnum(PaymentWayStatus);

export const PaymentWayZ = EntityZ.extend({
  tenantOID: EntityOIDZ,
  
  // Basic Information
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
  mode: PaymentModeZ,
  status: PaymentWayStatusZ.default(PaymentWayStatus.ACTIVE),
  
  // Account Codes
  debitAccountCodeId: z.string().optional(),
  creditAccountCodeId: z.string().optional(),
  feeAccountCodeId: z.string().optional(),
  
  // Fees Configuration
  percentageFee: z.number().min(0).max(100).optional(),
  fixedFee: z.number().min(0).optional(),
  minFee: z.number().min(0).optional(),
  maxFee: z.number().min(0).optional(),
  
  // Business Rules
  isDefault: z.boolean().default(false),
  isPaymentLink: z.boolean().default(false),
  isDaily: z.boolean().default(false),
  isEvent: z.boolean().default(false),
  isRefund: z.boolean().default(false),
  isBulkPayment: z.boolean().default(false),
  
  // Display Settings
  displayOrder: z.number().int().min(0).default(0),
  icon: z.string().optional(),
  color: z.string().optional(),
  
  // Metadata
  metadata: z.record(z.unknown()).optional(),
  
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