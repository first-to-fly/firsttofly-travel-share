import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Receipt Bank (Card) Report Filters
 */
export const ReceiptBankCardFiltersZ = z.object({
  /** Date range type */
  dateRangeType: z.enum([
    "today",
    "yesterday",
    "current-week",
    "last-week",
    "current-month",
    "last-month",
    "custom",
  ]),

  /** Start date (for custom range) */
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** End date (for custom range) */
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type ReceiptBankCardFilters = z.infer<typeof ReceiptBankCardFiltersZ>;

export const ReceiptBankCardReportMetadata: ReportMetadata = {
  id: "receipt-bank-card-report",
  slug: "receipt-bank-card-report",
  name: "Receipt (Bank/Card) Report",
  description: "Tracks receipts processed through bank cards and other payment channels with transaction details.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: false,
};
