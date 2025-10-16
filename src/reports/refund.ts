import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
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

export const RefundReportMetadata: ReportMetadata = {
  id: "refund-report",
  slug: "refund-report",
  name: "Refund Report",
  description: "Tracks all refund transactions within a selected date range.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: true,
};
