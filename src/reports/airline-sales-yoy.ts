import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Airline Sales YoY Report Filters
 */
export const AirlineSalesYoYFiltersZ = z.object({
  /** Product type filter */
  productType: z.enum(["all", "git", "fit"]).default("all"),

  /** Years for comparison (up to 3 years) */
  years: z.array(z.number().int().min(2000).max(2100)).min(1).max(3),

  /** Filter by date type */
  filterByDate: z.enum(["booking-date", "departure-date"]).default("booking-date"),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type AirlineSalesYoYFilters = z.infer<typeof AirlineSalesYoYFiltersZ>;

export const AirlineSalesYoYReportMetadata: ReportMetadata = {
  id: "airline-sales-yoy-report",
  slug: "airline-sales-yoy-report",
  name: "Airline Sales YoY",
  description: "Compares airline sales and pax counts across up to 3 years, by month.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: false,
};
