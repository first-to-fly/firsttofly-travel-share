// simple-import-sort
import { z } from "zod";

import { EntityZ } from "../entity";
// Corrected path

export enum TourTransactionPaymentStatus {
  UNPAID = "unpaid",
  PARTIAL_DEPOSIT = "partial_deposit",
  DEPOSIT_PAID = "deposit_paid",
  FULLY_PAID = "fully_paid",
}

export const TourTransactionPaymentStatusZ = z.nativeEnum(TourTransactionPaymentStatus);

export enum TourTransactionBookingStatus {
  IN_PROGRESS = "in_progress",
  UNPAID = "unpaid",
  DEPOSIT_PAID = "deposit_paid",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  VOIDED = "voided",
}

export const TourTransactionBookingStatusZ = z.nativeEnum(TourTransactionBookingStatus);

export const TourTransactionZ = EntityZ.extend({

  tourDepartureOID: z.string(),
  departmentOID: z.string().optional(),

  bookingReference: z.string().max(50),
  paymentStatus: TourTransactionPaymentStatusZ.default(TourTransactionPaymentStatus.UNPAID),
  bookingStatus: TourTransactionBookingStatusZ.default(TourTransactionBookingStatus.IN_PROGRESS),
  totalAmount: z.number(),
  receivedAmount: z.number().default(0),
  metadata: z.unknown().optional(),
  specialInstructions: z.array(z.string()).optional(),
});

export type TourTransaction = z.infer<typeof TourTransactionZ>;

export enum TourTransactionEvents {
  TOUR_TRANSACTION_UPDATED = "TOUR_TRANSACTION_UPDATED",
  TOUR_TRANSACTION_LIST_UPDATED = "TOUR_TRANSACTION_LIST_UPDATED",
}
