import { z } from "zod";

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

/**
 * Zod schema for Bill
 */
export const BillZ = EntityZ.extend({
  entityType: z.literal(EntityType.BILL),

  billNo: z.string(),
  invoiceNo: z.string().optional(),
  status: z.nativeEnum(BillStatus),
  paymentStatus: z.nativeEnum(BillPaymentStatus),

  issueDate: z.string(),
  dueDate: z.string().optional(),

  // Required supplier reference
  supplierOID: EntityOIDZ,

  totalAmount: z.number(),
  currency: z.string(),

  // Xero integration fields
  xeroInvoiceId: z.string().optional(),
  xeroSyncStatus: z.string().optional(),
  xeroSyncedAt: z.string().optional(),

  remarks: z.string().optional(),
  internalNotes: z.string().optional(),
});

export type Bill = z.infer<typeof BillZ>;
