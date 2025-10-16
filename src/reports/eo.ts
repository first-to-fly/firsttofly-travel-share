import { z } from "zod";

import { ExchangeOrderStatus } from "../entities/Operations/ExchangeOrder";
import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * EO Report Filters
 */
export const EOReportFiltersZ = z.object({
  /** Issue date range */
  issueDateStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  issueDateEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Status filter - array of statuses */
  statuses: z.array(z.nativeEnum(ExchangeOrderStatus)).optional(),

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
