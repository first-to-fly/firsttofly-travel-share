import { z } from "zod";

import { NamedURLZ } from "../../types/url";
import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";

/**
 * Bill status enum
 */
export enum BillStatus {
  DRAFT = "draft",
  SUBMITTED = "submitted",
  APPROVED = "approved",
  REJECTED = "rejected",
  VOIDED = "voided",
}

/**
 * Bill payment status enum
 */
export enum BillPaymentStatus {
  UNPAID = "unpaid",
  PARTIALLY_PAID = "partially-paid",
  PAID = "paid",
}

export enum BillEvents {
  BILL_UPDATED = "BILL_UPDATED",
  BILL_LIST_UPDATED = "BILL_LIST_UPDATED",
}

export enum BillCategory {
  BILL = "bill",
  CREDIT_NOTE = "credit-note",
}

/**
 * Zod schema for Bill
 */
export const BillZ = EntityZ.extend({
  entityType: z.literal(EntityType.BILL),

  code: z.string(),
  invoiceNo: z.string().optional(),
  status: z.nativeEnum(BillStatus),
  paymentStatus: z.nativeEnum(BillPaymentStatus),

  issueDate: z.string(),
  dueDate: z.string().optional(),

  // Required supplier reference
  supplierOID: EntityOIDZ,

  totalAmount: z.number(),
  currency: z.string(),

  // Bill category and currency rate
  category: z.nativeEnum(BillCategory).default(BillCategory.BILL),
  currencyRate: z.number().optional(),

  // Files
  files: z.array(NamedURLZ).optional(),

  // Xero integration fields
  xeroInvoiceId: z.string().optional(),
  xeroSyncStatus: z.string().optional(),
  xeroSyncedAt: z.string().optional(),

  remarks: z.string().optional(),
  internalNotes: z.string().optional(),
});

export type Bill = z.infer<typeof BillZ>;
