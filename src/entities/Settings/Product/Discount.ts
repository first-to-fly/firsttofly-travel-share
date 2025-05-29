import { z } from "zod";

import { DateISOStringZ } from "../../../types/date"; // Assuming path
import { FTFSafeMaxNumberZ } from "../../../types/number";
import { EntityZ } from "../../entity"; // Correct import name and path
import { EntityType } from "../../entityType"; // Correct path

// Socket Events
export enum DiscountEvents {
  DISCOUNT_LIST_UPDATED = "DISCOUNT_LIST_UPDATED",
  DISCOUNT_UPDATED = "DISCOUNT_UPDATED",
}

export enum DiscountBookingChannel {
  WEB = "web",
  IPAD = "ipad",
  APP = "app",
}

export enum DiscountMechanics {
  PER_ROOM = "per-room",
  PER_BOOKING = "per-booking",
}

export enum DiscountType {
  AIR_TICKET = "air-ticket",
  LAND_TOUR = "land-tour",
  FULL_TOUR = "full-tour",
}

export enum DiscountBasePrice {
  NET_PRICE = "net-price",
  GROSS_PRICE = "gross-price",
}

export enum DiscountMode {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed-amount",
  FIXED_PRICE = "fixed-price",
  FREE_GIFT = "free-gift",
}

export enum DiscountWhichPax {
  FIRST = "1st",
  SECOND = "2nd",
  THIRD = "3rd",
  FOURTH = "4th",
  FIFTH = "5th",
  SIXTH = "6th",
  NA = "n/a",
}

export enum DiscountPaxType {
  ADULT = "adult",
  CHILD = "child",
  CHILD_WITH_BED = "child-with-bed",
  CHILD_NO_BED = "child-no-bed",
  ALL_PAX = "all-pax",
  NA = "n/a",
}

export enum DiscountAmountType {
  LIMITED_SINGLE = "limited-single",
  LIMITED_RANGE = "limited-range",
  UNLIMITED = "unlimited",
}

export enum DiscountSpecialDatesType {
  SPECIFIC_DATE_RANGE = "specific-date-range",
  NA = "n/a",
}

export enum DiscountTimeslotType {
  SPECIFIC_HOURS = "specific-hours",
  NA = "n/a",
}

export enum DiscountHowToApply {
  MANUALLY_TICK = "manually-tick",
  MANUALLY_INPUT = "manually-input",
  AUTO = "auto",
}

// Use z.nativeEnum with TypeScript enums
export const DiscountZ = EntityZ.extend({
  entityType: z.literal(EntityType.DISCOUNT),

  discountCode: z.string().max(20),
  discountName: z.string(),
  description: z.string().optional(),

  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,

  isActive: z.boolean(),

  bookingChannels: z.array(z.nativeEnum(DiscountBookingChannel)),
  discountMechanics: z.nativeEnum(DiscountMechanics),
  discountType: z.nativeEnum(DiscountType),
  basePrice: z.nativeEnum(DiscountBasePrice),
  discountMode: z.nativeEnum(DiscountMode),

  applyWithTierDiscounts: z.boolean().default(false),
  applyWithOtherDiscounts: z.boolean().default(false),

  whichPax: z.nativeEnum(DiscountWhichPax).default(DiscountWhichPax.NA),
  paxType: z.nativeEnum(DiscountPaxType).default(DiscountPaxType.NA),
  minPax: FTFSafeMaxNumberZ({ name: "Min pax" }).int().nonnegative().default(0),
  minSpending: FTFSafeMaxNumberZ({ name: "Min spending" }).int().nonnegative().default(0),

  amountType: z.nativeEnum(DiscountAmountType).default(DiscountAmountType.UNLIMITED),
  amountValue: FTFSafeMaxNumberZ({ name: "Amount value" }).int().nullable().optional(),
  amountRangeStart: FTFSafeMaxNumberZ({ name: "Amount range start" }).int().nullable().optional(),
  amountRangeEnd: FTFSafeMaxNumberZ({ name: "Amount range end" }).int().nullable().optional(),

  specialDatesType: z.nativeEnum(DiscountSpecialDatesType).default(DiscountSpecialDatesType.NA),
  specialDatesStart: DateISOStringZ.nullable().optional(),
  specialDatesEnd: DateISOStringZ.nullable().optional(),

  timeslotType: z.nativeEnum(DiscountTimeslotType).default(DiscountTimeslotType.NA),
  timeslotStart: DateISOStringZ.nullable().optional(),
  timeslotEnd: DateISOStringZ.nullable().optional(),

  discountValue: FTFSafeMaxNumberZ({ name: "Discount value" }).int().nonnegative().default(0),
  howToApply: z.nativeEnum(DiscountHowToApply).default(DiscountHowToApply.AUTO),
  useDiscountCode: z.boolean().default(false),

  sectorOIDs: z.array(z.string()).optional(),
  groupTourProductOIDs: z.array(z.string()).optional(),
  tourDepartureOIDs: z.array(z.string()).optional(),
});

export type Discount = z.infer<typeof DiscountZ>;
