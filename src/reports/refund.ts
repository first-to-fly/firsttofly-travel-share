import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Refund Report Filters
 */
export const RefundReportFiltersZ = z.object({
  /** Creation date range */
  creationDateStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  creationDateEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Report date range */
  reportDateStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  reportDateEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Refund payment method */
  refundPaymentMethod: z.enum(["all", "original", "paynow"]).default("all"),

  /** Departed tour filter */
  departedTour: z.boolean().default(false),

  /** Confirmed payment filter */
  confirmedPayment: z.boolean().default(false),

  /** Post status to Xero */
  postStatus: z.enum(["all", "unposted", "posted"]).default("all"),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type RefundReportFilters = z.infer<typeof RefundReportFiltersZ>;

export const RefundReportMetadata: ReportMetadata = {
  id: "refund-report",
  slug: "refund-report",
  name: "Refund Report",
  description: "Tracks all refund transactions within a selected date range.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: true,
};
