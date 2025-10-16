import { z } from "zod";


/**
 * Tour Sales Report Filters
 */
export const TourSalesFiltersZ = z.object({
  /** Product type filter */
  productType: z.enum(["all", "git", "fit"]).default("all"),

  /** Product code (optional) */
  productCode: z.string().optional(),

  /** Date type - booking date or departure date */
  dateType: z.enum(["booking-date", "departure-date"]).default("departure-date"),

  /** Departments filter - "all" or specific department OID */
  departments: z.union([z.literal("all"), z.string().min(1)]).default("all"),

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

  /** Sales & Cost Status filter */
  salesCostStatus: z.enum([
    "all",
    "with-sales-and-cost",
    "with-sales-no-cost",
    "with-cost-no-sales",
  ]).default("with-sales-and-cost"),

  /** Sector filter - "all" or specific sector ID */
  sector: z.union([z.literal("all"), z.string().min(1)]).default("all"),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type TourSalesFilters = z.infer<typeof TourSalesFiltersZ>;
