import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
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
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
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
