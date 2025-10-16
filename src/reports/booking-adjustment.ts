import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateOnlyStringZ } from "../types/date";
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
  startDate: DateOnlyStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateOnlyStringZ.optional(),

  /** Departure date (optional) */
  departureDate: DateOnlyStringZ.optional(),

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
