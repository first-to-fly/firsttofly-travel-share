import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Sector Sales YoY Report Filters
 */
export const SectorSalesYoYFiltersZ = z.object({
  /** Product type filter */
  productType: z.enum(["all", "git", "fit"]).default("all"),

  /** Sectors filter - "all" or specific sector OIDs (comma-separated) */
  sectors: z.union([z.literal("all"), z.string().min(1)]).default("all"),

  /** Years for comparison (up to 3 years) */
  years: z.array(z.number().int().min(2000))
    .min(1, "At least 1 year is required")
    .max(3, "Maximum 3 years allowed for comparison")
    .refine(
      (years) => years.every((y) => y <= new Date().getFullYear() + 1),
      { message: "Years cannot be more than 1 year in the future" },
    ),

  /** Filter by date type */
  filterByDate: z.enum(["booking-date", "departure-date"]).default("booking-date"),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type SectorSalesYoYFilters = z.infer<typeof SectorSalesYoYFiltersZ>;

export const SectorSalesYoYReportMetadata: ReportMetadata = {
  id: "sector-sales-yoy-report",
  slug: "sector-sales-yoy-report",
  name: "Sector Sales YoY",
  description: "Compares sales and pax counts across up to 3 years, by sector and month.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: false,
};
