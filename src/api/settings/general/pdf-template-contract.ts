import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { PdfTemplateKeyZ } from "../../../entities/Settings/General/PdfTemplate";


const basePath = "/api/settings/general/pdf/templates";

const UpsertPdfTemplateZ = z.object({
  tenantOID: z.string(),
  template: z.string(),
});

const PdfTemplateOIDsResponseZ = z.object({
  oids: z.array(z.string()),
});

const DefaultPdfTemplateDefinitionZ = z.object({
  template: z.string(),
  sampleContext: z.record(z.unknown()),
});

const DefaultPdfTemplatesResponseZ = z.object({
  templates: z.record(PdfTemplateKeyZ, DefaultPdfTemplateDefinitionZ),
});

const PreviewPdfRequestZ = z.object({
  key: PdfTemplateKeyZ,
  template: z.string(),
  context: z.record(z.unknown()).optional(),
  options: z.object({}).passthrough().optional(),
});

const PreviewPdfResponseZ = z.object({
  html: z.string(),
  errors: z.array(z.string()),
  pdf: z.string(),
});

export type UpsertPdfTemplateRequest = z.infer<typeof UpsertPdfTemplateZ>;

export const pdfTemplateContract = initContract().router({
  getPdfTemplates: {
    summary: "Get PDF templates",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }),
    responses: {
      200: PdfTemplateOIDsResponseZ,
    },
  },
  getDefaultPdfTemplates: {
    summary: "Get default PDF templates definitions",
    method: "GET",
    path: `${basePath}/defaults`,
    query: z.object({
      tenantOID: z.string(),
      key: PdfTemplateKeyZ.optional(),
    }),
    responses: {
      200: DefaultPdfTemplatesResponseZ,
    },
  },
  upsertPdfTemplates: {
    summary: "Create or update PDF templates",
    method: "POST",
    path: `${basePath}/batch-upsert`,
    body: z.record(PdfTemplateKeyZ, UpsertPdfTemplateZ.optional()),
    responses: {
      200: z.array(z.string()),
    },
  },
  deletePdfTemplates: {
    summary: "Delete PDF templates",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      tenantOID: z.string(),
      pdfTemplateOIDs: z.array(z.string()),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  previewTemplate: {
    summary: "Render preview PDF",
    method: "POST",
    path: `${basePath}/preview`,
    query: z.object({
      tenantOID: z.string(),
    }),
    body: PreviewPdfRequestZ,
    responses: {
      200: PreviewPdfResponseZ,
    },
  },
});
