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

export interface ReceiptReportReportJsonMetadata {
  [key: string]: unknown;
}

export type ReceiptReportReportJsonOutput = BaseReportJsonOutput<ReceiptReportReportJsonMetadata>;

export const ReceiptReportMetadata: ReportMetadata = {
  id: "receipt-report",
  slug: "receipt-report",
  name: "Receipt Report",
  description: "Lists all receipts collected within the selected date range, by payment type.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF],
  supportsWebView: true,
};
