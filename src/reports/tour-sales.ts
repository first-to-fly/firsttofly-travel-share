import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Tour Sales Report Filters
 */
export const TourSalesFiltersZ = z.object({
  /** Product type filter */
  productType: z.enum(["git", "fit"]).optional(),

  /** Product code (optional) */
  productCode: z.string().optional(),

  /** Date type - booking date or departure date */
  dateType: z.enum(["booking-date", "departure-date"]).default("departure-date"),

  /** Departments filter (optional) */
  departmentOID: EntityOIDZ.optional(),

  /** Date range type */
  dateRangeType: DateRangeTypeZ,

  /** Start date (for custom range) */
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Sales & Cost Status filter */
  salesCostStatus: z.enum([
    "all",
    "with-sales-and-cost",
    "with-sales-no-cost",
    "with-cost-no-sales",
  ]).default("with-sales-and-cost"),

  /** Sector filter (optional) */
  sectorOID: EntityOIDZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type TourSalesFilters = z.infer<typeof TourSalesFiltersZ>;

/**
 * Tour Sales Report Row - RAW domain data for a single tour
 */
export interface TourSalesReportRow {
  productType: "GIT" | "FIT";
  sectorName: string;
  productCode: string;
  tourCode: string;
  tourName: string;
  departureDate: string;
  departmentName: string;
  bookingCount: number;
  bookingPax: number;
  tlCount: number;
  tmCount: number;
  sales: number;
  gst: number;
  netSales: number;
  cost: number;
  cancellationFee: number;
  profit: number;
  profitMargin: number;
  entryCost: number;
  currency: string;
}

/**
 * Tour Sales Report Data - RAW domain data structure
 */
export interface TourSalesReportData {
  rows: TourSalesReportRow[];
  totals: {
    bookingCount: number;
    bookingPax: number;
    tlCount: number;
    tmCount: number;
    sales: number;
    gst: number;
    netSales: number;
    cost: number;
    cancellationFee: number;
    profit: number;
    profitMargin: number;
    entryCost: number;
  };
  filters: {
    dateRange: {
      start: string;
      end: string;
    };
    productType?: string;
    productCode?: string;
    dateType: string;
    salesCostStatus: string;
    sector: string;
    department: string;
  };
  currency: {
    code: string;
    symbol: string;
  };
  tenant: {
    name: string;
  };
  generatedAt: string;
  generatedBy: string;
}

export interface TourSalesReportJsonMetadata {
  totalRevenue: number;
  totalNetSales: number;
  totalCost: number;
  totalProfit: number;
  productType: string;
  salesCostStatus: string;
  dateType: string;
  printedAt: string;
  sector: string;
  department: string;
}

/**
 * Tour Sales Report JSON Output - for JSON export format
 */
export interface TourSalesReportJsonOutput {
  report: {
    name: string;
    generatedAt: string;
    totalRows: number;
  };
  metadata: TourSalesReportJsonMetadata;
  data: TourSalesReportData;
}

export const TourSalesReportMetadata: ReportMetadata = {
  id: "tour-sales-report",
  slug: "tour-sales-report",
  name: "Tour Sales Report",
  description: "Summarizes tour sales by product, showing revenue, costs, and gross profit for each tour.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF],
  supportsWebView: true,
};
