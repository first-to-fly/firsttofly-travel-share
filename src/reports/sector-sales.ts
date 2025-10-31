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
 * Sector Sales Report - Daily data point
 */
export interface SectorSalesDailyData {
  date: string;
  sectorId: string;
  sectorName: string;
  sectorGroup: string;
  headcount: number;
  amount: number;
}

/**
 * Sector Sales Report - Weekly aggregation
 */
export interface SectorSalesWeeklyData {
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  bySector: Record<string, {
    headcount: number;
    amount: number;
  }>;
}

/**
 * Sector Sales Report - Monthly aggregation
 */
export interface SectorSalesMonthlyData {
  monthLabel: string;
  monthStart: string;
  bySector: Record<string, {
    headcount: number;
    amount: number;
  }>;
}

/**
 * Sector Sales Report - Sector structure definition
 */
export interface SectorSalesSectorInfo {
  sectorId: string;
  sectorName: string;
  sectorGroup: string;
}

/**
 * Sector Sales Report Data - RAW domain data structure
 */
export interface SectorSalesReportData {
  /** Raw daily sales data points */
  dailyData: SectorSalesDailyData[];

  /** Weekly aggregations (if applicable) */
  weeklyData?: SectorSalesWeeklyData[];

  /** Monthly aggregations (if applicable) */
  monthlyData?: SectorSalesMonthlyData[];

  /** Sector structure/catalogue */
  sectors: SectorSalesSectorInfo[];

  /** Overall totals */
  totals: {
    headcount: number;
    amount: number;
  };

  /** Report configuration */
  config: {
    mode: "single-day" | "week" | "month";
    hasDaily: boolean;
    hasWeekly: boolean;
    hasMonthly: boolean;
  };

  /** Applied filters */
  filters: {
    dateRange: {
      start: string;
      end: string;
    };
    productType?: string;
  };

  /** Tenant info */
  tenant: {
    name: string;
  };

