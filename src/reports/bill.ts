import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { BillPaymentStatus, BillStatus } from "../entities/Finance/Bill";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Bill Report Filters
 */
export const BillReportFiltersZ = z.object({
  /** Issue date range */
  issueDateStart: DateISOStringZ.optional(),
  issueDateEnd: DateISOStringZ.optional(),

  /** Supplier filter - specific supplier OID */
  supplierOID: EntityOIDZ.optional(),

  /** Bill statuses - array of statuses */
  billStatuses: z.array(z.nativeEnum(BillStatus)).optional(),

  /** Payment statuses - array of statuses */
  paymentStatuses: z.array(z.nativeEnum(BillPaymentStatus)).optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type BillReportFilters = z.infer<typeof BillReportFiltersZ>;

export interface BillRow {
  billId: string;
  billNumber: string;
  billDate: Date;
  supplierId: string;
  supplierName: string;
  referenceNumber: string | null;
  currency: string;
  amount: number;
  currencyRate: number | null;
  status: string;
  paymentStatus: string;
  preparedBy: string;
  isVoided: boolean;
}

export interface BillCurrencySummary {
  currency: string;
  totalAmount: number;
  billCount: number;
}

export interface BillReportData {
  bills: BillRow[];
  summary: BillCurrencySummary[];
  tenantName: string;
}

export interface BillReportJsonMetadata {
  totalBills: number;
  currencySummary: BillCurrencySummary[];
  tenantName: string;
}

export type BillReportTemplateContext = BillReportData;

export type BillReportJsonOutput = BaseReportJsonOutput<BillReportJsonMetadata>;

export const BillReportMetadata: ReportMetadata = {
  id: "bill-report",
  slug: "bill-report",
  name: "Bill Report",
  description: "Lists supplier bills issued, including payment and status information.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

export const BILL_REPORT_SAMPLE_CONTEXT: BillReportTemplateContext = {
  bills: [],
  summary: [],
  tenantName: "Sample Company",
};

export const BILL_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Bill Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Bill Report</h1>
  <p><strong>Total Bills:</strong> {{bills.length}}</p>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
