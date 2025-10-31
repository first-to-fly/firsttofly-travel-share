import { z } from "zod";

import { EntityOIDZ } from "../entities/entity";
import { ReportFormat } from "../entities/Operations/Report";
import { DateISOStringZ, DateRangeTypeZ } from "../types/date";
import type { BaseReportJsonOutput } from "./report-json-output.types";
import type { ReportMetadata } from "./sector-sales";


/**
 * Daily Sales Report Filters
 */
export const DailySalesFiltersZ = z.object({
  /** Staff filter (optional) */
  staffOID: EntityOIDZ.optional(),

  /** Station code */
  stationCode: z.string().optional(),

  /** Date type - booking date or departure date */
  dateType: z.enum(["booking-date", "departure-date"]).default("booking-date"),

  /** Date range type */
  dateRangeType: DateRangeTypeZ,

  /** Start date (for custom range) */
  startDate: DateISOStringZ.optional(),

  /** End date (for custom range) */
  endDate: DateISOStringZ.optional(),

  /** Product type filter */
  productType: z.enum(["git", "fit"]).optional(),

  /** Product code (optional) */
  productCode: z.string().optional(),

  /** Group by option - sector or salesman */
  groupBy: z.enum(["sector", "salesman"]).default("sector"),

  /** Sector group (optional) */
  sectorGroup: z.string().optional(),

  /** Sector filter (optional) */
  sectorOID: EntityOIDZ.optional(),

  /** Departments filter (optional) */
  departmentOID: EntityOIDZ.optional(),

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
  tenantOID: EntityOIDZ,
});

export type DailySalesFilters = z.infer<typeof DailySalesFiltersZ>;

/**
 * Daily Sales Report Row - RAW domain data for a single booking/sale
 */
export interface DailySalesReportRow {
  bookingDate: string;
  bookingCode: string;
  productType: "GIT" | "FIT";
  productCode: string;
  productName: string;
  departureDate?: string;
  paxCount: number;
  salesPerson?: string;
  sectorName?: string;
  departmentName?: string;
  totalAmount: number;
  depositPaid: number;
  balance: number;
  paymentStatus: string;
  currency: string;
}

/**
 * Daily Sales Report Data - RAW domain data structure
 */
export interface DailySalesReportData {
  rows: DailySalesReportRow[];
  summary: {
    totalBookings: number;
    totalPax: number;
    totalAmount: number;
    totalDeposit: number;
    totalBalance: number;
    byPaymentStatus: Record<string, {
      count: number;
      amount: number;
    }>;
    bySector?: Record<string, {
      count: number;
      amount: number;
    }>;
    bySalesPerson?: Record<string, {
      count: number;
      amount: number;
    }>;
  };
  filters: {
    dateRange: {
      start: string;
      end: string;
    };
    dateType: string;
    productType?: string;
    productCode?: string;
    groupBy: string;
    paymentBalance: string;
    staff?: string;
    sector?: string;
    department?: string;
  };
  tenant: {
    name: string;
  };
  generatedAt: string;
}

export interface DailySalesReportJsonMetadata {
  staffOID?: string;
  dateType: string;
  productType?: string;
  groupBy: string;
  totalBookings: number;
  totalAmount: number;
}

/**
 * Daily Sales Report JSON Output - for JSON export format
 */
export interface DailySalesReportJsonOutput {
  report: {
    name: string;
    generatedAt: string;
    totalRows: number;
  };
  metadata: DailySalesReportJsonMetadata;
  data: DailySalesReportData;
}

export const DailySalesReportMetadata: ReportMetadata = {
  id: "daily-sales-report",
  slug: "daily-sales-report",
  name: "Daily Sales Report",
  description: "Generates daily sales breakdown by staff, sector, or salesman, with payment status filtering.",
  supportedFormats: [ReportFormat.XLSX, ReportFormat.CSV, ReportFormat.JSON, ReportFormat.PDF],
  supportsWebView: true,
};
