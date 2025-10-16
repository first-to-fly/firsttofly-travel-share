import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
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

export const BookingAdjustmentReportMetadata: ReportMetadata = {
  id: "booking-adjustment-report",
  slug: "booking-adjustment-report",
  name: "Booking Adjustment Report",
  description: "Tracks adjustments made to bookings, including before/after values and reasons.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: false,
};
