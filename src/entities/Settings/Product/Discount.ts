import { z } from "zod";

import { DateISOStringZ } from "../../../types/date"; // Assuming path
import { EntityZ } from "../../entity"; // Correct import name and path
import { EntityType } from "../../entityType"; // Correct path

// Socket Events
export enum DiscountEvents {
  DISCOUNT_LIST_UPDATED = "DISCOUNT_LIST_UPDATED",
  DISCOUNT_UPDATED = "DISCOUNT_UPDATED",
}

// Enums defined in the schema
export const DiscountStatusZ = z.enum(["Active", "Inactive"]);
export const DiscountBookingChannelZ = z.enum(["Web", "iPad", "App"]);
export const DiscountMechanicsZ = z.enum(["Per Room", "Per Booking"]);
export const DiscountTypeZ = z.enum(["Air Ticket", "Land Tour", "Full Tour"]);
export const DiscountBasePriceZ = z.enum(["Net Price", "Gross Price"]);
export const DiscountModeZ = z.enum(["Percentage", "Fixed Amount", "Fixed Price", "Free Gift"]);
export const DiscountWhichPaxZ = z.enum(["1st", "2nd", "3rd", "4th", "5th", "6th", "N/A"]);
export const DiscountPaxTypeZ = z.enum(["Adult", "Child", "Child w/Bed", "Child No Bed", "All Pax", "N/A"]);
export const DiscountAmountTypeZ = z.enum(["LimitedSingle", "LimitedRange", "Unlimited"]);
export const DiscountSpecialDatesTypeZ = z.enum(["Specific Date Range", "N/A"]);
export const DiscountTimeslotTypeZ = z.enum(["Specific Hours", "N/A"]);
export const DiscountHowToApplyZ = z.enum(["Manually Tick", "Manually Input", "Auto"]);

// Extend EntityZ
export const DiscountZ = EntityZ.extend({
  entityType: z.literal(EntityType.DISCOUNT).default(EntityType.DISCOUNT), // Override entityType
  discountCode: z.string().max(20),
  discountName: z.string(),
  description: z.string().nullable().optional(),
  validityStartDate: DateISOStringZ, // Use DateISOStringZ
  validityEndDate: DateISOStringZ, // Use DateISOStringZ
  status: DiscountStatusZ.default("Inactive"),
  bookingChannel: DiscountBookingChannelZ,
  discountMechanics: DiscountMechanicsZ,
  discountType: DiscountTypeZ,
  basePrice: DiscountBasePriceZ,
  discountMode: DiscountModeZ,
  applyWithTierDiscounts: z.boolean().default(false),
  applyWithOtherDiscounts: z.boolean().default(false),
  whichPax: DiscountWhichPaxZ.default("N/A"),
  paxType: DiscountPaxTypeZ.default("N/A"),
  minPax: z.number().int().min(0).default(0),
  minSpending: z.number().min(0).default(0),
  amountType: DiscountAmountTypeZ.default("Unlimited"),
  amountValue: z.number().int().nullable().optional(),
  amountRangeStart: z.number().int().nullable().optional(),
  amountRangeEnd: z.number().int().nullable().optional(),
  specialDatesType: DiscountSpecialDatesTypeZ.default("N/A"),
  specialDatesStart: DateISOStringZ.nullable().optional(), // Use DateISOStringZ
  specialDatesEnd: DateISOStringZ.nullable().optional(), // Use DateISOStringZ
  timeslotType: DiscountTimeslotTypeZ.default("N/A"),
  timeslotStart: z.string().nullable().optional(), // Keep as string for TIME HH:MM:SS
  timeslotEnd: z.string().nullable().optional(), // Keep as string for TIME HH:MM:SS
  discountValue: z.number().default(0),
  howToApply: DiscountHowToApplyZ.default("Auto"),
  useDiscountCode: z.boolean().default(false),
  // Many-to-many relationships - Use UUIDs as per SQL junction tables
  sectorIds: z.array(z.string().uuid()).optional().default([]),
  productIds: z.array(z.string().uuid()).optional().default([]),
  tourIds: z.array(z.string().uuid()).optional().default([]),
});

export type Discount = z.infer<typeof DiscountZ>;
