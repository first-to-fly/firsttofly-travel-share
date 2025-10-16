import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ReportZ } from "../../entities/Operations/Report";


const basePath = "/api/reports/entities";

const CreateReportZ = ReportZ.pick({
  tenantOID: true,
  name: true,
  description: true,
  departmentOID: true,
  filters: true,
  format: true,
  status: true,
});

const UpdateReportZ = CreateReportZ.omit({
  tenantOID: true,
}).partial();

export type CreateReport = z.infer<typeof CreateReportZ>;
export type UpdateReport = z.infer<typeof UpdateReportZ>;

export const reportEntityContract = initContract().router({
  getReports: {
    summary: "Get generated reports",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      departmentOID: z.string().optional(),
      status: z.string().optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  getReport: {
    summary: "Get a specific generated report",
    method: "GET",
    path: `${basePath}/:reportOID`,
    responses: {
      200: ReportZ,
    },
  },

  createReport: {
    summary: "Create a new report generation request",
    method: "POST",
    path: basePath,
    body: CreateReportZ,
    responses: {
      200: z.string().describe("OID of the created report"),
    },
  },

  updateReports: {
    summary: "Update multiple existing reports",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of report to update"),
      UpdateReportZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated reports")),
    },
  },

  deleteReports: {
    summary: "Delete multiple reports",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      reportOIDs: z.array(z.string().describe("OIDs of reports to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  downloadReport: {
    summary: "Get download URL for a generated report",
    method: "GET",
    path: `${basePath}/:reportOID/download`,
    responses: {
      200: z.object({
        downloadURL: z.string(),
        fileName: z.string(),
        expiresAt: z.string().optional(),
      }),
    },
  },
});
