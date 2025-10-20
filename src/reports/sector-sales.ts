import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";


/**
 * Sector Sales Report Filters
 */
export const SectorSalesFiltersZ = z.object({
  /** Product type filter */
  productType: z.enum(["git", "fit"]).optional(),

  /** Start date */
  startDate: DateISOStringZ,

  /** End date */
  endDate: DateISOStringZ,

  /** Tenant OID */
  tenantOID: EntityOIDZ,
}).refine((value) => new Date(value.startDate).getTime() <= new Date(value.endDate).getTime(), {
  message: "startDate must be less than or equal to endDate",
  path: ["endDate"],
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
