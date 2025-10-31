import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Deposit Reconciliation Report Filters
 */
export const DepositReconciliationFiltersZ = z.object({
  /** Period type */
  period: z.enum(["current-month", "last-month", "custom-month"]),

  /** Custom month (YYYY-MM format) */
  customMonth: z.string().regex(/^\d{4}-\d{2}$/).optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type DepositReconciliationFilters = z.infer<typeof DepositReconciliationFiltersZ>;

export interface DepositReconciliationReportJsonMetadata {
  [key: string]: unknown;
}

export type DepositReconciliationReportJsonOutput = BaseReportJsonOutput<DepositReconciliationReportJsonMetadata>;

export const DepositReconciliationReportMetadata: ReportMetadata = {
  id: "deposit-reconciliation-report",
  slug: "deposit-reconciliation-report",
  name: "Deposit Reconciliation Report",
  description: "Summarizes deposits collected and reconciles against cash sales, refunds, and cancellation fees.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF],
  supportsWebView: true,
};
