import { initContract } from "@ts-rest/core";
import { z } from "zod";

import {
  EmailTemplateKeyZ,
  EmailTemplateZ,
} from "../../entities/Settings/General/EmailTemplate";
import { MultiLangRecordZ } from "../../types/multipleLanguage";

const basePath = "/api/email/templates";

const CreateEmailTemplateZ = z.object({
  tenantOID: EmailTemplateZ.shape.tenantOID.optional(),
  key: EmailTemplateKeyZ,
  subjectTemplate: MultiLangRecordZ(z.string()),
  bodyTemplate: MultiLangRecordZ(z.string()),
  textTemplate: MultiLangRecordZ(z.string().nullish()).optional(),
});

const UpdateEmailTemplateZ = CreateEmailTemplateZ.omit({
  tenantOID: true,
  key: true,
}).partial();

const EmailTemplateOIDsResponseZ = z.object({
  oids: z.array(z.string()),
});

const OverridesZ = z.object({
  subjectTemplate: MultiLangRecordZ(z.string()).optional(),
  bodyTemplate: MultiLangRecordZ(z.string()).optional(),
  textTemplate: MultiLangRecordZ(z.string().nullish()).optional(),
});

const PreviewEmailTemplateRequestZ = z.object({
  key: EmailTemplateKeyZ,
  tenantOID: z.string().optional(),
  langCode: z.string().optional(),
  overrides: OverridesZ.optional(),
  context: z.record(z.unknown()),
});

const EmailTemplatePreviewResponseZ = z.object({
  subject: z.string(),
  html: z.string(),
  text: z.string().nullish(),
  source: z.enum(["dynamic", "static", "override"]),
  metadata: z.object({
    templateId: z.string().optional(),
    tenantId: z.string().nullish().optional(),
    locale: z.string().nullish().optional(),
    errors: z.array(z.string()).optional(),
  }),
});

const TestSendEmailTemplateRequestZ = z.object({
  emailTemplateOID: z.string(),
  tenantOID: z.string().optional(),
  to: z.string().email(),
  langCode: z.string().optional(),
  overrides: OverridesZ.optional(),
  context: z.record(z.unknown()).optional(),
});

export type CreateEmailTemplateRequest = z.infer<typeof CreateEmailTemplateZ>;
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

  createEmailTemplate: {
    summary: "Create a new email template",
    method: "POST",
    path: basePath,
    body: CreateEmailTemplateZ,
    responses: {
      200: z.string(),
    },
  },

  updateEmailTemplates: {
    summary: "Update multiple existing email templates",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateEmailTemplateZ),
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
