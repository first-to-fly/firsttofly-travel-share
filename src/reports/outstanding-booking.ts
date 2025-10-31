import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { BookingPaymentStatus, BookingStatus } from "../enums/BookingTypes";
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
  paymentStatuses: z.array(z.nativeEnum(BookingPaymentStatus)).optional(),
  stationCode: z.string().optional(),
  departmentId: z.string().optional(),
  sectorId: z.string().optional(),
  search: z.string().optional(),
  paymentBalance: z.enum([
    "all",
    "outstanding",
    "outstanding-unpaid",
    "outstanding-partially-paid",
    "fully-paid",
    "overpaid",
  ]).default("outstanding"),
  page: z.number().int().nonnegative().default(0),
  pageSize: z.number().int().positive().max(200)
    .default(50),
  tenantOID: EntityOIDZ,
});

export type OutstandingBookingFilters = z.infer<typeof OutstandingBookingFiltersZ>;

export interface OutstandingBookingRow {
  bookingId: string;
  bookingReference: string;
  customerName: string;
  paxEmail?: string;
  bookingDate: Date;
  departureDate: Date | null;
  bookingStatus: string;
  paymentStatus: string;
  tourCode: string;
  departmentName?: string;
  sectorName?: string;
  stationCode?: string;
  platform?: string;
  saleStaffId?: string;
  totalAmount: number;
  receivedAmount: number;
  outstandingAmount: number;
  refundAmount: number;
  cancellationFeeAmount: number;
  netReceivedAmount: number;
  lastPaymentDate: Date | null;
  tcpBookingId?: string | null;
}

export interface OutstandingBookingSummary {
  totalBookings: number;
  totalAmount: number;
  totalReceived: number;
  totalOutstanding: number;
  totalRefunds: number;
  totalCancellationFees: number;
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
    totalOutstanding: 0,
    totalRefunds: 0,
    totalCancellationFees: 0,
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
  <p><strong>Total Outstanding:</strong> {{summary.totalOutstanding}}</p>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;

