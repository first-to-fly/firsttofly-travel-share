import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Receipt Bank (Card) Report Filters
 */
export const ReceiptBankCardFiltersZ = z.object({
  /** Date range type */
  dateRangeType: DateRangeTypeZ,

  /** Start date (for custom range) */
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type ReceiptBankCardFilters = z.infer<typeof ReceiptBankCardFiltersZ>;

/**
 * Receipt Bank Card - Summary Row
 */
export interface ReceiptBankCardSummaryRow {
  paymentWayId: string;
  channel: string;
  bank: string;
  txnRatePercent: number | null;
  txnRateAmount: number | null;
  totalAmount: number;
  totalServiceFee: number;
}

/**
 * Receipt Bank Card - Totals
 */
export interface ReceiptBankCardTotals {
  totalAmount: number;
  totalServiceFee: number;
}

/**
 * Receipt Bank Card Report Data
 */
export interface ReceiptBankCardReportData {
  rows: ReceiptBankCardSummaryRow[];
  totals: ReceiptBankCardTotals;
  dateRange: {
    start: Date;
    end: Date;
  };
  tenantName: string;
  currencySymbol: string;
}

export interface ReceiptBankCardReportJsonMetadata {
  dateRangeType: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  totalTxnAmount: number;
  paymentChannelCount: number;
  tenantName: string;
}

export type ReceiptBankCardReportTemplateContext = ReceiptBankCardReportData;

export type ReceiptBankCardReportJsonOutput = BaseReportJsonOutput<ReceiptBankCardReportJsonMetadata>;

export const ReceiptBankCardReportMetadata: ReportMetadata = {
  id: "receipt-bank-card-report",
  slug: "receipt-bank-card-report",
  name: "Receipt (Bank/Card) Report",
  description: "Tracks receipts processed through bank cards and other payment channels with transaction details.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: false,
};

export const RECEIPT_BANK_CARD_REPORT_SAMPLE_CONTEXT: ReceiptBankCardReportTemplateContext = {
  rows: [],
  totals: {
    totalAmount: 0,
    totalServiceFee: 0,
  },
  dateRange: {
    start: new Date("2025-01-01"),
    end: new Date("2025-01-31"),
  },
  tenantName: "Sample Company",
  currencySymbol: "$",
};

export const RECEIPT_BANK_CARD_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Receipt Bank/Card Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .meta { margin: 20px 0; color: #666; }
    .number { text-align: right; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Receipt Bank/Card Report</h1>
  <div class="meta">
    <p><strong>Total Amount:</strong> {{currencySymbol}}{{totals.totalAmount}}</p>
    <p><strong>Total Service Fee:</strong> {{currencySymbol}}{{totals.totalServiceFee}}</p>
  </div>
</body>
</html>`;
