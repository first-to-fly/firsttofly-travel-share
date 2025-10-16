import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Booking Adjustment Report Filters
 */
export const BookingAdjustmentFiltersZ = z.object({
  /** Date range type */
  dateRangeType: z.enum([
    "today",
    "yesterday",
    "current-week",
    "last-week",
    "current-month",
    "last-month",
    "custom",
  ]),

  /** Start date (for custom range) */
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** End date (for custom range) */
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Departure date (optional) */
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Booking station (optional) */
  bookingStation: z.string().optional(),

  /** Tour code (optional) */
  tourCode: z.string().optional(),

  /** Adjustment type filter - "all" or specific adjustment type */
  adjustmentType: z.union([z.literal("all"), z.string().min(1)]).default("all"),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type BookingAdjustmentFilters = z.infer<typeof BookingAdjustmentFiltersZ>;

export const BookingAdjustmentReportMetadata: ReportMetadata = {
  id: "booking-adjustment-report",
  slug: "booking-adjustment-report",
  name: "Booking Adjustment Report",
  description: "Tracks adjustments made to bookings, including before/after values and reasons.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: false,
};
