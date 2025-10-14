import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const ReportOutputFormatZ = z.enum(["web", "xlsx", "csv"]);
export type ReportOutputFormat = z.infer<typeof ReportOutputFormatZ>;

export const ReportFilterTypeZ = z.enum([
  "date",
  "date-range",
  "select",
  "multi-select",
  "text",
  "boolean",
]);
export type ReportFilterType = z.infer<typeof ReportFilterTypeZ>;

export const ReportFilterOptionZ = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
});
export type ReportFilterOption = z.infer<typeof ReportFilterOptionZ>;

export const ReportFilterConfigZ = z.object({
  key: z.string(),
  label: z.string(),
  type: ReportFilterTypeZ,
  description: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(ReportFilterOptionZ).optional(),
  defaultValue: z.unknown().optional(),
});
export type ReportFilterConfig = z.infer<typeof ReportFilterConfigZ>;

export const ReportColumnTypeZ = z.enum([
  "string",
  "number",
  "currency",
  "date",
  "datetime",
  "boolean",
]);
export type ReportColumnType = z.infer<typeof ReportColumnTypeZ>;

export const ReportColumnConfigZ = z.object({
  key: z.string(),
  label: z.string(),
  description: z.string().optional(),
  type: ReportColumnTypeZ.optional(),
  sortable: z.boolean().optional(),
});
export type ReportColumnConfig = z.infer<typeof ReportColumnConfigZ>;

export const ReportTeamZ = z.enum([
  "sales",
  "finance",
  "operations",
  "management",
]);
export type ReportTeam = z.infer<typeof ReportTeamZ>;

export const ReportPriorityZ = z.enum(["P0", "P1", "P2", "P3"]);
export type ReportPriority = z.infer<typeof ReportPriorityZ>;

export const ReportDefinitionZ = z.object({
  slug: z.string(),
  name: z.string(),
  team: ReportTeamZ,
  priority: ReportPriorityZ,
  requiresPA: z.boolean().default(false),
  description: z.string(),
  purpose: z.string(),
  dataSources: z.array(z.string()),
  filters: z.array(ReportFilterConfigZ),
  columns: z.array(ReportColumnConfigZ),
  outputFormats: z.array(ReportOutputFormatZ),
  notes: z.string().optional(),
});
export type ReportDefinition = z.infer<typeof ReportDefinitionZ>;

export const ReportCatalogueResponseZ = z.object({
  reports: z.array(ReportDefinitionZ),
});
export type ReportCatalogueResponse = z.infer<typeof ReportCatalogueResponseZ>;

export const SectorSalesReportRequestZ = z.object({
  tenantOID: z.string(),
  productType: z.enum(["ALL", "GIT", "FIT"]).default("ALL"),
  dateRange: z.object({
    preset: z.enum(["TODAY", "YESTERDAY", "CURRENT_WEEK", "LAST_WEEK", "CURRENT_MONTH", "LAST_MONTH", "CUSTOM"]).default("CURRENT_MONTH"),
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  sectors: z.array(z.string()).optional(),
  sectorGroups: z.array(z.string()).optional(),
  departments: z.array(z.string()).optional(),
});
export type SectorSalesReportRequest = z.infer<typeof SectorSalesReportRequestZ>;

export const DailySalesReportRequestZ = z.object({
  tenantOID: z.string(),
  staffIds: z.array(z.string()).optional(),
  stationCodeIds: z.array(z.string()).optional(),
  departments: z.array(z.string()).optional(),
  sectorIds: z.array(z.string()).optional(),
  sectorGroupIds: z.array(z.string()).optional(),
  productType: z.enum(["ALL", "GIT", "FIT"]).default("ALL"),
  productCodes: z.array(z.string()).optional(),
  dateFilter: z.object({
    type: z.enum(["BOOKING", "DEPARTURE"]).default("BOOKING"),
    preset: z.enum(["TODAY", "YESTERDAY", "THIS_WEEK_TO_DATE", "LAST_WEEK", "THIS_MONTH_TO_DATE", "LAST_MONTH", "CUSTOM"]).default("THIS_MONTH_TO_DATE"),
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  groupBy: z.enum(["sector", "salesman"]).default("sector"),
  paymentBalance: z.enum([
    "ALL",
    "FULLY_PAID",
    "OVERPAID",
    "OUTSTANDING",
    "OUTSTANDING_UNPAID",
    "OUTSTANDING_PARTIALLY_PAID",
    "WITH_PAYMENT",
  ]).default("ALL"),
  excludeTransferred: z.boolean().default(false),
  pagination: z.object({
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(500).default(100),
  }).optional(),
});
export type DailySalesReportRequest = z.infer<typeof DailySalesReportRequestZ>;

export const ReportQueryPayloadZ = z.object({
  tenantOID: z.string(),
  filters: z.record(z.string(), z.unknown()).optional().default({}),
  pagination: z.object({
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(500).default(100),
  }).optional(),
});
export type ReportQueryPayload = z.infer<typeof ReportQueryPayloadZ>;

export const ReportQueryResponseZ = z.object({
  rows: z.array(z.record(z.string(), z.unknown())),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    totalRows: z.number().int().min(0),
  }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
export type ReportQueryResponse = z.infer<typeof ReportQueryResponseZ>;

export const ReportExportResponseZ = z.object({
  downloadURL: z.string(),
  expiresAt: z.string().optional(),
});
export type ReportExportResponse = z.infer<typeof ReportExportResponseZ>;

export const ReportSlugRequestMap = {
  "sector-sales": SectorSalesReportRequestZ,
  "daily-sales": DailySalesReportRequestZ,
} as const;
export type ReportSlug = keyof typeof ReportSlugRequestMap;
export type ReportSpecificRequest<Slug extends ReportSlug> = z.infer<(typeof ReportSlugRequestMap)[Slug]>;

const basePath = "/api/reports";

export const reportsContract = c.router({
  catalogue: {
    method: "GET",
    path: basePath,
    summary: "List all available reports",
    query: z.object({
      tenantOID: z.string(),
    }),
    responses: {
      200: ReportCatalogueResponseZ,
    },
  },
  run: {
    method: "POST",
    path: `${basePath}/:slug/query`,
    summary: "Execute a report query",
    body: ReportQueryPayloadZ,
    responses: {
      200: ReportQueryResponseZ,
      501: z.object({ message: z.string() }),
    },
  },
  export: {
    method: "POST",
    path: `${basePath}/:slug/export`,
    summary: "Export a report",
    body: ReportQueryPayloadZ.extend({
      format: ReportOutputFormatZ.default("xlsx"),
    }),
    responses: {
      200: ReportExportResponseZ,
      501: z.object({ message: z.string() }),
    },
  },
});

export type ReportsContract = typeof reportsContract;
