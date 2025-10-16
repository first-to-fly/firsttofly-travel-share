import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ } from "../types/date";
import type { ReportMetadata } from "./sector-sales";


/**
 * Tour Sales Report Filters
 */
export const TourSalesFiltersZ = z.object({
  /** Product type filter */
  productType: z.enum(["git", "fit"]).optional(),

  /** Product code (optional) */
  productCode: z.string().optional(),

  /** Date type - booking date or departure date */
  dateType: z.enum(["booking-date", "departure-date"]).default("departure-date"),

  /** Departments filter (optional) */
  departmentOID: EntityOIDZ.optional(),

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

  /** Sales & Cost Status filter */
  salesCostStatus: z.enum([
    "all",
    "with-sales-and-cost",
    "with-sales-no-cost",
    "with-cost-no-sales",
  ]).default("with-sales-and-cost"),

  /** Sector filter (optional) */
  sectorOID: EntityOIDZ.optional(),

  /** Tenant OID */
  tenantOID: EntityOIDZ,
});

export type TourSalesFilters = z.infer<typeof TourSalesFiltersZ>;

export const TourSalesReportMetadata: ReportMetadata = {
  id: "tour-sales-report",
  slug: "tour-sales-report",
  name: "Tour Sales Report",
  description: "Summarizes tour sales by product, showing revenue, costs, and gross profit for each tour.",
  supportedFormats: [ReportFormat.XLSX],
  supportsWebView: true,
};
