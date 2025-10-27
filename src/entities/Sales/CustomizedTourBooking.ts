// simple-import-sort
import { z } from "zod";

import { BookingPaymentStatus } from "../../enums/BookingTypes";
import { EntityOIDZ, EntityZ } from "../entity";
import { BaseBookingCustomerMetadataZ, BookingPaymentLinksMetadataZ } from "./BookingMetadata";


export enum CustomizedTourBookingStatus {
  DRAFT = "draft",
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}


export const CustomizedTourBookingMetadataZ = BaseBookingCustomerMetadataZ.merge(BookingPaymentLinksMetadataZ);
export type CustomizedTourBookingMetadata = z.infer<typeof CustomizedTourBookingMetadataZ>;


export const CustomizedTourBookingZ = EntityZ.extend({
  departmentOID: EntityOIDZ.nullish(),
  stationCodeOID: EntityOIDZ.nullish(),
  saleStaffOID: EntityOIDZ.nullish(),
  saleReferrerOID: EntityOIDZ.nullish(),
  bookingReference: z.string().max(50),
  status: z.nativeEnum(CustomizedTourBookingStatus),
  paymentStatus: z.nativeEnum(BookingPaymentStatus),
  overwriteDeposit: z.number().nullish(),
  expectedCancelTime: z.string().datetime().nullish(),
  specialInstructions: z.array(z.string()).nullish(),
  insuranceDeclaration: z.string().nullish(),
  remarks: z.string().nullish(),
  isCustomerConfirmed: z.boolean().default(false),
  customerConfirmedAt: z.string().datetime().nullish(),
  paymentOrderOID: EntityOIDZ.nullish(),
  budgetOID: EntityOIDZ.nullish(),
  totalAmount: z.number().nullish(),
  receivedAmount: z.number().nullish(),
  metadata: CustomizedTourBookingMetadataZ.nullish(),
});

export type CustomizedTourBooking = z.infer<typeof CustomizedTourBookingZ>;

export enum CustomizedTourBookingEvents {
  CUSTOMIZED_TOUR_BOOKING_UPDATED = "CUSTOMIZED_TOUR_BOOKING_UPDATED",
  CUSTOMIZED_TOUR_BOOKING_LIST_UPDATED = "CUSTOMIZED_TOUR_BOOKING_LIST_UPDATED",
}
