import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Sector Sales YoY Report Filters
 */
export const SectorSalesYoYFiltersZ = z.object({
  /** Product type filter */
  productType: z.enum(["git", "fit"]).optional(),

  /** Sectors filter - array of sector OIDs (optional) */
  sectorOIDs: z.array(EntityOIDZ).optional(),

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
  tenantOID: EntityOIDZ,
});

export type SectorSalesYoYFilters = z.infer<typeof SectorSalesYoYFiltersZ>;

export interface SectorSalesYoYReportJsonMetadata {
  years: number[];
  productType: string;
  filterByDate: string;
  sectorOIDs: string[];
}

export type SectorSalesYoYReportJsonOutput = BaseReportJsonOutput<SectorSalesYoYReportJsonMetadata>;

export const SectorSalesYoYReportMetadata: ReportMetadata = {
  id: "sector-sales-yoy-report",
  slug: "sector-sales-yoy-report",
  name: "Sector Sales YoY",
  description: "Compares sales and pax counts across up to 3 years, by sector and month.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF],
  supportsWebView: false,
};
