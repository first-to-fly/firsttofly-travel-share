import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Prepayment Report Filters
 */
export const PrepaymentReportFiltersZ = z.object({
  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type PrepaymentReportFilters = z.infer<typeof PrepaymentReportFiltersZ>;

/**
 * Prepayment Report - Allocation
 */
export interface PrepaymentAllocation {
  tourCode: string;
  departureDate: Date | null;
  allocatedAmount: number;
  eoNumber?: string;
}

/**
 * Prepayment Report - Row
 */
export interface PrepaymentRow {
  matchDocId: string;
  prepaymentNumber: string;
  prepaymentDate: Date;
  supplierName: string;
  currency: string;
  totalAmount: number;
  foreignAmount?: number;
  localAmount?: number;
  currencyRate?: number;
  allocations: PrepaymentAllocation[];
  totalAllocated: number;
  remainingBalance: number;
}

/**
 * Prepayment Report Data
 */
export interface PrepaymentReportData {
  rows: PrepaymentRow[];
  tenantName: string;
  currencySymbol: string;
}

export interface PrepaymentReportJsonMetadata {
  totalPrepayments: number;
  totalAmount: number;
  totalAllocated: number;
  totalRemaining: number;
  currencies: string[];
  tenantName: string;
}

export type PrepaymentReportTemplateContext = PrepaymentReportData;

export type PrepaymentReportJsonOutput = BaseReportJsonOutput<PrepaymentReportJsonMetadata>;

export const PrepaymentReportMetadata: ReportMetadata = {
  id: "prepayment-report",
  slug: "prepayment-report",
  name: "Prepayment Report",
  description: "Lists supplier prepayments and their allocation across tours and EO.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

export const PREPAYMENT_REPORT_SAMPLE_CONTEXT: PrepaymentReportTemplateContext = {
  rows: [],
  tenantName: "Sample Company",
  currencySymbol: "$",
};

export const PREPAYMENT_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Prepayment Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .meta { margin: 20px 0; color: #666; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Prepayment Report</h1>
  <div class="meta">
    <p><strong>Total Prepayments:</strong> {{rows.length}}</p>
  </div>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
