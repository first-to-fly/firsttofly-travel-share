import { z } from "zod";


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
