import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Tour Booking GST Report Filters
 */
export const TourBookingGSTFiltersZ = z.object({
  /** Departure date range type */
  departureDate: DateRangeTypeZ,

  /** Start date (for custom range) */
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type TourBookingGSTFilters = z.infer<typeof TourBookingGSTFiltersZ>;

export interface TourBookingGSTRow {
  bookingId: string;
  bookingReference: string;
  bookingDate: Date;
  tourCode: string | null;
  departureDate: Date | null;
  totalAmount: number;
  gstAmount: number;
  netAmount: number;
  gstPercentage: number;
}

export interface TourBookingGSTSummary {
  totalBookings: number;
  totalAmount: number;
  totalGST: number;
  totalNet: number;
}

export interface TourBookingGSTReportData {
  rows: TourBookingGSTRow[];
  summary: TourBookingGSTSummary;
  tenantName: string;
}

export interface TourBookingGstReportJsonMetadata {
  totalBookings: number;
  totalAmount: number;
  totalGST: number;
  totalNet: number;
  tenantName: string;
}

export type TourBookingGSTReportTemplateContext = TourBookingGSTReportData;

export type TourBookingGstReportJsonOutput = BaseReportJsonOutput<TourBookingGstReportJsonMetadata>;

export const TourBookingGSTReportMetadata: ReportMetadata = {
  id: "tour-booking-gst-report",
  slug: "tour-booking-gst-report",
  name: "Tour Booking GST Report",
  description: "Summarizes GST amounts for tour bookings within the selected date range.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

export const TOUR_BOOKING_GST_REPORT_SAMPLE_CONTEXT: TourBookingGSTReportTemplateContext = {
  rows: [],
  summary: {
    totalBookings: 0,
    totalAmount: 0,
    totalGST: 0,
    totalNet: 0,
  },
  tenantName: "Sample Company",
};

export const TOUR_BOOKING_GST_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Tour Booking GST Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Tour Booking GST Report</h1>
  <p><strong>Total GST:</strong> {{summary.totalGST}}</p>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
