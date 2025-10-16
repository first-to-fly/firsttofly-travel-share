import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Prepayment Report Filters
 */
export const PrepaymentReportFiltersZ = z.object({
  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type PrepaymentReportFilters = z.infer<typeof PrepaymentReportFiltersZ>;

export const PrepaymentReportMetadata: ReportMetadata = {
  id: "prepayment-report",
  slug: "prepayment-report",
  name: "Prepayment Report",
  description: "Lists supplier prepayments and their allocation across tours and EO.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: true,
};
