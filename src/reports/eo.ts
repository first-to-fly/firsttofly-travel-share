import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ExchangeOrderStatus } from "../entities/Operations/ExchangeOrder";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * EO Report Filters
 */
export const EOReportFiltersZ = z.object({
  /** Issue date range */
  issueDateStart: DateISOStringZ.optional(),
  issueDateEnd: DateISOStringZ.optional(),

  /** Status filter - array of statuses */
  statuses: z.array(z.nativeEnum(ExchangeOrderStatus)).optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type EOReportFilters = z.infer<typeof EOReportFiltersZ>;

export interface EoReportJsonMetadata {
  [key: string]: unknown;
}

export type EoReportJsonOutput = BaseReportJsonOutput<EoReportJsonMetadata>;

export const EOReportMetadata: ReportMetadata = {
  id: "eo-report",
  slug: "eo-report",
  name: "EO Report",
  description: "Lists all Exchange Orders (EO) with payment and status details.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF],
  supportsWebView: true,
};
