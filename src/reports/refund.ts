import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Refund Report Filters
 */
export const RefundReportFiltersZ = z.object({
  /** Creation date range */
  creationDateStart: DateISOStringZ.optional(),
  creationDateEnd: DateISOStringZ.optional(),

  /** Report date range */
  reportDateStart: DateISOStringZ.optional(),
  reportDateEnd: DateISOStringZ.optional(),

  /** Refund payment method */
  refundPaymentMethod: z.enum(["all", "original", "paynow"]).default("all"),

  /** Departed tour filter */
  departedTour: z.boolean().default(false),

  /** Confirmed payment filter */
  confirmedPayment: z.boolean().default(false),

  /** Post status to Xero */
  postStatus: z.enum(["all", "unposted", "posted"]).default("all"),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type RefundReportFilters = z.infer<typeof RefundReportFiltersZ>;

export type RefundMethodCategory = "original" | "paynow";

/**
 * Refund Report - Entry
 */
export interface RefundEntry {
  transactionId: string;
  refNo: string;
  refundTo: string;
  bookingRef: string;
  tourCode: string;
  departureDate: Date | null;
  amount: number;
  currencyCode: string | null;
  creationDate: Date;
  confirmDate: Date | null;
  preparedBy: string;
  refundMethod: RefundMethodCategory;
  refundMethodLabel: string;
  paymentChannel: string;
  paymentMethodLabel: string;
  status: string;
  posted: boolean;
  internalRemarks?: string;
  externalRemarks?: string;
  isConfirmed: boolean;
  isDeparted: boolean;
  approvalReference?: string;
}

/**
 * Refund Report - Method Summary
 */
export interface RefundMethodSummary {
  method: RefundMethodCategory;
  label: string;
  count: number;
  amount: number;
  confirmedCount: number;
  postedCount: number;
}

/**
 * Refund Report Data
 */
export interface RefundReportData {
  entries: RefundEntry[];
  summary: RefundMethodSummary[];
  totals: {
    count: number;
    amount: number;
    confirmedCount: number;
    postedCount: number;
  };
  currencyCodes: string[];
  filters: RefundReportFilters;
  tenantName: string;
}

export interface RefundReportJsonMetadata {
  totalRefunds: number;
  totalAmount: number;
  confirmedCount: number;
  postedCount: number;
  refundMethods: Array<{
    method: string;
    count: number;
    amount: number;
  }>;
  currencyCodes: string[];
}

export type RefundReportTemplateContext = RefundReportData;

export type RefundReportJsonOutput = BaseReportJsonOutput<RefundReportJsonMetadata>;

export const RefundReportMetadata: ReportMetadata = {
  id: "refund-report",
  slug: "refund-report",
  name: "Refund Report",
  description: "Tracks all refund transactions within a selected date range.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

export const REFUND_REPORT_SAMPLE_CONTEXT: RefundReportTemplateContext = {
  entries: [],
  summary: [],
  totals: {
    count: 0,
    amount: 0,
    confirmedCount: 0,
    postedCount: 0,
  },
  currencyCodes: ["SGD"],
  filters: {
    creationDateStart: undefined,
    creationDateEnd: undefined,
    reportDateStart: undefined,
    reportDateEnd: undefined,
    refundPaymentMethod: "all",
    departedTour: false,
    confirmedPayment: false,
    postStatus: "all",
    tenantOID: "ftf-tenant-sample",
  },
  tenantName: "Sample Company",
};

export const REFUND_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Refund Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .summary { margin: 20px 0; }
    .summary-item { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Refund Report</h1>
  <div class="summary">
    <div class="summary-item">
      <strong>Total Refunds:</strong> {{totals.count}} |
      <strong>Total Amount:</strong> {{totals.amount}} |
      <strong>Confirmed:</strong> {{totals.confirmedCount}} |
      <strong>Posted:</strong> {{totals.postedCount}}
    </div>
  </div>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
