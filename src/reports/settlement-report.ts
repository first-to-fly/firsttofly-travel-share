import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
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
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
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
