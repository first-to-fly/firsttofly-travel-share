import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
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
  departureDate: Date;
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
 * Tour Sales Report - Totals structure
 */
export interface TourSalesTotals {
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
}

/**
 * Tour Sales Report Data - RAW domain data structure
 * This structure is what's passed to templates and formatters
 */
export interface TourSalesReportData {
  rows: TourSalesReportRow[];
  totals: TourSalesTotals;
  currencySymbol: string;
  currencyCode: string;
  tenantName: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  filters: TourSalesFilters;
  filterLabels: {
    sector: string;
    department: string;
  };
  generatedAt: Date;
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
 * Tour Sales Report Template Context - for Handlebars template rendering
 * This is the data structure passed to HTML/PDF templates
 */
export type TourSalesReportTemplateContext = TourSalesReportData;

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
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

/**
 * Sample context for Tour Sales Report template preview
 */
export const TOUR_SALES_REPORT_SAMPLE_CONTEXT: TourSalesReportTemplateContext = {
  rows: [],
  totals: {
    bookingCount: 0,
    bookingPax: 0,
    tlCount: 0,
    tmCount: 0,
    sales: 0,
    gst: 0,
    netSales: 0,
    cost: 0,
    cancellationFee: 0,
    profit: 0,
    profitMargin: 0,
    entryCost: 0,
  },
  currencySymbol: "$",
  currencyCode: "SGD",
  tenantName: "Sample Company",
  dateRange: {
    start: new Date("2025-01-01"),
    end: new Date("2025-01-31"),
  },
  filters: {
    tenantOID: "tenant_xxx",
    dateRangeType: "current-month",
    dateType: "departure-date",
    salesCostStatus: "all",
  },
  filterLabels: {
    sector: "All Sectors",
    department: "All Departments",
  },
  generatedAt: new Date(),
  generatedBy: "system",
};

/**
 * Default HTML template for Tour Sales Report
 */
export const TOUR_SALES_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Tour Sales Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .meta { margin: 20px 0; color: #666; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; font-weight: bold; }
    .totals { font-weight: bold; background-color: #f9f9f9; }
    .number { text-align: right; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Tour Sales Report</h1>
  <div class="meta">
    <p><strong>Total Bookings:</strong> {{totals.bookingCount}}</p>
    <p><strong>Total PAX:</strong> {{totals.bookingPax}}</p>
    <p><strong>Total Sales:</strong> {{currencySymbol}}{{totals.sales}}</p>
    <p><strong>Total Profit:</strong> {{currencySymbol}}{{totals.profit}} ({{totals.profitMargin}}%)</p>
  </div>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
