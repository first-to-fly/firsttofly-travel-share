import { z } from "zod";

import { NamedURLZ } from "../../types/url";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum ReportStatus {
  PENDING = "pending",
  GENERATING = "generating",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum ReportFormat {
  PDF = "pdf",
  XLSX = "xlsx",
  CSV = "csv",
}

export enum ReportEvents {
  REPORT_UPDATED = "REPORT_UPDATED",
  REPORT_LIST_UPDATED = "REPORT_LIST_UPDATED",
  REPORT_GENERATED = "REPORT_GENERATED",
  REPORT_GENERATION_FAILED = "REPORT_GENERATION_FAILED",
}

export const ReportZ = EntityZ.extend({
  entityType: z.literal(EntityType.REPORT),

  // Report Identification
  name: z.string(),
  description: z.string().nullish(),

  // Department Association (optional for tenant-level reports)
  departmentOID: z.string().nullish(),

  // Report Configuration
  filters: z.record(z.string(), z.unknown()).default({}),
  format: z.nativeEnum(ReportFormat),

  // File Storage
  file: NamedURLZ.nullish(),

  // Generation Metadata
  status: z.nativeEnum(ReportStatus),
  generatedAt: z.string().nullish(), // ISO date string
  errorMessage: z.string().nullish(),

  // Row Count
  totalRows: z.number().int().nullish(),
});


export type Report = z.infer<typeof ReportZ>;