  /** Generation timestamp */
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
  dailyData: [
    {
      date: "2025-01-15",
      sectorId: "sector-japan",
      sectorName: "Japan",
      sectorGroup: "Asia",
      headcount: 12,
      amount: 45000,
    },
    {
      date: "2025-01-15",
      sectorId: "sector-europe",
      sectorName: "Europe",
      sectorGroup: "Europe",
      headcount: 8,
      amount: 32000,
    },
    {
      date: "2025-01-22",
      sectorId: "sector-japan",
      sectorName: "Japan",
      sectorGroup: "Asia",
      headcount: 15,
      amount: 52000,
    },
  ],
  monthlyData: [
    {
      monthLabel: "Jan 2025",
      monthStart: "2025-01-01",
      bySector: {
        "sector-japan": {
          headcount: 45,
          amount: 150000,
        },
        "sector-europe": {
          headcount: 28,
          amount: 95000,
        },
      },
    },
    {
      monthLabel: "Feb 2025",
      monthStart: "2025-02-01",
      bySector: {
        "sector-japan": {
          headcount: 52,
          amount: 180000,
        },
        "sector-europe": {
          headcount: 30,
          amount: 110000,
        },
      },
    },
  ],
  sectors: [
    {
      sectorId: "sector-japan",
      sectorName: "Japan",
      sectorGroup: "Asia",
    },
    {
      sectorId: "sector-europe",
      sectorName: "Europe",
      sectorGroup: "Europe",
    },
  ],
  totals: {
    headcount: 155,
    amount: 535000,
  },
  config: {
    mode: "month",
    hasDaily: true,
    hasWeekly: false,
    hasMonthly: true,
  },
  filters: {
    dateRange: {
      start: "2025-01-01",
      end: "2025-02-28",
    },
  },
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
    body { font-family: Arial, sans-serif; margin: 20px; font-size: 13px; }
    h1 { color: #333; font-size: 20px; margin-bottom: 10px; }
    h2 { color: #555; margin-top: 30px; font-size: 16px; }
    .meta { margin: 15px 0; padding: 10px; background: #f8f8f8; border-left: 3px solid #667eea; }
    .meta p { margin: 4px 0; color: #555; }
    .section { margin: 30px 0; page-break-inside: avoid; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
    th { background-color: #f4f4f4; font-weight: bold; text-align: center; }
    .totals { font-weight: bold; background-color: #fff3cd; }
    .grand-totals { font-weight: bold; background-color: #d4edda; }
    .number { text-align: right; font-family: monospace; }
    .sector-header { background-color: #e7f3ff; font-weight: bold; }
  </style>
</head>
<body>
  <h1>{{tenant.name}} - Sector Sales Report</h1>
  
  <div class="meta">
    <p><strong>Period:</strong> {{filters.dateRange.start}} to {{filters.dateRange.end}}</p>
    <p><strong>Report Mode:</strong> {{config.mode}}</p>
    {{#if filters.productType}}
    <p><strong>Product Type:</strong> {{filters.productType}}</p>
    {{/if}}
    <p><strong>Generated:</strong> {{generatedAt}}</p>
  </div>

  {{#if config.hasMonthly}}
  <div class="section">
    <h2>Monthly Breakdown</h2>
    <table>
      <thead>
        <tr>
          <th>Sector</th>
          {{#each monthlyData}}
          <th class="number" colspan="2">{{this.monthLabel}}</th>
          {{/each}}
          <th class="number" colspan="2">Total</th>
        </tr>
        <tr>
          <th></th>
          {{#each monthlyData}}
          <th class="number">HC</th>
          <th class="number">Amount</th>
          {{/each}}
          <th class="number">HC</th>
          <th class="number">Amount</th>
        </tr>
      </thead>
      <tbody>
        {{#each sectors}}
        <tr>
          <td>{{this.sectorName}}</td>
          {{#each ../monthlyData}}
          <td class="number">{{lookup this.bySector ../sectorId 'headcount'}}</td>
          <td class="number">{{lookup this.bySector ../sectorId 'amount'}}</td>
          {{/each}}
          <td class="number">-</td>
          <td class="number">-</td>
        </tr>
        {{/each}}
      </tbody>
      <tfoot>
        <tr class="grand-totals">
          <td>GRAND TOTAL</td>
          {{#each monthlyData}}
          <td class="number">-</td>
          <td class="number">-</td>
          {{/each}}
          <td class="number">{{totals.headcount}}</td>
          <td class="number">{{totals.amount}}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  {{/if}}

  {{#if config.hasWeekly}}
  <div class="section">
    <h2>Weekly Breakdown</h2>
    <table>
      <thead>
        <tr>
          <th>Sector</th>
          {{#each weeklyData}}
          <th class="number" colspan="2">{{this.weekLabel}}</th>
          {{/each}}
          <th class="number" colspan="2">Total</th>
        </tr>
        <tr>
          <th></th>
          {{#each weeklyData}}
          <th class="number">HC</th>
          <th class="number">Amount</th>
          {{/each}}
          <th class="number">HC</th>
          <th class="number">Amount</th>
        </tr>
      </thead>
      <tbody>
        {{#each sectors}}
        <tr>
          <td>{{this.sectorName}}</td>
          {{#each ../weeklyData}}
          <td class="number">{{lookup this.bySector ../sectorId 'headcount'}}</td>
          <td class="number">{{lookup this.bySector ../sectorId 'amount'}}</td>
          {{/each}}
          <td class="number">-</td>
          <td class="number">-</td>
        </tr>
        {{/each}}
      </tbody>
      <tfoot>
        <tr class="grand-totals">
          <td>GRAND TOTAL</td>
          {{#each weeklyData}}
          <td class="number">-</td>
          <td class="number">-</td>
          {{/each}}
          <td class="number">{{totals.headcount}}</td>
          <td class="number">{{totals.amount}}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  {{/if}}

  {{#if config.hasDaily}}
  <div class="section">
    <h2>Daily Breakdown</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Sector</th>
          <th class="number">Headcount</th>
          <th class="number">Amount</th>
        </tr>
      </thead>
      <tbody>
        {{#each dailyData}}
        <tr>
          <td>{{this.date}}</td>
          <td>{{this.sectorName}} ({{this.sectorGroup}})</td>
          <td class="number">{{this.headcount}}</td>
          <td class="number">{{this.amount}}</td>
        </tr>
        {{/each}}
      </tbody>
      <tfoot>
        <tr class="grand-totals">
          <td colspan="2">TOTAL</td>
          <td class="number">{{totals.headcount}}</td>
          <td class="number">{{totals.amount}}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  {{/if}}

  <div class="section">
    <h2>Summary</h2>
    <table style="width: 50%;">
      <tr>
        <th>Total Headcount</th>
        <td class="number">{{totals.headcount}}</td>
      </tr>
      <tr>
        <th>Total Amount</th>
        <td class="number">{{totals.amount}}</td>
      </tr>
      <tr class="totals">
        <th>Report Mode</th>
        <td>{{config.mode}}</td>
      </tr>
    </table>
  </div>
</body>
</html>`;
