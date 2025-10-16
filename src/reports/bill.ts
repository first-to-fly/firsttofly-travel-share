import { z } from "zod";

import { BillPaymentStatus, BillStatus } from "../entities/Finance/Bill";
import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Bill Report Filters
 */
export const BillReportFiltersZ = z.object({
  /** Issue date range */
  issueDateStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  issueDateEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Supplier filter - specific supplier OID */
  supplierOID: z.string().optional(),

  /** Bill statuses - array of statuses */
  billStatuses: z.array(z.nativeEnum(BillStatus)).optional(),

  /** Payment statuses - array of statuses */
  paymentStatuses: z.array(z.nativeEnum(BillPaymentStatus)).optional(),

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
