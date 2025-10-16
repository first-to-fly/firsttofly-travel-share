import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Settlement Report Filters
 */
export const SettlementReportFiltersZ = z.object({
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

export type SettlementReportFilters = z.infer<typeof SettlementReportFiltersZ>;

export const SettlementReportMetadata: ReportMetadata = {
  id: "settlement-report",
  slug: "settlement-report",
  name: "Settlement Report (Terminal/Channel)",
  description: "Shows settlement of receipts by payment channel/terminal, with booking details.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: false,
};
