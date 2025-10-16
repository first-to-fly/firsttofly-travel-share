import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * EO Report Filters
 */
export const EOReportFiltersZ = z.object({
  /** Issue date range */
  issueDateStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  issueDateEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Status filter */
  status: z.enum(["all", "draft", "wfa", "approved", "processing", "completed", "rejected", "voided"]).default("all"),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type EOReportFilters = z.infer<typeof EOReportFiltersZ>;

export const EOReportMetadata: ReportMetadata = {
  id: "eo-report",
  slug: "eo-report",
  name: "EO Report",
  description: "Lists all Exchange Orders (EO) with payment and status details.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: true,
};
