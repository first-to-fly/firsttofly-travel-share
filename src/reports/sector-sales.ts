import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";


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
 * Sector Sales Report Row - RAW domain data for a single sector
 */
export interface SectorSalesReportRow {
  sectorName: string;
  weeklyData?: Array<{
    weekLabel: string;
    revenue: number;
    cost: number;
    profit: number;
    margin: number;
  }>;
  monthlyData?: Array<{
    monthLabel: string;
    revenue: number;
    cost: number;
    profit: number;
    margin: number;
  }>;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  totalMargin: number;
}

/**
 * Sector Sales Report Data - RAW domain data structure
 */
export interface SectorSalesReportData {
  rows: SectorSalesReportRow[];
  totals: {
    revenue: number;
    cost: number;
    profit: number;
    margin: number;
  };
  filters: {
    dateRange: {
      start: string;
      end: string;
    };
    productType?: string;
  };
  reportMode: "weekly" | "monthly" | "both";
  tenant: {
    name: string;
  };
  generatedAt: string;
}

export interface SectorSalesReportJsonMetadata {
  productType?: string;
  startDate?: string;
  endDate?: string;
  reportMode: string;
  hasWeekly: boolean;
  hasMonthly: boolean;
}

/**
 * Sector Sales Report JSON Output - for JSON export format
 */
export interface SectorSalesReportJsonOutput {
  report: {
    name: string;
    generatedAt: string;
    totalRows: number;
  };
  metadata: SectorSalesReportJsonMetadata;
  data: SectorSalesReportData;
}

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
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF],
  supportsWebView: true,
};
