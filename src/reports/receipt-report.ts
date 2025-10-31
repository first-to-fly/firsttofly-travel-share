import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { PaymentMethod } from "../entities/Sales/Transaction";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Receipt Report Filters
 */
export const ReceiptReportFiltersZ = z.object({
  /** Date range type */
  dateRangeType: DateRangeTypeZ,

  /** Start date (for custom range) */
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Payment methods filter (optional) */
  paymentMethods: z.array(z.nativeEnum(PaymentMethod)).optional(),

  /** Tour codes (optional) */
  tourCodes: z.string().optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type ReceiptReportFilters = z.infer<typeof ReceiptReportFiltersZ>;

/**
 * Receipt Report - Entry
 */
export interface ReceiptEntry {
  transactionId: string;
  receiptNumber: string;
  receiptDate: Date;
  customerName: string;
  bookingReference: string;
  tourCode: string;
  departureDate: Date | null;
  amount: number;
  serviceFee: number;
  netAmount: number;
  paymentDetails: string;
  internalRemarks: string;
  externalRemarks: string;
}

/**
 * Receipt Report - Totals
 */
export interface ReceiptTotals {
  count: number;
  amount: number;
  serviceFee: number;
  netAmount: number;
}

/**
 * Receipt Report - Group
 */
export interface ReceiptGroup {
  key: string;
  label: string;
  paymentMethod: string | null;
  paymentMethodLabel: string;
  channelName: string | null;
  bankLabel: string | null;
  totals: ReceiptTotals;
  receipts: ReceiptEntry[];
}

/**
 * Receipt Report Data
 */
export interface ReceiptReportData {
  groups: ReceiptGroup[];
  totals: ReceiptTotals;
  currencyCodes: string[];
  filters: ReceiptReportFilters;
  tenantName: string;
}

export interface ReceiptReportReportJsonMetadata {
  totalReceipts: number;
  totalAmount: number;
  totalServiceFee: number;
  totalNetAmount: number;
  groupCount: number;
  currencyCodes: string[];
}

export type ReceiptReportTemplateContext = ReceiptReportData;

export type ReceiptReportReportJsonOutput = BaseReportJsonOutput<ReceiptReportReportJsonMetadata>;

export const ReceiptReportMetadata: ReportMetadata = {
  id: "receipt-report",
  slug: "receipt-report",
  name: "Receipt Report",
  description: "Lists all receipts collected within the selected date range, by payment type.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

export const RECEIPT_REPORT_SAMPLE_CONTEXT: ReceiptReportTemplateContext = {
  groups: [],
  totals: {
    count: 0,
    amount: 0,
    serviceFee: 0,
    netAmount: 0,
  },
  currencyCodes: ["SGD"],
  filters: {
    dateRangeType: "current-month",
    startDate: undefined,
    endDate: undefined,
    paymentMethods: undefined,
    tourCodes: undefined,
    tenantOID: "ftf-tenant-sample",
  },
  tenantName: "Sample Company",
};

export const RECEIPT_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Receipt Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .summary { margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Receipt Report</h1>
  <div class="summary">
    <p><strong>Total Receipts:</strong> {{totals.count}}</p>
    <p><strong>Total Amount:</strong> {{totals.amount}}</p>
    <p><strong>Total Service Fee:</strong> {{totals.serviceFee}}</p>
    <p><strong>Net Amount:</strong> {{totals.netAmount}}</p>
  </div>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
