import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Min Deposit Report Filters
 */
export const MinDepositFiltersZ = z.object({
  /** Date range type */
  dateRangeType: DateRangeTypeZ,

  /** Start date (for custom range) */
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type MinDepositFilters = z.infer<typeof MinDepositFiltersZ>;

export type DepositStatus = "Met" | "Partial" | "Not Met";

/**
 * Min Deposit Report - Row
 */
export interface MinDepositRow {
  bookingId: string;
  bookingReference: string;
  bookingDate: Date;
  customerName: string;
  tourCode: string | null;
  departureDate: Date | null;
  totalAmount: number;
  receivedAmount: number;
  minDepositRequired: number;
  status: DepositStatus;
  deficitOrSurplus: number;
  outstandingAmount: number;
  depositSource: "overwrite" | "deposit-config" | "fallback";
  depositConfigName?: string;
  depositConfigType?: string;
}

/**
 * Min Deposit Report - Summary
 */
export interface MinDepositSummary {
  totalBookings: number;
  metCount: number;
  partialCount: number;
  notMetCount: number;
  totalAmount: number;
  totalRequired: number;
  totalReceived: number;
  totalOutstanding: number;
}

/**
 * Min Deposit Report Data
 */
export interface MinDepositReportData {
  rows: MinDepositRow[];
  summary: MinDepositSummary;
  dateRange: {
    start: Date;
    end: Date;
    label: string;
    description: string;
  };
  tenantName: string;
  currencySymbol: string;
}

export interface MinDepositReportJsonMetadata {
  dateRangeType: string;
  totalBookings: number;
  metCount: number;
  partialCount: number;
  notMetCount: number;
  totalAmount: number;
  totalRequired: number;
  totalReceived: number;
  totalOutstanding: number;
  tenantName: string;
}

export type MinDepositReportTemplateContext = MinDepositReportData;

export type MinDepositReportJsonOutput = BaseReportJsonOutput<MinDepositReportJsonMetadata>;

export const MinDepositReportMetadata: ReportMetadata = {
  id: "min-deposit-report",
  slug: "min-deposit-report",
  name: "Min Deposit Report",
  description: "Shows bookings with deposits received compared to required minimum deposit.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

export const MIN_DEPOSIT_REPORT_SAMPLE_CONTEXT: MinDepositReportTemplateContext = {
  rows: [],
  summary: {
    totalBookings: 0,
    metCount: 0,
    partialCount: 0,
    notMetCount: 0,
    totalAmount: 0,
    totalRequired: 0,
    totalReceived: 0,
    totalOutstanding: 0,
  },
  dateRange: {
    start: new Date("2025-01-01"),
    end: new Date("2025-01-31"),
    label: "January 2025",
    description: "Departure dates from 01 Jan 2025 to 31 Jan 2025",
  },
  tenantName: "Sample Company",
  currencySymbol: "$",
};

export const MIN_DEPOSIT_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Min Deposit Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .summary { margin: 20px 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .summary-item { padding: 15px; background: #f5f5f5; border-radius: 4px; }
    .summary-item strong { display: block; margin-bottom: 5px; color: #666; }
    .summary-item .value { font-size: 24px; font-weight: bold; color: #333; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Min Deposit Report</h1>
  <p><strong>Period:</strong> {{dateRange.description}}</p>
  <div class="summary">
    <div class="summary-item">
      <strong>Total Bookings</strong>
      <div class="value">{{summary.totalBookings}}</div>
    </div>
    <div class="summary-item">
      <strong>Met Requirements</strong>
      <div class="value">{{summary.metCount}}</div>
    </div>
    <div class="summary-item">
      <strong>Partial Deposit</strong>
      <div class="value">{{summary.partialCount}}</div>
    </div>
    <div class="summary-item">
      <strong>Not Met</strong>
      <div class="value">{{summary.notMetCount}}</div>
    </div>
    <div class="summary-item">
      <strong>Total Required</strong>
      <div class="value">{{currencySymbol}}{{summary.totalRequired}}</div>
    </div>
    <div class="summary-item">
      <strong>Total Outstanding</strong>
      <div class="value">{{currencySymbol}}{{summary.totalOutstanding}}</div>
    </div>
  </div>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
