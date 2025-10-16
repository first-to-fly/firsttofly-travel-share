import { z } from "zod";

import type { ReportMetadata } from "./sector-sales";


/**
 * Tour Booking GST Report Filters
 */
export const TourBookingGSTFiltersZ = z.object({
  /** Departure date range type */
  departureDate: z.enum([
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

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type TourBookingGSTFilters = z.infer<typeof TourBookingGSTFiltersZ>;

export const TourBookingGSTReportMetadata: ReportMetadata = {
  id: "tour-booking-gst-report",
  slug: "tour-booking-gst-report",
  name: "Tour Booking GST Report",
  description: "Summarizes GST amounts for tour bookings within the selected date range.",
  supportedFormats: [],
  supportsWebView: true,
};
