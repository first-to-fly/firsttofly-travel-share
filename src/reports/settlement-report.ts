import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Settlement Report Filters
 */
export const SettlementReportFiltersZ = z.object({
  /** Date range type */
  dateRangeType: DateRangeTypeZ,

  /** Start date (for custom range) */
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type SettlementReportFilters = z.infer<typeof SettlementReportFiltersZ>;

/**
 * Settlement Report - Row
 */
export interface SettlementRow {
  transactionId: string;
  receiptNumber: string;
  receiptDate: Date;
  amount: number;
  customerName: string;
  bookingReference: string;
  tourCode: string;
  departureDate: Date | null;
  terminalName: string | null;
  channelName: string | null;
  settlementStatus: string;
  settlementDate: Date | null;
}

/**
 * Settlement Report - Grouped Data
 */
export interface GroupedSettlementData {
  [terminalChannel: string]: SettlementRow[];
}

/**
 * Settlement Report Data
 */
export interface SettlementReportData {
  rows: SettlementRow[];
  groupedData: GroupedSettlementData;
  dateRange: {
    start: Date;
    end: Date;
  };
  tenantName: string;
  currencySymbol: string;
}

export interface SettlementReportReportJsonMetadata {
  dateRangeType: string;
  totalReceipts: number;
  totalAmount: number;
  terminalChannelCount: number;
  tenantName: string;
}

export type SettlementReportTemplateContext = SettlementReportData;

export type SettlementReportReportJsonOutput = BaseReportJsonOutput<SettlementReportReportJsonMetadata>;

export const SettlementReportMetadata: ReportMetadata = {
  id: "settlement-report",
  slug: "settlement-report",
  name: "Settlement Report (Terminal/Channel)",
  description: "Shows settlement of receipts by payment channel/terminal, with booking details.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: false,
};

export const SETTLEMENT_REPORT_SAMPLE_CONTEXT: SettlementReportTemplateContext = {
  rows: [],
  groupedData: {},
  dateRange: {
    start: new Date("2025-01-01"),
    end: new Date("2025-01-31"),
  },
  tenantName: "Sample Company",
  currencySymbol: "$",
};

export const SETTLEMENT_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Settlement Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .meta { margin: 20px 0; color: #666; }
    .terminal-group { margin: 30px 0; }
    h2 { color: #555; font-size: 18px; margin-top: 30px; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Settlement Report</h1>
  <div class="meta">
    <p><strong>Total Receipts:</strong> {{rows.length}}</p>
  </div>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
