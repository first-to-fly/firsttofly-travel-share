import { z } from "zod";

import { ReportFormat } from "../entities/Operations/Report";
import type { ReportMetadata } from "./sector-sales";


/**
 * Daily Sales Report Filters
 */
export const DailySalesFiltersZ = z.object({
  /** Staff filter - "all" or specific staff ID */
  staff: z.union([z.literal("all"), z.string().min(1)]).default("all"),

  /** Station code */
  stationCode: z.string().optional(),

  /** Date type - booking date or departure date */
  dateType: z.enum(["booking-date", "departure-date"]).default("booking-date"),

  /** Date range type */
  dateRangeType: z.enum([
    "today",
    "yesterday",
    "this-week",
    "last-week",
    "this-month",
    "last-month",
    "custom",
  ]),

  /** Start date (for custom range) */
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** End date (for custom range) */
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  /** Product type filter */
  productType: z.enum(["all", "git", "fit"]).default("all"),

  /** Product code (optional) */
  productCode: z.string().optional(),

  /** Group by option - sector or salesman */
  groupBy: z.enum(["sector", "salesman"]).default("sector"),

  /** Sector group (optional) */
  sectorGroup: z.string().optional(),

  /** Sector filter - "all" or specific sector ID */
  sector: z.union([z.literal("all"), z.string().min(1)]).default("all"),

  /** Departments filter - "all" or specific department OID */
  departments: z.union([z.literal("all"), z.string().min(1)]).default("all"),

  /** Payment balance status */
  paymentBalance: z
    .enum([
      "all",
      "fully-paid",
      "overpaid",
      "outstanding",
      "outstanding-unpaid",
      "outstanding-partially-paid",
      "with-payment",
    ])
    .default("all"),

  /** Exclude transferred bookings */
  excludeTransferredBooking: z.boolean().default(false),

  /** Tenant OID */
  tenantOID: z.string().min(1),
});

export type DailySalesFilters = z.infer<typeof DailySalesFiltersZ>;

export const DailySalesReportMetadata: ReportMetadata = {
  id: "daily-sales-report",
  slug: "daily-sales-report",
  name: "Daily Sales Report",
  description: "Generates daily sales breakdown by staff, sector, or salesman, with payment status filtering.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.CSV],
  supportsWebView: true,
};
