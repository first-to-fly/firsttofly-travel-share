import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Redemption Report Filters
 */
export const RedemptionReportFiltersZ = z.object({
  /** Search query (customer name, booking no., or receipt no.) */
  searchQuery: z.string().optional(),

  /** Period date range (optional) */
  periodStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  periodEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type RedemptionReportFilters = z.infer<typeof RedemptionReportFiltersZ>;

export const RedemptionReportMetadata: ReportMetadata = {
  id: "redemption-report",
  slug: "redemption-report",
  name: "Redemption Report",
  description: "Tracks gift redemptions linked to receipts/bookings, including value spent.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: true,
};
