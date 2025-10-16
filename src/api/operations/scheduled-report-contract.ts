import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ScheduledReportZ } from "../../entities/Operations/ScheduledReport";


const basePath = "/api/reports/schedules";

const CreateScheduledReportZ = ScheduledReportZ.pick({
  tenantOID: true,
  name: true,
  description: true,
  departmentOID: true,
  reportServiceId: true,
  filters: true,
  format: true,
  scheduleType: true,
  timezone: true,
  isActive: true,
  notifyOnCompletion: true,
  notificationEmails: true,
});

const UpdateScheduledReportZ = CreateScheduledReportZ.omit({
  tenantOID: true,
}).partial();

export type CreateScheduledReport = z.infer<typeof CreateScheduledReportZ>;
export type UpdateScheduledReport = z.infer<typeof UpdateScheduledReportZ>;

export const scheduledReportContract = initContract().router({
  getScheduledReports: {
    summary: "Get scheduled reports",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      departmentOID: z.string().optional(),
      isActive: z.boolean().optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  getScheduledReport: {
    summary: "Get a specific scheduled report",
    method: "GET",
    path: `${basePath}/:scheduledReportOID`,
    responses: {
      200: ScheduledReportZ,
    },
  },

  createScheduledReport: {
    summary: "Create a new scheduled report",
    method: "POST",
    path: basePath,
    body: CreateScheduledReportZ,
    responses: {
      200: z.string().describe("OID of the created scheduled report"),
    },
  },

  updateScheduledReports: {
    summary: "Update multiple scheduled reports",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of scheduled report to update"),
      UpdateScheduledReportZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated scheduled reports")),
    },
  },

  deleteScheduledReports: {
    summary: "Delete multiple scheduled reports",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      scheduledReportOIDs: z.array(z.string().describe("OIDs of scheduled reports to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  enableSchedule: {
    summary: "Enable a scheduled report",
    method: "POST",
    path: `${basePath}/:scheduledReportOID/enable`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  disableSchedule: {
    summary: "Disable a scheduled report",
    method: "POST",
    path: `${basePath}/:scheduledReportOID/disable`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  triggerNow: {
    summary: "Trigger immediate execution of a scheduled report",
    method: "POST",
    path: `${basePath}/:scheduledReportOID/trigger`,
    body: z.object({}),
    responses: {
      200: z.string().describe("OID of the generated report"),
    },
  },

  getScheduleHistory: {
    summary: "Get generation history for a scheduled report",
    method: "GET",
    path: `${basePath}/:scheduledReportOID/history`,
    query: z.object({
      limit: z.number().int().min(1).max(100)
        .default(20)
        .optional(),
      offset: z.number().int().min(0).default(0)
        .optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        reportOIDs: z.array(z.string()),
        total: z.number().int(),
      }),
    },
  },
});
