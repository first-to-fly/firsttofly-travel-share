import { z } from "zod";

import { BookingStatus } from "../enums/BookingTypes";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Outstanding Booking Report Filters
 */
export const OutstandingBookingFiltersZ = z.object({
  dateRangeType: DateRangeTypeZ.default("custom"),
  startDate: DateISOStringZ.optional(),
  endDate: DateISOStringZ.optional(),
  dateType: z.enum(["booking-date", "departure-date"]).default("booking-date"),
  bookingStatuses: z.array(z.nativeEnum(BookingStatus)).optional(),
  includeCancel: z.boolean().optional().default(false),
  includeTransferred: z.boolean().optional().default(false),
});

export type OutstandingBookingFilters = z.infer<typeof OutstandingBookingFiltersZ>;

export interface OutstandingBookingRow {
  bookingId: string;
  bookingReference: string;
  bookingDate: Date;
  departureDate: Date | null;
  departureCode: string | null;
  tourCode: string;
  bookingStatus: string;
  paymentStatus: string;
  totalAmount: number;
  receivedAmount: number;
  balance: number;
  paxCount: number;
  paxNames: string;
  departmentName: string;
  sectorName: string;
  saleStaffName: string;
  currencyCode: string;
  isCancelled: boolean;
  isTransferred: boolean;
}

export interface OutstandingBookingSummary {
  totalBookings: number;
  totalAmount: number;
  totalReceived: number;
  totalBalance: number;
  currencyCode: string;
}

export interface OutstandingBookingReportData {
  rows: OutstandingBookingRow[];
  summary: OutstandingBookingSummary;
  tenantName: string;
}

export interface OutstandingBookingReportJsonMetadata {
  totalBookings: number;
  totalAmount: number;
  totalReceived: number;
  totalBalance: number;
  currencyCode: string;
  tenantName: string;
}

export type OutstandingBookingReportTemplateContext = OutstandingBookingReportData;

export type OutstandingBookingReportJsonOutput = BaseReportJsonOutput<OutstandingBookingReportJsonMetadata>;

export const OutstandingBookingReportMetadata: ReportMetadata = {
  id: "outstanding-booking-report",
  slug: "outstanding-booking-report",
  name: "Outstanding Booking Report",
  description: "Lists bookings with outstanding balances.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.JSON, ReportFormat.PDF, ReportFormat.HTML],
  supportsWebView: true,
};

export const OUTSTANDING_BOOKING_REPORT_SAMPLE_CONTEXT: OutstandingBookingReportTemplateContext = {
  rows: [],
  summary: {
    totalBookings: 0,
    totalAmount: 0,
    totalReceived: 0,
    totalBalance: 0,
    currencyCode: "SGD",
  },
  tenantName: "Sample Company",
};

export const OUTSTANDING_BOOKING_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenantName}} - Outstanding Booking Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>{{tenantName}} - Outstanding Booking Report</h1>
  <p><strong>Total Outstanding:</strong> {{summary.currencyCode}} {{summary.totalBalance}}</p>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;

