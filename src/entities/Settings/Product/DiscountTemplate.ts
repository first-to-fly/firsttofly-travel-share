import { z } from "zod";

import { DateISOStringZ } from "../../../types/date"; // Assuming path
import { EntityZ } from "../../entity"; // Correct path
import { EntityType } from "../../entityType"; // Correct path
import { DiscountAmountTypeZ, DiscountBasePriceZ, DiscountBookingChannelZ, DiscountHowToApplyZ, DiscountMechanicsZ, DiscountModeZ, DiscountPaxTypeZ, DiscountSpecialDatesTypeZ, DiscountTimeslotTypeZ, DiscountTypeZ, DiscountWhichPaxZ } from "./Discount";


// Socket Events
export enum DiscountTemplateEvents {
  DISCOUNT_TEMPLATE_LIST_UPDATED = "DISCOUNT_TEMPLATE_LIST_UPDATED",
  DISCOUNT_TEMPLATE_UPDATED = "DISCOUNT_TEMPLATE_UPDATED",
}


export const DiscountTemplateZ = EntityZ.extend({
  entityType: z.literal(EntityType.DISCOUNT_TEMPLATE).default(EntityType.DISCOUNT_TEMPLATE), // Override entityType
  templateName: z.string(),
  description: z.string().nullable().optional(),
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
});

export type DiscountTemplate = z.infer<typeof DiscountTemplateZ>;
