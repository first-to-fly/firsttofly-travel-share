import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateOnlyStringZ } from "../types/date";
import type { ReportMetadata } from "./sector-sales";


/**
 * Redemption Report Filters
 */
export const RedemptionReportFiltersZ = z.object({
  /** Search query (customer name, booking no., or receipt no.) */
  searchQuery: z.string().optional(),

  /** Period date range (optional) */
  periodStart: DateOnlyStringZ.optional(),
  periodEnd: DateOnlyStringZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
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
