import { z } from "zod";

import { DateISOStringZ, EntityOIDZ, EntityZ } from "../entity";


export enum EnquiryProductType {
  GIT = "git",
  FIT = "fit",
  CRUISE = "cruise",
  CUSTOM = "custom",
  DAY_TOUR = "day_tour",
  OTHER = "other",
}

export const EnquiryProductTypeZ = z.nativeEnum(EnquiryProductType);

export enum EnquiryStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  CLOSED_WON = "closed_won",
  CLOSED_LOST = "closed_lost",
  REJECTED = "rejected",
}

export const EnquiryStatusZ = z.nativeEnum(EnquiryStatus);

export enum EnquiryChannel {
  ONLINE = "online",
  EMAIL = "email",
  PHONE = "phone",
  WALK_IN = "walk_in",
  PARTNER = "partner",
  OTHER = "other",
}

export const EnquiryChannelZ = z.nativeEnum(EnquiryChannel);

export const EnquiryOccupancyZ = z.object({
  adult: z.number().min(0),
  cwb: z.number().min(0).nullish(),
  cnb: z.number().min(0).nullish(),
  infant: z.number().min(0).nullish(),
});

export const EnquiryBudgetZ = z.object({
  amount: z.number().nonnegative(),
  currency: z.string().min(3).max(3),
});

export const EnquiryTravelPeriodZ = z.object({
  start: DateISOStringZ,
  end: DateISOStringZ,
});

export const EnquiryShortlistItemZ = z.object({
  productOID: EntityOIDZ,
  label: z.string().nullish(),
  productType: EnquiryProductTypeZ.nullish(),
});

export const EnquiryZ = EntityZ.extend({
  code: z.string().min(1),
  customerName: z.string().min(1),
  mobile: z.string().min(1),
  email: z.string().email().nullish(),
  enquiryChannel: EnquiryChannelZ,

  occupancy: EnquiryOccupancyZ,
  budget: EnquiryBudgetZ.nullish(),
  travelPeriod: EnquiryTravelPeriodZ.nullish(),
  destinations: z.array(z.string()),
  shortlistProductOIDs: z.array(EnquiryShortlistItemZ),

  notes: z.string().nullish(),
  status: EnquiryStatusZ,
  statusReason: z.string().nullish(),
});

export type Enquiry = z.infer<typeof EnquiryZ>;

export type EnquiryOccupancy = z.infer<typeof EnquiryOccupancyZ>;
export type EnquiryBudget = z.infer<typeof EnquiryBudgetZ>;
export type EnquiryTravelPeriod = z.infer<typeof EnquiryTravelPeriodZ>;
export type EnquiryShortlistItem = z.infer<typeof EnquiryShortlistItemZ>;

export enum EnquiryEvents {
  ENQUIRY_UPDATED = "ENQUIRY_UPDATED",
  ENQUIRY_LIST_UPDATED = "ENQUIRY_LIST_UPDATED",
}
