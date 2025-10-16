import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Min Deposit Report Filters
 */
export const MinDepositFiltersZ = z.object({
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

export type MinDepositFilters = z.infer<typeof MinDepositFiltersZ>;

export const MinDepositReportMetadata: ReportMetadata = {
  id: "min-deposit-report",
  slug: "min-deposit-report",
  name: "Min Deposit Report",
  description: "Shows bookings with deposits received compared to required minimum deposit.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: true,
};
