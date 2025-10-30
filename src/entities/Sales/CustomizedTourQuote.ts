// simple-import-sort
import { z } from "zod";

import { DateISOStringZ, EntityOIDZ, EntityZ } from "../entity";


export enum CustomizedTourQuoteStatus {
  DRAFT = "draft",
  SENT = "sent",
  ACCEPTED = "accepted",
  EXPIRED = "expired",
}

export enum CustomizedTourQuoteAdjustmentMode {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

export const CustomizedTourQuoteAdjustmentZ = z.object({
  value: z.number(),
  mode: z.nativeEnum(CustomizedTourQuoteAdjustmentMode),
});
export type CustomizedTourQuoteAdjustment = z.infer<typeof CustomizedTourQuoteAdjustmentZ>;

export const CustomizedTourQuoteDepositZ = z.object({
  amount: z.number(),
  dueDate: DateISOStringZ.nullish(),
});
export type CustomizedTourQuoteDeposit = z.infer<typeof CustomizedTourQuoteDepositZ>;

export const CustomizedTourQuotePaymentScheduleEntryZ = z.object({
  label: z.string(),
  dueDate: DateISOStringZ.nullish(),
  amount: z.number(),
  description: z.string().nullish(),
});
export type CustomizedTourQuotePaymentScheduleEntry = z.infer<typeof CustomizedTourQuotePaymentScheduleEntryZ>;

export const CustomizedTourQuotePaymentScheduleZ = z.array(CustomizedTourQuotePaymentScheduleEntryZ);
export type CustomizedTourQuotePaymentSchedule = z.infer<typeof CustomizedTourQuotePaymentScheduleZ>;


export const CustomizedTourQuoteZ = EntityZ.extend({
  customizedTourBookingOID: EntityOIDZ,
  code: z.string(),
  quoteDate: DateISOStringZ.nullish(),
  validUntil: DateISOStringZ.nullish(),
  status: z.nativeEnum(CustomizedTourQuoteStatus),
  currencyCode: z.string().min(3).max(3),
  tax: CustomizedTourQuoteAdjustmentZ.nullish(),
  discount: CustomizedTourQuoteAdjustmentZ.nullish(),
  deposit: CustomizedTourQuoteDepositZ.nullish(),
  finalPaymentDate: DateISOStringZ.nullish(),
  paymentMethods: z.array(z.string()).nullish(),
  paymentSchedule: CustomizedTourQuotePaymentScheduleZ.nullish(),
  termsInternal: z.string().nullish(),
  termsExternal: z.string().nullish(),
  notesInternal: z.string().nullish(),
  notesExternal: z.string().nullish(),
  sentAt: DateISOStringZ.nullish(),
  sentBy: z.string().nullish(),
  sentTo: z.array(z.string()).nullish(),
  acceptedAt: DateISOStringZ.nullish(),
  quotedCostItemOIDs: z.array(EntityOIDZ).nullish(),
});

export type CustomizedTourQuote = z.infer<typeof CustomizedTourQuoteZ>;

export enum CustomizedTourQuoteEvents {
  CUSTOMIZED_TOUR_QUOTE_UPDATED = "CUSTOMIZED_TOUR_QUOTE_UPDATED",
  CUSTOMIZED_TOUR_QUOTE_LIST_UPDATED = "CUSTOMIZED_TOUR_QUOTE_LIST_UPDATED",
}
