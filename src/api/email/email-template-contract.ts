import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/email/templates";

const EmailTemplateEngineZ = z.enum(["handlebars", "html", "mjml"]);
const EmailTemplateKeyZ = z.enum([
  "payment.request",
  "user.invitation",
  "group-tour.booking.confirmation",
  "independent-tour.booking.confirmation",
  "independent-tour.booking.cancellation",
  "user-message.notification",
  "approval.notification",
  "approval.outcome",
  "approval.timeout-warning",
  "tour-departure.min-pax-alert",
  "customer.verification-otp",
  "customer.booking-link",
]);

const EmailTemplateResponseZ = z.object({
  oid: z.string(),
  id: z.string(),
  key: EmailTemplateKeyZ,
  tenantOID: z.string().nullable().optional(),
  locale: z.string().nullable().optional(),
  engine: EmailTemplateEngineZ,
  subjectTemplate: z.string(),
  bodyTemplate: z.string(),
  textTemplate: z.string().nullable(),
  isActive: z.boolean(),
  version: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string().nullable(),
});

const EmailTemplateListResponseZ = z.object({
  data: z.array(EmailTemplateResponseZ),
});

const CreateEmailTemplateRequestZ = z.object({
  key: EmailTemplateKeyZ,
  tenantOID: z.string().optional(),
  locale: z.string().optional(),
  engine: EmailTemplateEngineZ.optional(),
  subjectTemplate: z.string(),
  bodyTemplate: z.string(),
  textTemplate: z.string().nullable().optional(),
  activate: z.boolean().optional(),
});

const UpdateEmailTemplateRequestZ = z.object({
  subjectTemplate: z.string().optional(),
  bodyTemplate: z.string().optional(),
  textTemplate: z.string().nullable().optional(),
  engine: EmailTemplateEngineZ.optional(),
});

const PreviewEmailTemplateRequestZ = z.object({
  key: EmailTemplateKeyZ,
  tenantOID: z.string().optional(),
  locale: z.string().optional(),
  overrides: z.object({
    subjectTemplate: z.string().optional(),
    bodyTemplate: z.string().optional(),
    textTemplate: z.string().nullable().optional(),
    engine: EmailTemplateEngineZ.optional(),
  }).optional(),
  context: z.record(z.unknown()),
});

const EmailTemplatePreviewResponseZ = z.object({
  subject: z.string(),
  html: z.string(),
  text: z.string().nullable(),
  source: z.enum(["dynamic", "static", "override"]),
  metadata: z.object({
    templateId: z.string().optional(),
    version: z.number().optional(),
    tenantId: z.string().nullable().optional(),
    locale: z.string().nullable().optional(),
    engine: EmailTemplateEngineZ.or(z.literal("static")),
    errors: z.array(z.string()).optional(),
  }),
});

export type CreateEmailTemplateRequest = z.infer<typeof CreateEmailTemplateRequestZ>;
export type UpdateEmailTemplateRequest = z.infer<typeof UpdateEmailTemplateRequestZ>;
export type PreviewEmailTemplateRequest = z.infer<typeof PreviewEmailTemplateRequestZ>;
export type EmailTemplateResponse = z.infer<typeof EmailTemplateResponseZ>;
export type EmailTemplatePreviewResponse = z.infer<typeof EmailTemplatePreviewResponseZ>;

export const emailTemplateContract = initContract().router({
  listTemplates: {
    method: "GET",
    path: basePath,
    query: z.object({
      key: EmailTemplateKeyZ.optional(),
      tenantOID: z.string().optional(),
      locale: z.string().optional(),
      includeInactive: z.boolean().optional(),
      limit: z.number().min(1).max(100).optional(),
      offset: z.number().min(0).optional(),
    }).passthrough(),
    responses: {
      200: EmailTemplateListResponseZ,
    },
    summary: "List email templates",
  },

  getTemplate: {
    method: "GET",
    path: `${basePath}/oid/:templateOID`,
    responses: {
      200: EmailTemplateResponseZ,
    },
    summary: "Get an email template by OID",
  },

  createTemplate: {
    method: "POST",
    path: basePath,
    body: CreateEmailTemplateRequestZ,
    responses: {
      201: EmailTemplateResponseZ,
    },
    summary: "Create a new email template",
  },

  updateTemplate: {
    method: "PATCH",
    path: `${basePath}/oid/:templateOID`,
    body: UpdateEmailTemplateRequestZ,
    responses: {
      200: EmailTemplateResponseZ,
    },
    summary: "Update an email template",
  },

  publishTemplate: {
    method: "POST",
    path: `${basePath}/oid/:templateOID/publish`,
    body: z.void(),
    responses: {
      200: EmailTemplateResponseZ,
    },
    summary: "Publish an email template version",
  },

  rollbackTemplate: {
    method: "POST",
    path: `${basePath}/oid/:templateOID/rollback`,
    body: z.void(),
    responses: {
      200: EmailTemplateResponseZ,
    },
    summary: "Rollback to previous email template version",
  },

  deleteTemplate: {
    method: "DELETE",
    path: `${basePath}/oid/:templateOID`,
    body: z.void(),
    responses: {
      204: z.void(),
    },
    summary: "Delete an email template",
  },

  previewTemplate: {
    method: "POST",
    path: `${basePath}/preview`,
    body: PreviewEmailTemplateRequestZ,
    responses: {
      200: EmailTemplatePreviewResponseZ,
    },
    summary: "Preview an email template rendering",
  },
});
