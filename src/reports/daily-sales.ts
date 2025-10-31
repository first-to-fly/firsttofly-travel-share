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
 * Daily Sales Report - Booking Data Row (internal)
 */
export interface DailySalesBookingRow {
  bookingId: string;
  bookingReference: string;
  bookingDate: Date;
  bookingStatus: string;
  paymentStatus: string;
  platform: string;
  totalAmount: number;
  receivedAmount: number;
  balance: number;
  saleStaffId: string;
  tcpBookingId: string | null;
  isTransferred: boolean;
  isCancelled: boolean;
  tourCode: string;
  productType: string;
  departureDate: Date | null;
  sectorId: string;
  sectorName: string;
  sectorGroupName: string;
  departmentName: string;
  bookingStationCode: string;
  paxCount: number;
  paxNames: string;
  paxEmail: string;
  currencyCode: string;
  devFlag: "Y" | "N";
}

/**
 * Daily Sales Report - Subtotal structure
 */
export interface DailySalesSubtotal {
  bookingCount: number;
  totalPax: number;
  totalAmount: number;
  totalPayment: number;
  totalBalance: number;
  currencyCode: string;
}

/**
 * Daily Sales Report - Summary
 */
export interface DailySalesSummary extends DailySalesSubtotal {
  totalBookings: number;
}

/**
 * Daily Sales Report - Sector Group
 */
export interface DailySalesSectorGroup {
  label: string;
  value: string;
  bookings: DailySalesBookingRow[];
  subtotal: DailySalesSubtotal;
}

/**
 * Daily Sales Report - Area Group
 */
export interface DailySalesAreaGroup {
  label: string;
  value: string;
  bookings: DailySalesBookingRow[];
  sectors: DailySalesSectorGroup[];
  subtotal: DailySalesSubtotal;
}

/**
 * Daily Sales Report - Hierarchical Group
 */
export interface DailySalesHierarchicalGroup {
  label: string;
  value: string;
  areas: DailySalesAreaGroup[];
  subtotal: DailySalesSubtotal;
}

/**
 * Daily Sales Report Data - RAW domain data structure
 */
export interface DailySalesReportData {
  bookings: DailySalesBookingRow[];
  grouped: DailySalesHierarchicalGroup[];
  summary: DailySalesSummary;
  groupingMode: "sector" | "salesman";
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
  supportedFormats: [ReportFormat.XLSX, ReportFormat.CSV, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

/**
 * Sample context for Daily Sales Report template preview
 */
export const DAILY_SALES_REPORT_SAMPLE_CONTEXT: DailySalesReportTemplateContext = {
  bookings: [],
  grouped: [],
  summary: {
    totalBookings: 0,
    bookingCount: 0,
    totalPax: 0,
    totalAmount: 0,
    totalPayment: 0,
    totalBalance: 0,
    currencyCode: "SGD",
  },
  groupingMode: "sector",
};

/**
 * Default HTML template for Daily Sales Report
 */
export const DAILY_SALES_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Daily Sales Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .meta { margin: 20px 0; color: #666; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; font-weight: bold; }
    .number { text-align: right; }
  </style>
</head>
<body>
  <h1>Daily Sales Report</h1>
  <div class="meta">
    <p><strong>Total Bookings:</strong> {{summary.totalBookings}}</p>
    <p><strong>Total PAX:</strong> {{summary.totalPax}}</p>
    <p><strong>Total Amount:</strong> {{summary.totalAmount}} {{summary.currencyCode}}</p>
  </div>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
