import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * TL/TM Assignment Report Filters
 */
export const TLTMAssignmentFiltersZ = z.object({
  /** Departure date range */
  departureDateStart: DateISOStringZ,
  departureDateEnd: DateISOStringZ,

  /** Product type filter */
  productType: z.enum(["git", "fit"]).optional(),

  /** Departments filter (optional) */
  departmentOID: EntityOIDZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type TLTMAssignmentFilters = z.infer<typeof TLTMAssignmentFiltersZ>;

export interface TLTMAssignmentRow {
  departureId: string;
  departureCode: string;
  departureDate: Date;
  tourCode: string;
  productType: string;
  departmentName: string;
  tourLeaderName: string | null;
  tourManagerName: string | null;
  paxCount: number;
  status: string;
}

export interface TLTMAssignmentReportData {
  rows: TLTMAssignmentRow[];
  tenantName: string;
}

export interface TlTmAssignmentReportJsonMetadata {
  totalDepartures: number;
  totalPax: number;
  tenantName: string;
}

export type TLTMAssignmentReportTemplateContext = TLTMAssignmentReportData;

export type TlTmAssignmentReportJsonOutput = BaseReportJsonOutput<TlTmAssignmentReportJsonMetadata>;

export const TLTMAssignmentReportMetadata: ReportMetadata = {
  id: "tl-tm-assignment-report",
  slug: "tl-tm-assignment-report",
  name: "TL/TM Assignment Report",
  description: "Lists all tours with departure dates, showing assigned Tour Leaders / Managers.",
  supportedFormats: [ReportFormat.CSV, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: false,
};

export const TL_TM_ASSIGNMENT_REPORT_SAMPLE_CONTEXT: TLTMAssignmentReportTemplateContext = {
  rows: [],
  tenantName: "Sample Company",
};

export const TL_TM_ASSIGNMENT_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - TL/TM Assignment Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - TL/TM Assignment Report</h1>
  <p><strong>Total Departures:</strong> {{rows.length}}</p>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
