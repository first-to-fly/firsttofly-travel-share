import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
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
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
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
