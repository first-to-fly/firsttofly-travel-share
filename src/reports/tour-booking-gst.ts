import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { DateISOStringZ } from "../types/date";
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
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
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
