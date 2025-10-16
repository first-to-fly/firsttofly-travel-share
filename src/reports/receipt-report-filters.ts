import { z } from "zod";


/**
 * Receipt Report Filters
 */
export const ReceiptReportFiltersZ = z.object({
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

  /** Payment method filter - "all" or specific payment method */
  paymentMethod: z.union([z.literal("all"), z.string().min(1)]).default("all"),

  /** Tour codes (optional) */
  tourCodes: z.string().optional(),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type ReceiptReportFilters = z.infer<typeof ReceiptReportFiltersZ>;
