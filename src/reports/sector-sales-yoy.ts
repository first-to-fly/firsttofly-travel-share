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

export type SectorSalesYoYPivotData = Record<string, Record<number, Record<string, { sales: number; pax: number }>>>;

export interface SectorSalesYoYReportData {
  pivotData: SectorSalesYoYPivotData;
  years: number[];
  sectorNames: string[];
  tenantName: string;
}

export interface SectorSalesYoYReportJsonMetadata {
  years: number[];
  productType: string;
  filterByDate: string;
  sectorOIDs: string[];
  tenantName: string;
}

export type SectorSalesYoYReportTemplateContext = SectorSalesYoYReportData;

export type SectorSalesYoYReportJsonOutput = BaseReportJsonOutput<SectorSalesYoYReportJsonMetadata>;

export const SectorSalesYoYReportMetadata: ReportMetadata = {
  id: "sector-sales-yoy-report",
  slug: "sector-sales-yoy-report",
  name: "Sector Sales YoY",
  description: "Compares sales and pax counts across up to 3 years, by sector and month.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: false,
};

export const SECTOR_SALES_YOY_REPORT_SAMPLE_CONTEXT: SectorSalesYoYReportTemplateContext = {
  pivotData: {},
  years: [2024, 2025],
  sectorNames: [],
  tenantName: "Sample Company",
};

export const SECTOR_SALES_YOY_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Sector Sales YoY</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Sector Sales YoY</h1>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
