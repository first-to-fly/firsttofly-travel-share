import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ExchangeOrderStatus } from "../entities/Operations/ExchangeOrder";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * EO Report Filters
 */
export const EOReportFiltersZ = z.object({
  /** Issue date range */
  issueDateStart: DateISOStringZ.optional(),
  issueDateEnd: DateISOStringZ.optional(),

  /** Status filter - array of statuses */
  statuses: z.array(z.nativeEnum(ExchangeOrderStatus)).optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type EOReportFilters = z.infer<typeof EOReportFiltersZ>;

/**
 * EO Report - Item
 */
export interface EOItem {
  exchangeOrderId: string;
  eoNo: string;
  issueDate: Date | null;
  dueDate: Date | null;
  supplierName: string;
  supplierCode: string;
  supplierShortName: string;
  supplierCategory: string | null;
  tourCode: string | null;
  departureDate: Date | null;
  currency: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  ownerName: string;
  status: string;
  isVoided: boolean;
  parentExchangeOrderNo: string | null;
  remarks: string | null;
  paymentCount: number;
  lastPaymentDate: Date | null;
  billCode: string | null;
  billStatus: string | null;
  billPaymentStatus: string | null;
  billIssueDate: Date | null;
  billCurrency: string | null;
  billCurrencyRate: number | null;
  billTotalAmount: number;
  billUsedAmount: number;
  billBalance: number;
}

/**
 * EO Report - Currency Summary
 */
export interface EOCurrencySummary {
  currency: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
}

/**
 * EO Report Data
 */
export interface EOReportData {
  exchangeOrders: EOItem[];
  currencySummary: EOCurrencySummary[];
  totalPayments: number;
  totalItems: number;
  filters: EOReportFilters;
  tenantName: string;
}

export interface EoReportJsonMetadata {
  totalExchangeOrders: number;
  totalPayments: number;
  totalItems: number;
  currencySummary: EOCurrencySummary[];
}

export type EOReportTemplateContext = EOReportData;

export type EoReportJsonOutput = BaseReportJsonOutput<EoReportJsonMetadata>;

export const EOReportMetadata: ReportMetadata = {
  id: "eo-report",
  slug: "eo-report",
  name: "EO Report",
  description: "Lists all Exchange Orders (EO) with payment and status details.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

export const EO_REPORT_SAMPLE_CONTEXT: EOReportTemplateContext = {
  exchangeOrders: [],
  currencySummary: [],
  totalPayments: 0,
  totalItems: 0,
  filters: {
    issueDateStart: undefined,
    issueDateEnd: undefined,
    statuses: undefined,
    tenantOID: "ftf-tenant-sample",
  },
  tenantName: "Sample Company",
};

export const EO_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - EO Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .summary { margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Exchange Order Report</h1>
  <div class="summary">
    <p><strong>Total Exchange Orders:</strong> {{exchangeOrders.length}}</p>
    <p><strong>Total Payments:</strong> {{totalPayments}}</p>
    <p><strong>Total Items:</strong> {{totalItems}}</p>
  </div>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
