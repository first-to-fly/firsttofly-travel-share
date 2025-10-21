// simple-import-sort
import { z } from "zod";

import { BookingPaymentStatus, BookingPaymentStatusZ, BookingStatus, BookingStatusZ } from "../../enums/BookingTypes";
import { ProductPlatform, ProductPlatformZ } from "../../types/platform";
import { DateISOStringZ, EntityOIDZ, EntityZ } from "../entity";
import { BaseBookingCustomerMetadataZ, BookingPaymentLinksMetadataZ, ITBTransferMetadataZ } from "./BookingMetadata";

// Inline metadata schemas for ITB
// Combines base customer info with ITB-specific transfer metadata fields
export const IndependentTourBookingMetadataZ = BaseBookingCustomerMetadataZ
  .merge(ITBTransferMetadataZ)
  .merge(BookingPaymentLinksMetadataZ);
export type IndependentTourBookingMetadata = z.infer<typeof IndependentTourBookingMetadataZ>;


export const IndependentTourBookingZ = EntityZ.extend({
  independentTourProductOID: EntityOIDZ,
  independentTourAccommodationOID: EntityOIDZ.nullish(),
  departmentOID: EntityOIDZ.nullish(),
  stationCodeOID: EntityOIDZ.nullish(), // Added station code OID
  tcpBookingOID: EntityOIDZ.nullish(),

  bookingReference: z.string().max(50),
  paymentStatus: BookingPaymentStatusZ.default(BookingPaymentStatus.UNPAID),
  bookingStatus: BookingStatusZ.default(BookingStatus.IN_PROGRESS),

  totalAmount: z.number(),
  receivedAmount: z.number().default(0),
  fullPaymentDueDate: z.string().nullable().nullish(),

  travelStartDate: DateISOStringZ.nullish(), // ISO datetime string
  travelEndDate: DateISOStringZ.nullish(), // ISO datetime string
  platform: ProductPlatformZ.default(ProductPlatform.B2C),
  isCustomerConfirmed: z.boolean().default(false),

  metadata: IndependentTourBookingMetadataZ.nullish(),
  specialInstructions: z.array(z.string()).nullish(),
  overwriteTax: z.object({
    scheme: z.string(),
    rate: z.number(),
  }).nullish(),
  overwriteDeposit: z.number().nullish(),
  saleStaffOID: EntityOIDZ.nullish(),
  saleReferrerOID: EntityOIDZ.nullish(),
  remarks: z.string().nullish(),
  insuranceDeclaration: z.string().nullish(),
});

export type IndependentTourBooking = z.infer<typeof IndependentTourBookingZ>;

export enum IndependentTourBookingEvents {
  INDEPENDENT_TOUR_BOOKING_UPDATED = "INDEPENDENT_TOUR_BOOKING_UPDATED",
  INDEPENDENT_TOUR_BOOKING_LIST_UPDATED = "INDEPENDENT_TOUR_BOOKING_LIST_UPDATED",
}
