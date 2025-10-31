import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Booking Adjustment Report Filters
 */
export const BookingAdjustmentFiltersZ = z.object({
  /** Date range type */
  dateRangeType: DateRangeTypeZ,

  /** Start date (for custom range) */
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Departure date (optional) */
  departureDate: DateISOStringZ.optional(),

  /** Booking station (optional) */
  bookingStation: z.string().optional(),

  /** Tour code (optional) */
  tourCode: z.string().optional(),

  /** Adjustment type filter (optional) */
  adjustmentType: z.string().optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type BookingAdjustmentFilters = z.infer<typeof BookingAdjustmentFiltersZ>;

/**
 * Booking Adjustment Report - Placeholder
 * 
 * Note: Legacy data source (`booking_adjustment` table) is not available.
 * This is a placeholder until a migration strategy is defined.
 */
export interface BookingAdjustmentReportData {
  message: string;
  tenantName: string;
}

export interface BookingAdjustmentReportJsonMetadata {
  placeholder: boolean;
  reason: string;
  tenantName: string;
}

export type BookingAdjustmentReportTemplateContext = BookingAdjustmentReportData;

export type BookingAdjustmentReportJsonOutput = BaseReportJsonOutput<BookingAdjustmentReportJsonMetadata>;

export const BookingAdjustmentReportMetadata: ReportMetadata = {
  id: "booking-adjustment-report",
  slug: "booking-adjustment-report",
  name: "Booking Adjustment Report",
  description: "Tracks adjustments made to bookings, including before/after values and reasons.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: false,
};

export const BOOKING_ADJUSTMENT_REPORT_SAMPLE_CONTEXT: BookingAdjustmentReportTemplateContext = {
  message: "Legacy data source not available. Awaiting migration strategy.",
  tenantName: "Sample Company",
};

export const BOOKING_ADJUSTMENT_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Booking Adjustment Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .notice { padding: 20px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Booking Adjustment Report</h1>
  <div class="notice">
    <strong>Notice:</strong> {{message}}
  </div>
</body>
</html>`;
