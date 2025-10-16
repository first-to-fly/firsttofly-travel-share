import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { ReportFormat } from "./Report";


export enum ScheduleType {
  ONCE = "once",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export enum ScheduledReportEvents {
  SCHEDULED_REPORT_UPDATED = "SCHEDULED_REPORT_UPDATED",
  SCHEDULED_REPORT_LIST_UPDATED = "SCHEDULED_REPORT_LIST_UPDATED",
  SCHEDULED_REPORT_TRIGGERED = "SCHEDULED_REPORT_TRIGGERED",
  SCHEDULED_REPORT_COMPLETED = "SCHEDULED_REPORT_COMPLETED",
  SCHEDULED_REPORT_FAILED = "SCHEDULED_REPORT_FAILED",
}

export const ScheduledReportZ = EntityZ.extend({
  entityType: z.literal(EntityType.SCHEDULED_REPORT),

  // Report Configuration
  name: z.string(),
  description: z.string().nullish(),

  // Department Association (optional)
  departmentOID: z.string().nullish(),

  // Report Parameters
  reportServiceId: z.string(), // e.g. "daily-sales-report", "sector-sales-report"
  filters: z.record(z.string(), z.unknown()).default({}),
  format: z.nativeEnum(ReportFormat),

  // Scheduling Configuration
  scheduleType: z.nativeEnum(ScheduleType),
  timezone: z.string().default("UTC"),

  // Schedule Status
  isActive: z.boolean().default(true),
  lastRunAt: z.string().nullish(), // ISO date string
  nextRunAt: z.string().nullish(), // ISO date string
  lastReportOID: z.string().nullish(), // Reference to last generated report

  // Error Tracking
  consecutiveFailures: z.number().int().default(0),
  lastErrorMessage: z.string().nullish(),
});


export type ScheduledReport = z.infer<typeof ScheduledReportZ>;
