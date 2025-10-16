import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";


/**
 * Sector Sales Report Filters
 */
export const SectorSalesFiltersZ = z.object({
  /** Product type filter */
  productType: z.enum(["git", "fit"]).optional(),

  /** Date range type */
  dateRangeType: DateRangeTypeZ,

  /** Start date (for custom range) */
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type SectorSalesFilters = z.infer<typeof SectorSalesFiltersZ>;

/**
 * Report Metadata
 */
export interface ReportMetadata {
  id: string;
  slug: string;
  name: string;
  description: string;
  supportedFormats: ReportFormat[];
  supportsWebView: boolean;
}

export const SectorSalesReportMetadata: ReportMetadata = {
  id: "sector-sales-report",
  slug: "sector-sales-report",
  name: "Sector Sales Report",
  description: "Breakdown of sales by sector (or sector group), showing key metrics like revenue, costs, and gross profit.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: true,
};
