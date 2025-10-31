import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Deposit Reconciliation Report Filters
 */
export const DepositReconciliationFiltersZ = z.object({
  /** Period type */
  period: z.enum(["current-month", "last-month", "custom-month"]),

  /** Custom month (YYYY-MM format) */
  customMonth: z.string().regex(/^\d{4}-\d{2}$/).optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type DepositReconciliationFilters = z.infer<typeof DepositReconciliationFiltersZ>;

/**
 * Deposit Reconciliation Report - Summary
 */
export interface DepositReconciliationSummary {
  receipt: number;
  journal: number;
  refund: number;
  cancellationFee: number;
  depositAmount: number;
  currencyCode: string;
  currencySymbol: string;
}

/**
 * Deposit Reconciliation Report Data
 */
export interface DepositReconciliationReportData {
  summary: DepositReconciliationSummary;
  dateRange: {
    start: Date;
    end: Date;
  };
  tenantName: string;
}

export interface DepositReconciliationReportJsonMetadata {
  period: string;
  customMonth?: string;
  depositAmount: number;
  receipt: number;
  journal: number;
  refund: number;
  cancellationFee: number;
  currencyCode: string;
  tenantName: string;
}

export type DepositReconciliationReportTemplateContext = DepositReconciliationReportData;

export type DepositReconciliationReportJsonOutput = BaseReportJsonOutput<DepositReconciliationReportJsonMetadata>;

export const DepositReconciliationReportMetadata: ReportMetadata = {
  id: "deposit-reconciliation-report",
  slug: "deposit-reconciliation-report",
  name: "Deposit Reconciliation Report",
  description: "Summarizes deposits collected and reconciles against cash sales, refunds, and cancellation fees.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

export const DEPOSIT_RECONCILIATION_REPORT_SAMPLE_CONTEXT: DepositReconciliationReportTemplateContext = {
  summary: {
    receipt: 0,
    journal: 0,
    refund: 0,
    cancellationFee: 0,
    depositAmount: 0,
    currencyCode: "SGD",
    currencySymbol: "$",
  },
  dateRange: {
    start: new Date("2025-01-01"),
    end: new Date("2025-01-31"),
  },
  tenantName: "Sample Company",
};

export const DEPOSIT_RECONCILIATION_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Deposit Reconciliation Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .summary { margin: 20px 0; }
    .summary-row { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; }
    .summary-row.total { font-weight: bold; background: #f5f5f5; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Deposit Reconciliation</h1>
  <div class="summary">
    <div class="summary-row">
      <span>Receipt:</span>
      <span>{{summary.currencySymbol}}{{summary.receipt}}</span>
    </div>
    <div class="summary-row">
      <span>Journal:</span>
      <span>{{summary.currencySymbol}}{{summary.journal}}</span>
    </div>
    <div class="summary-row">
      <span>Refund:</span>
      <span>-{{summary.currencySymbol}}{{summary.refund}}</span>
    </div>
    <div class="summary-row">
      <span>Cancellation Fee:</span>
      <span>-{{summary.currencySymbol}}{{summary.cancellationFee}}</span>
    </div>
    <div class="summary-row total">
      <span>Deposit Amount:</span>
      <span>{{summary.currencySymbol}}{{summary.depositAmount}}</span>
    </div>
  </div>
</body>
</html>`;
