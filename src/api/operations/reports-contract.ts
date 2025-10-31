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

export const ReportOutputFormatZ = z.enum(["xlsx", "csv", "pdf", "html", "json"]);
export type ReportOutputFormat = z.infer<typeof ReportOutputFormatZ>;

export const ReportExportPayloadZ = z.object({
  tenantOID: z.string(),
  filters: z.record(z.string(), z.unknown()).optional().default({}),
});
export type ReportExportPayload = z.infer<typeof ReportExportPayloadZ>;

export const ReportExportResponseZ = z.object({
  downloadURL: z.string(),
  expiresAt: z.string().optional(),
});
export type ReportExportResponse = z.infer<typeof ReportExportResponseZ>;

export enum ReportType {
  SECTOR_SALES = "sector-sales-report",
  DAILY_SALES = "daily-sales-report",
  TOUR_SALES = "tour-sales-report",
  RECEIPT_BANK_CARD = "receipt-bank-card-report",
  SETTLEMENT = "settlement-report",
  RECEIPT = "receipt-report",
  BOOKING_ADJUSTMENT = "booking-adjustment-report",
  TOUR_BOOKING_GST = "tour-booking-gst-report",
  MIN_DEPOSIT = "min-deposit-report",
  REFUND = "refund-report",
  DEPOSIT_RECONCILIATION = "deposit-reconciliation-report",
  PREPAYMENT = "prepayment-report",
  EO = "eo-report",
  BILL = "bill-report",
  SECTOR_SALES_YOY = "sector-sales-yoy-report",
  TL_TM_ASSIGNMENT = "tl-tm-assignment-report",
  OUTSTANDING_BOOKING = "outstanding-booking-report",
}

export const ReportTypeZ = z.nativeEnum(ReportType);

const basePath = "/api/reports";

export const reportsContract = c.router({
  export: {
    method: "POST",
    path: `${basePath}/:reportType/export`,
    summary: "Export a report",
    pathParams: z.object({
      reportType: ReportTypeZ,
    }),
    body: ReportExportPayloadZ.extend({
      format: ReportOutputFormatZ.default("xlsx"),
    }),
    responses: {
      200: ReportExportResponseZ,
    },
  },
});

export type ReportsContract = typeof reportsContract;
