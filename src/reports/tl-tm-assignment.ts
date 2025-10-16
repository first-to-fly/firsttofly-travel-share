import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * TL/TM Assignment Report Filters
 */
export const TLTMAssignmentFiltersZ = z.object({
  /** Departure date range */
  departureDateStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  departureDateEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  /** Product type filter */
  productType: z.enum(["all", "git", "fit"]).default("all"),

  /** Departments filter - "all" or specific department OID */
  departments: z.union([z.literal("all"), z.string().min(1)]).default("all"),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type TLTMAssignmentFilters = z.infer<typeof TLTMAssignmentFiltersZ>;

export const TLTMAssignmentReportMetadata: ReportMetadata = {
  id: "tl-tm-assignment-report",
  slug: "tl-tm-assignment-report",
  name: "TL/TM Assignment Report",
  description: "Lists all tours with departure dates, showing assigned Tour Leaders / Managers.",
  supportedFormats: [ReportFormat.CSV],
  supportsWebView: false,
};
