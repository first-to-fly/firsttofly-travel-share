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

export interface TourBookingGSTLineItem {
  itemName: string;
  quantity: number;
  totalCharge: number;
  baseAmount: number;
  gstAmount: number;
}

export interface TourBookingGSTBookingItem {
  bookingId: string;
  bookingReference: string;
  bookingDate: Date | null;
  tourCode: string;
  departureDate: Date | null;
  bookingAmount: number;
  totalCharge: number;
  baseAmount: number;
  gstAmount: number;
  isCancelled: boolean;
  lineItems: TourBookingGSTLineItem[];
}

export interface TourBookingGSTTotals {
  bookingAmount: number;
  totalCharge: number;
  baseAmount: number;
  gstAmount: number;
}

export interface TourBookingGSTReportData {
  bookingItems: TourBookingGSTBookingItem[];
  grandTotal: TourBookingGSTTotals;
  cancelTotal: TourBookingGSTTotals;
  netTotal: TourBookingGSTTotals;
  tenantName: string;
  currencyCode: string;
  currencySymbol: string;
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
  bookingItems: [],
  grandTotal: {
    bookingAmount: 0,
    totalCharge: 0,
    baseAmount: 0,
    gstAmount: 0,
  },
  cancelTotal: {
    bookingAmount: 0,
    totalCharge: 0,
    baseAmount: 0,
    gstAmount: 0,
  },
  netTotal: {
    bookingAmount: 0,
    totalCharge: 0,
    baseAmount: 0,
    gstAmount: 0,
  },
  tenantName: "Sample Company",
  currencyCode: "SGD",
  currencySymbol: "$",
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
  <p><strong>Total GST:</strong> {{currencySymbol}}{{netTotal.gstAmount}}</p>
  <p>Use formatToTables() for detailed Excel/CSV export or customize this template for HTML/PDF.</p>
</body>
</html>`;
