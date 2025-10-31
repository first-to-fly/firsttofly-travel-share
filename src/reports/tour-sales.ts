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
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF],
  supportsWebView: true,
};

/**
 * Sample context for Tour Sales Report template preview
 */
export const TOUR_SALES_REPORT_SAMPLE_CONTEXT: TourSalesReportTemplateContext = {
  rows: [
    {
      productType: "GIT",
      sectorName: "Japan",
      productCode: "JP-DISC-2025",
      tourCode: "GT-2025-JP-15",
      tourName: "Discover Japan 10D",
      departureDate: "2025-07-15",
      departmentName: "Asia Pacific",
      bookingCount: 15,
      bookingPax: 28,
      tlCount: 1,
      tmCount: 1,
      sales: 125000,
      gst: 11363.64,
      netSales: 113636.36,
      cost: 85000,
      cancellationFee: 0,
      profit: 28636.36,
      profitMargin: 22.91,
      entryCost: 85000,
      currency: "SGD",
    },
    {
      productType: "FIT",
      sectorName: "Europe",
      productCode: "EU-CUSTOM-001",
      tourCode: "FIT-2025-EU-20",
      tourName: "European Highlights",
      departureDate: "2025-08-20",
      departmentName: "Europe",
      bookingCount: 3,
      bookingPax: 6,
      tlCount: 0,
      tmCount: 0,
      sales: 45000,
      gst: 4090.91,
      netSales: 40909.09,
      cost: 32000,
      cancellationFee: 0,
      profit: 8909.09,
      profitMargin: 19.80,
      entryCost: 32000,
      currency: "SGD",
    },
  ],
  totals: {
    bookingCount: 18,
    bookingPax: 34,
    tlCount: 1,
    tmCount: 1,
    sales: 170000,
    gst: 15454.55,
    netSales: 154545.45,
    cost: 117000,
    cancellationFee: 0,
    profit: 37545.45,
    profitMargin: 22.09,
    entryCost: 117000,
  },
  filters: {
    dateRange: {
      start: "2025-07-01",
      end: "2025-08-31",
    },
    dateType: "departure-date",
    salesCostStatus: "with-sales-and-cost",
    sector: "All",
    department: "All",
  },
  currency: {
    code: "SGD",
    symbol: "$",
  },
  tenant: {
    name: "Sample Travel Company",
  },
  generatedAt: "2025-10-31T12:00:00Z",
  generatedBy: "admin@example.com",
};

/**
 * Default HTML template for Tour Sales Report
 */
export const TOUR_SALES_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenant.name}} - Tour Sales Report</title>
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
  <h1>{{tenant.name}} - Tour Sales Report</h1>
  
  <div class="meta">
    <p><strong>Period:</strong> {{filters.dateRange.start}} to {{filters.dateRange.end}}</p>
    <p><strong>Date Type:</strong> {{filters.dateType}}</p>
    <p><strong>Sector:</strong> {{filters.sector}}</p>
    <p><strong>Department:</strong> {{filters.department}}</p>
    <p><strong>Generated:</strong> {{generatedAt}} by {{generatedBy}}</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Sector</th>
        <th>Product Code</th>
        <th>Tour Name</th>
        <th>Departure</th>
        <th class="number">Bookings</th>
        <th class="number">PAX</th>
        <th class="number">Sales ({{currency.symbol}})</th>
        <th class="number">Cost ({{currency.symbol}})</th>
        <th class="number">Profit ({{currency.symbol}})</th>
        <th class="number">Margin %</th>
      </tr>
    </thead>
    <tbody>
      {{#each rows}}
      <tr>
        <td>{{this.productType}}</td>
        <td>{{this.sectorName}}</td>
        <td>{{this.productCode}}</td>
        <td>{{this.tourName}}</td>
        <td>{{this.departureDate}}</td>
        <td class="number">{{this.bookingCount}}</td>
        <td class="number">{{this.bookingPax}}</td>
        <td class="number">{{this.sales}}</td>
        <td class="number">{{this.cost}}</td>
        <td class="number">{{this.profit}}</td>
        <td class="number">{{this.profitMargin}}</td>
      </tr>
      {{/each}}
    </tbody>
    <tfoot>
      <tr class="totals">
        <td colspan="5">TOTAL</td>
        <td class="number">{{totals.bookingCount}}</td>
        <td class="number">{{totals.bookingPax}}</td>
        <td class="number">{{totals.sales}}</td>
        <td class="number">{{totals.cost}}</td>
        <td class="number">{{totals.profit}}</td>
        <td class="number">{{totals.profitMargin}}</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`;
