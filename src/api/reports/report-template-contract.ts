import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/reports/templates";

const UpsertReportTemplateZ = z.object({
  tenantOID: z.string(),
  key: z.string(), // report service id, e.g. "tour-sales-report"
  template: z.string(),
});

const ReportTemplateOIDsResponseZ = z.object({
  oids: z.array(z.string()),
});

const PreviewReportTemplateRequestZ = z.object({
  key: z.string(),
  template: z.string(),
  context: z.record(z.unknown()).optional(),
});

const PreviewReportTemplateHtmlResponseZ = z.object({
  html: z.string(),
  errors: z.array(z.string()),
});

const PreviewReportTemplatePdfRequestZ = z.object({
  key: z.string(),
  template: z.string(),
  context: z.record(z.unknown()).optional(),
  options: z.object({}).passthrough().optional(),
});

const PreviewReportTemplatePdfResponseZ = z.object({
  html: z.string(),
  errors: z.array(z.string()),
  pdf: z.string(),
});

export type UpsertReportTemplateRequest = z.infer<typeof UpsertReportTemplateZ>;

export const reportTemplateContract = initContract().router({
  getReportTemplates: {
    summary: "Get report templates",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }),
    responses: {
      200: ReportTemplateOIDsResponseZ,
    },
  },
  upsertReportTemplates: {
    summary: "Create or update report templates",
    method: "POST",
    path: `${basePath}/batch-upsert`,
    body: z.array(UpsertReportTemplateZ),
    responses: {
      200: z.array(z.string()),
    },
  },
  deleteReportTemplates: {
    summary: "Delete report templates",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      tenantOID: z.string(),
      reportTemplateOIDs: z.array(z.string()),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  previewReportTemplateHtml: {
    summary: "Render preview HTML for report template",
    method: "POST",
    path: `${basePath}/preview/html`,
    query: z.object({
      tenantOID: z.string(),
    }),
    body: PreviewReportTemplateRequestZ,
    responses: {
      200: PreviewReportTemplateHtmlResponseZ,
    },
  },
  previewReportTemplatePdf: {
    summary: "Render preview PDF for report template",
    method: "POST",
    path: `${basePath}/preview/pdf`,
    query: z.object({
      tenantOID: z.string(),
    }),
    body: PreviewReportTemplatePdfRequestZ,
    responses: {
      200: PreviewReportTemplatePdfResponseZ,
    },
  },
});
