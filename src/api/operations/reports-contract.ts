import { initContract } from "@ts-rest/core";
import { z } from "zod";

import type {
  BookingAdjustmentFilters,
  DailySalesFilters,
  ReceiptBankCardFilters,
  ReceiptReportFilters,
  SectorSalesFilters,
  SettlementReportFilters,
  TourBookingGSTFilters,
  TourSalesFilters,
} from "../../reports";
import {
  BookingAdjustmentFiltersZ,
  DailySalesFiltersZ,
  ReceiptBankCardFiltersZ,
  ReceiptReportFiltersZ,
  SectorSalesFiltersZ,
  SettlementReportFiltersZ,
  TourBookingGSTFiltersZ,
  TourSalesFiltersZ,
} from "../../reports";


const c = initContract();

// Re-export report filter types for convenience
export type {
  BookingAdjustmentFilters,
  DailySalesFilters,
  ReceiptBankCardFilters,
  ReceiptReportFilters,
  SectorSalesFilters,
  SettlementReportFilters,
  TourBookingGSTFilters,
  TourSalesFilters,
};

// Re-export report filter schemas for convenience
export {
  BookingAdjustmentFiltersZ,
  DailySalesFiltersZ,
  ReceiptBankCardFiltersZ,
  ReceiptReportFiltersZ,
  SectorSalesFiltersZ,
  SettlementReportFiltersZ,
  TourBookingGSTFiltersZ,
  TourSalesFiltersZ,
};

export const ReportOutputFormatZ = z.enum(["web", "xlsx", "csv"]);
export type ReportOutputFormat = z.infer<typeof ReportOutputFormatZ>;

export const ReportQueryPayloadZ = z.object({
  tenantOID: z.string(),
  filters: z.record(z.string(), z.unknown()).optional().default({}),
  pagination: z.object({
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(500)
      .default(100),
  }).optional(),
});
export type ReportQueryPayload = z.infer<typeof ReportQueryPayloadZ>;

export const ReportQueryResponseZ = z.object({
  rows: z.array(z.record(z.string(), z.unknown())),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    totalRows: z.number().int().min(0),
  }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
export type ReportQueryResponse = z.infer<typeof ReportQueryResponseZ>;

export const ReportExportResponseZ = z.object({
  downloadURL: z.string(),
  expiresAt: z.string().optional(),
});
export type ReportExportResponse = z.infer<typeof ReportExportResponseZ>;

export const ReportSlugRequestMap = {
  "sector-sales-report": SectorSalesFiltersZ,
  "daily-sales-report": DailySalesFiltersZ,
  "tour-sales-report": TourSalesFiltersZ,
  "receipt-bank-card-report": ReceiptBankCardFiltersZ,
  "settlement-report": SettlementReportFiltersZ,
  "receipt-report": ReceiptReportFiltersZ,
  "booking-adjustment-report": BookingAdjustmentFiltersZ,
  "tour-booking-gst-report": TourBookingGSTFiltersZ,
} as const;
export type ReportSlug = keyof typeof ReportSlugRequestMap;
export type ReportSpecificRequest<Slug extends ReportSlug> = z.infer<(typeof ReportSlugRequestMap)[Slug]>;

const basePath = "/api/reports";

export const reportsContract = c.router({
  run: {
    method: "POST",
    path: `${basePath}/:slug/query`,
    summary: "Execute a report query",
    body: ReportQueryPayloadZ,
    responses: {
      200: ReportQueryResponseZ,
      501: z.object({ message: z.string() }),
    },
  },
  export: {
    method: "POST",
    path: `${basePath}/:slug/export`,
    summary: "Export a report",
    body: ReportQueryPayloadZ.extend({
      format: ReportOutputFormatZ.default("xlsx"),
    }),
    responses: {
      200: ReportExportResponseZ,
      501: z.object({ message: z.string() }),
    },
  },
});

export type ReportsContract = typeof reportsContract;
