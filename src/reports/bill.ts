import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Bill Report Filters
 */
export const BillReportFiltersZ = z.object({
  /** Issue date range */
  issueDateStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  issueDateEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Supplier filter - "all" or specific supplier OID */
  supplier: z.union([z.literal("all"), z.string().min(1)]).default("all"),

  /** Bill status */
  billStatus: z.enum(["all", "draft", "approved", "voided"]).default("all"),

  /** Payment status */
  paymentStatus: z.enum(["all", "unpaid", "partially-paid", "paid", "overdue"]).default("all"),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type BillReportFilters = z.infer<typeof BillReportFiltersZ>;

export const BillReportMetadata: ReportMetadata = {
  id: "bill-report",
  slug: "bill-report",
  name: "Bill Report",
  description: "Lists supplier bills issued, including payment and status information.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: true,
};
