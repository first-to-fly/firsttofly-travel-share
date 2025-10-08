import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EmailTemplateKeyZ, EmailTemplateZ } from "../../../entities/Settings/General/EmailTemplate";


const basePath = "/api/settings/general/email/templates";

const UpdateEmailTemplateZ = EmailTemplateZ.pick({
  tenantOID: true,
  subjectTemplate: true,
  bodyTemplate: true,
  textTemplate: true,
}).partial();

const EmailTemplateOIDsResponseZ = z.object({
  oids: z.array(z.string()),
});

const DefaultEmailTemplateStringsZ = z.object({
  subjectTemplate: z.string(),
  bodyTemplate: z.string(),
  textTemplate: z.string().nullable().optional(),
  sampleContext: z.unknown(),
});

const DefaultEmailTemplatesResponseZ = z.object({
  templates: z.record(EmailTemplateKeyZ, DefaultEmailTemplateStringsZ),
});

const PreviewEmailTemplateRequestZ = z.object({
  key: EmailTemplateKeyZ,
  tenantOID: z.string().optional(),
  subjectTemplate: z.string(),
  bodyTemplate: z.string(),
  textTemplate: z.string().optional().nullable(),
  context: z.record(z.unknown()).optional(),
});

const EmailTemplatePreviewResponseZ = z.object({
  subject: z.string(),
  html: z.string(),
  text: z.string().nullish(),
  source: z.enum(["dynamic", "default", "override"]),
  metadata: z.object({
    templateId: z.string().optional(),
    tenantId: z.string().nullish().optional(),
    locale: z.string().nullish().optional(),
    errors: z.array(z.string()).optional(),
  }),
});

const TestSendEmailTemplateRequestZ = z.object({
  key: EmailTemplateKeyZ,
  tenantOID: z.string().optional(),
  to: z.string().email(),
  subjectTemplate: z.string(),
  bodyTemplate: z.string(),
  textTemplate: z.string().optional().nullable(),
  context: z.record(z.unknown()).optional(),
});

export type UpdateEmailTemplateRequest = z.infer<typeof UpdateEmailTemplateZ>;
export type PreviewEmailTemplateRequest = z.infer<typeof PreviewEmailTemplateRequestZ>;
export type EmailTemplatePreviewResponse = z.infer<typeof EmailTemplatePreviewResponseZ>;
export type TestSendEmailTemplateRequest = z.infer<typeof TestSendEmailTemplateRequestZ>;

export const emailTemplateContract = initContract().router({
  getEmailTemplates: {
    summary: "Get email templates",
    method: "GET",
    path: basePath,
    query: z
      .object({
        tenantOID: z.string(),
        key: EmailTemplateKeyZ.optional(),
      })
      .passthrough(),
    responses: {
      200: EmailTemplateOIDsResponseZ,
    },
  },
  getDefaultEmailTemplates: {
    summary: "Get default email template strings",
    method: "GET",
    path: `${basePath}/defaults`,
    query: z.object({
      key: EmailTemplateKeyZ.optional(),
    }).optional(),
    responses: {
      200: DefaultEmailTemplatesResponseZ,
    },
  },
  updateEmailTemplates: {
    summary: "Update multiple existing email templates",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(EmailTemplateKeyZ, UpdateEmailTemplateZ),
    responses: {
      200: z.array(z.string()),
    },
  },

  deleteEmailTemplates: {
    summary: "Delete multiple email templates",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      emailTemplateOIDs: z.array(z.string()),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  previewEmailTemplate: {
    summary: "Preview an email template rendering",
    method: "POST",
    path: `${basePath}/preview`,
    body: PreviewEmailTemplateRequestZ,
    responses: {
      200: EmailTemplatePreviewResponseZ,
    },
  },

  testSendEmailTemplate: {
    summary: "Send a test email using a template",
    method: "POST",
    path: `${basePath}/test-send`,
    body: TestSendEmailTemplateRequestZ,
    responses: {
      200: z.boolean(),
    },
  },
});
