import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
import type { ReportMetadata } from "./sector-sales";


/**
 * Daily Sales Report Filters
 */
export const DailySalesFiltersZ = z.object({
  /** Staff filter (optional) */
  staffOID: EntityOIDZ.optional(),

  /** Station code */
  stationCode: z.string().optional(),

  /** Date type - booking date or departure date */
  dateType: z.enum(["booking-date", "departure-date"]).default("booking-date"),

  /** Date range type */
  dateRangeType: DateRangeTypeZ,

  /** Start date (for custom range) */
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Product type filter */
  productType: z.enum(["git", "fit"]).optional(),

  /** Product code (optional) */
  productCode: z.string().optional(),

  /** Group by option - sector or salesman */
  groupBy: z.enum(["sector", "salesman"]).default("sector"),

  /** Sector group (optional) */
  sectorGroup: z.string().optional(),

  /** Sector filter (optional) */
  sectorOID: EntityOIDZ.optional(),

  /** Departments filter (optional) */
  departmentOID: EntityOIDZ.optional(),

  /** Payment balance status */
  paymentBalance: z
    .enum([
      "all",
      "fully-paid",
      "overpaid",
      "outstanding",
      "outstanding-unpaid",
      "outstanding-partially-paid",
      "with-payment",
    ])
    .default("all"),

  /** Exclude transferred bookings */
  excludeTransferredBooking: z.boolean().default(false),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type DailySalesFilters = z.infer<typeof DailySalesFiltersZ>;

/**
 * Daily Sales Report Row - RAW domain data for a single booking/sale
 */
export interface DailySalesReportRow {
  bookingDate: string;
  bookingCode: string;
  productType: "GIT" | "FIT";
  productCode: string;
  productName: string;
  departureDate?: string;
  paxCount: number;
  salesPerson?: string;
  sectorName?: string;
  departmentName?: string;
  totalAmount: number;
  depositPaid: number;
  balance: number;
  paymentStatus: string;
  currency: string;
}

/**
 * Daily Sales Report Data - RAW domain data structure
 */
export interface DailySalesReportData {
  rows: DailySalesReportRow[];
  summary: {
    totalBookings: number;
    totalPax: number;
    totalAmount: number;
    totalDeposit: number;
    totalBalance: number;
    byPaymentStatus: Record<string, {
      count: number;
      amount: number;
    }>;
    bySector?: Record<string, {
      count: number;
      amount: number;
    }>;
    bySalesPerson?: Record<string, {
      count: number;
      amount: number;
    }>;
  };
  filters: {
    dateRange: {
      start: string;
      end: string;
    };
    dateType: string;
    productType?: string;
    productCode?: string;
    groupBy: string;
    paymentBalance: string;
    staff?: string;
    sector?: string;
    department?: string;
  };
  tenant: {
    name: string;
  };
  generatedAt: string;
}

export interface DailySalesReportJsonMetadata {
  staffOID?: string;
  dateType: string;
  productType?: string;
  groupBy: string;
  totalBookings: number;
  totalAmount: number;
}

/**
 * Daily Sales Report Template Context - for Handlebars template rendering
 * This is the data structure passed to HTML/PDF templates
 */
export type DailySalesReportTemplateContext = DailySalesReportData;

/**
 * Daily Sales Report JSON Output - for JSON export format
 */
export interface DailySalesReportJsonOutput {
  report: {
    name: string;
    generatedAt: string;
    totalRows: number;
  };
  metadata: DailySalesReportJsonMetadata;
  data: DailySalesReportData;
}

export const DailySalesReportMetadata: ReportMetadata = {
  id: "daily-sales-report",
  slug: "daily-sales-report",
  name: "Daily Sales Report",
  description: "Generates daily sales breakdown by staff, sector, or salesman, with payment status filtering.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.CSV, ReportFormat.JSON, ReportFormat.PDF],
  supportsWebView: true,
};

/**
 * Sample context for Daily Sales Report template preview
 */
export const DAILY_SALES_REPORT_SAMPLE_CONTEXT: DailySalesReportTemplateContext = {
  rows: [
    {
      bookingDate: "2025-10-15",
      bookingCode: "BB251015001",
      productType: "GIT",
      productCode: "JP-DISC-2025",
      productName: "Discover Japan 10D",
      departureDate: "2025-12-01",
      paxCount: 4,
      salesPerson: "John Agent",
      sectorName: "Japan",
      departmentName: "Asia Pacific",
      totalAmount: 18000,
      depositPaid: 9000,
      balance: 9000,
      paymentStatus: "Partially Paid",
      currency: "SGD",
    },
    {
      bookingDate: "2025-10-16",
      bookingCode: "BB251016002",
      productType: "FIT",
      productCode: "EU-CUSTOM-001",
      productName: "European Highlights",
      departureDate: "2025-11-20",
      paxCount: 2,
      salesPerson: "Mary Agent",
      sectorName: "Europe",
      departmentName: "Europe",
      totalAmount: 12000,
      depositPaid: 12000,
      balance: 0,
      paymentStatus: "Fully Paid",
      currency: "SGD",
    },
  ],
  summary: {
    totalBookings: 2,
    totalPax: 6,
    totalAmount: 30000,
    totalDeposit: 21000,
    totalBalance: 9000,
    byPaymentStatus: {
      "Fully Paid": { count: 1, amount: 12000 },
      "Partially Paid": { count: 1, amount: 18000 },
    },
    bySector: {
      Japan: { count: 1, amount: 18000 },
      Europe: { count: 1, amount: 12000 },
    },
  },
  filters: {
    dateRange: {
      start: "2025-10-01",
      end: "2025-10-31",
    },
    dateType: "booking-date",
    groupBy: "sector",
    paymentBalance: "all",
  },
  tenant: {
    name: "Sample Travel Company",
  },
  generatedAt: "2025-10-31T12:00:00Z",
};

/**
 * Default HTML template for Daily Sales Report
 */
export const DAILY_SALES_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenant.name}} - Daily Sales Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1, h2 { color: #333; }
    .meta { margin: 20px 0; color: #666; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; font-weight: bold; }
    .summary { font-weight: bold; background-color: #f9f9f9; }
    .number { text-align: right; }
  </style>
</head>
<body>
  <h1>{{tenant.name}} - Daily Sales Report</h1>
  
  <div class="meta">
    <p><strong>Period:</strong> {{filters.dateRange.start}} to {{filters.dateRange.end}}</p>
    <p><strong>Date Type:</strong> {{filters.dateType}}</p>
    <p><strong>Group By:</strong> {{filters.groupBy}}</p>
    <p><strong>Generated:</strong> {{generatedAt}}</p>
  </div>

  <h2>Bookings</h2>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Booking Code</th>
        <th>Type</th>
        <th>Product</th>
        <th>Departure</th>
        <th class="number">PAX</th>
        <th>Sales Person</th>
        <th class="number">Amount</th>
        <th class="number">Deposit</th>
        <th class="number">Balance</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {{#each rows}}
      <tr>
        <td>{{this.bookingDate}}</td>
        <td>{{this.bookingCode}}</td>
        <td>{{this.productType}}</td>
        <td>{{this.productName}}</td>
        <td>{{this.departureDate}}</td>
        <td class="number">{{this.paxCount}}</td>
        <td>{{this.salesPerson}}</td>
        <td class="number">{{this.totalAmount}}</td>
        <td class="number">{{this.depositPaid}}</td>
        <td class="number">{{this.balance}}</td>
        <td>{{this.paymentStatus}}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>

  <h2>Summary</h2>
  <table>
    <tr class="summary">
      <th>Total Bookings</th>
      <td class="number">{{summary.totalBookings}}</td>
    </tr>
    <tr class="summary">
      <th>Total PAX</th>
      <td class="number">{{summary.totalPax}}</td>
    </tr>
    <tr class="summary">
      <th>Total Amount</th>
      <td class="number">{{summary.totalAmount}}</td>
    </tr>
    <tr class="summary">
      <th>Total Deposit</th>
      <td class="number">{{summary.totalDeposit}}</td>
    </tr>
    <tr class="summary">
      <th>Total Balance</th>
      <td class="number">{{summary.totalBalance}}</td>
    </tr>
  </table>
</body>
</html>`;
