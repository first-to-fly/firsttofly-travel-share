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
 * Sector Sales Report Template Context - for Handlebars template rendering
 * This is the data structure passed to HTML/PDF templates
 */
export type SectorSalesReportTemplateContext = SectorSalesReportData;

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

/**
 * Sample context for Sector Sales Report template preview
 */
export const SECTOR_SALES_REPORT_SAMPLE_CONTEXT: SectorSalesReportTemplateContext = {
  rows: [
    {
      sectorName: "Japan",
      totalRevenue: 450000,
      totalCost: 320000,
      totalProfit: 130000,
      totalMargin: 28.89,
      monthlyData: [
        {
          monthLabel: "Jan 2025",
          revenue: 150000,
          cost: 105000,
          profit: 45000,
          margin: 30.00,
        },
        {
          monthLabel: "Feb 2025",
          revenue: 180000,
          cost: 125000,
          profit: 55000,
          margin: 30.56,
        },
        {
          monthLabel: "Mar 2025",
          revenue: 120000,
          cost: 90000,
          profit: 30000,
          margin: 25.00,
        },
      ],
    },
    {
      sectorName: "Europe",
      totalRevenue: 320000,
      totalCost: 235000,
      totalProfit: 85000,
      totalMargin: 26.56,
      monthlyData: [
        {
          monthLabel: "Jan 2025",
          revenue: 110000,
          cost: 82000,
          profit: 28000,
          margin: 25.45,
        },
        {
          monthLabel: "Feb 2025",
          revenue: 95000,
          cost: 70000,
          profit: 25000,
          margin: 26.32,
        },
        {
          monthLabel: "Mar 2025",
          revenue: 115000,
          cost: 83000,
          profit: 32000,
          margin: 27.83,
        },
      ],
    },
  ],
  totals: {
    revenue: 770000,
    cost: 555000,
    profit: 215000,
    margin: 27.92,
  },
  filters: {
    dateRange: {
      start: "2025-01-01",
      end: "2025-03-31",
    },
  },
  reportMode: "monthly",
  tenant: {
    name: "Sample Travel Company",
  },
  generatedAt: "2025-10-31T12:00:00Z",
};

/**
 * Default HTML template for Sector Sales Report
 */
export const SECTOR_SALES_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenant.name}} - Sector Sales Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    h2 { color: #555; margin-top: 30px; }
    .meta { margin: 20px 0; color: #666; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; font-weight: bold; }
    .totals { font-weight: bold; background-color: #f9f9f9; }
    .number { text-align: right; }
  </style>
</head>
<body>
  <h1>{{tenant.name}} - Sector Sales Report</h1>
  
  <div class="meta">
    <p><strong>Period:</strong> {{filters.dateRange.start}} to {{filters.dateRange.end}}</p>
    <p><strong>Report Mode:</strong> {{reportMode}}</p>
    <p><strong>Generated:</strong> {{generatedAt}}</p>
  </div>

  {{#each rows}}
  <h2>{{this.sectorName}}</h2>
  <table>
    <thead>
      <tr>
        <th>Month</th>
        <th class="number">Revenue</th>
        <th class="number">Cost</th>
        <th class="number">Profit</th>
        <th class="number">Margin %</th>
      </tr>
    </thead>
    <tbody>
      {{#each this.monthlyData}}
      <tr>
        <td>{{this.monthLabel}}</td>
        <td class="number">{{this.revenue}}</td>
        <td class="number">{{this.cost}}</td>
        <td class="number">{{this.profit}}</td>
        <td class="number">{{this.margin}}</td>
      </tr>
      {{/each}}
      <tr class="totals">
        <td>TOTAL</td>
        <td class="number">{{this.totalRevenue}}</td>
        <td class="number">{{this.totalCost}}</td>
        <td class="number">{{this.totalProfit}}</td>
        <td class="number">{{this.totalMargin}}</td>
      </tr>
    </tbody>
  </table>
  {{/each}}

  <h2>Overall Totals</h2>
  <table>
    <tr>
      <th>Total Revenue</th>
      <td class="number">{{totals.revenue}}</td>
    </tr>
    <tr>
      <th>Total Cost</th>
      <td class="number">{{totals.cost}}</td>
    </tr>
    <tr>
      <th>Total Profit</th>
      <td class="number">{{totals.profit}}</td>
    </tr>
    <tr class="totals">
      <th>Overall Margin %</th>
      <td class="number">{{totals.margin}}</td>
    </tr>
  </table>
</body>
</html>`;
