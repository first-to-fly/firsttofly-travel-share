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
 * Booking Adjustment Report Row
 */
export interface BookingAdjustmentRow {
  approvalRequestId: string;
  approvalRequestCode: string;
  requestDate: Date;
  bookingOID: string;
  bookingReference: string;
  customerName: string;
  bookingType: "Group Tour" | "Independent Tour";
  amendmentReason: string;
  status: string;
  completedAt: Date | null;
  originalTotal: number;
  amendedTotal: number;
  totalDifference: number;
  originalOutstanding: number;
  amendedOutstanding: number;
  receivedAmount: number;
  refundRequired: boolean;
  refundAmount: number;
  additionalPaymentRequired: boolean;
  additionalPaymentAmount: number;
  changedFields: string[];
  submitterName: string;
}

/**
 * Booking Adjustment Report Summary
 */
export interface BookingAdjustmentSummary {
  totalAdjustments: number;
  totalIncreases: number;
  totalDecreases: number;
  totalRefundsRequired: number;
  totalAdditionalPaymentsRequired: number;
  groupTourCount: number;
  independentTourCount: number;
}

/**
 * Booking Adjustment Report Data
 */
export interface BookingAdjustmentReportData {
  rows: BookingAdjustmentRow[];
  summary: BookingAdjustmentSummary;
  tenantName: string;
  currencySymbol: string;
}

export interface BookingAdjustmentReportJsonMetadata {
  totalAdjustments: number;
  totalIncreases: number;
  totalDecreases: number;
  totalRefundsRequired: number;
  totalAdditionalPaymentsRequired: number;
  groupTourCount: number;
  independentTourCount: number;
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
  rows: [],
  summary: {
    totalAdjustments: 0,
    totalIncreases: 0,
    totalDecreases: 0,
    totalRefundsRequired: 0,
    totalAdditionalPaymentsRequired: 0,
    groupTourCount: 0,
    independentTourCount: 0,
  },
  tenantName: "Sample Company",
  currencySymbol: "$",
};

export const BOOKING_ADJUSTMENT_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Booking Adjustment Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .summary { margin: 20px 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .summary-item { padding: 15px; background: #f5f5f5; border-radius: 4px; }
    .summary-item strong { display: block; margin-bottom: 5px; color: #666; }
    .summary-item .value { font-size: 24px; font-weight: bold; color: #333; }
    .increase { color: #28a745; }
    .decrease { color: #dc3545; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Booking Adjustment Report</h1>
  <div class="summary">
    <div class="summary-item">
      <strong>Total Adjustments</strong>
      <div class="value">{{summary.totalAdjustments}}</div>
    </div>
    <div class="summary-item">
      <strong>Group Tour Adjustments</strong>
      <div class="value">{{summary.groupTourCount}}</div>
    </div>
    <div class="summary-item">
      <strong>Independent Tour Adjustments</strong>
      <div class="value">{{summary.independentTourCount}}</div>
    </div>
    <div class="summary-item">
      <strong>Total Increases</strong>
      <div class="value increase">{{currencySymbol}}{{summary.totalIncreases}}</div>
    </div>
    <div class="summary-item">
      <strong>Total Decreases</strong>
      <div class="value decrease">{{currencySymbol}}{{summary.totalDecreases}}</div>
    </div>
    <div class="summary-item">
      <strong>Refunds Required</strong>
      <div class="value">{{currencySymbol}}{{summary.totalRefundsRequired}}</div>
    </div>
  </div>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
