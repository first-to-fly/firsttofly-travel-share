import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateOnlyStringZ } from "../types/date";
import type { ReportMetadata } from "./sector-sales";


/**
 * TL/TM Assignment Report Filters
 */
export const TLTMAssignmentFiltersZ = z.object({
  /** Departure date range */
  departureDateStart: DateOnlyStringZ,
  departureDateEnd: DateOnlyStringZ,

  /** Product type filter */
  productType: z.enum(["git", "fit"]).optional(),

  /** Departments filter (optional) */
  departmentOID: EntityOIDZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
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
