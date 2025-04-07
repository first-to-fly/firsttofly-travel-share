import { z } from "zod";

import { DateISOStringZ } from "../../../types/date"; // Assuming path
import { EntityZ } from "../../entity"; // Correct path
import { EntityType } from "../../entityType"; // Correct path
import { DiscountAmountType, DiscountBasePrice, DiscountBookingChannel, DiscountHowToApply, DiscountMechanics, DiscountMode, DiscountPaxType, DiscountSpecialDatesType, DiscountTimeslotType, DiscountType, DiscountWhichPax } from "./Discount";


// Socket Events
export enum DiscountTemplateEvents {
  DISCOUNT_TEMPLATE_LIST_UPDATED = "DISCOUNT_TEMPLATE_LIST_UPDATED",
  DISCOUNT_TEMPLATE_UPDATED = "DISCOUNT_TEMPLATE_UPDATED",
}


export const DiscountTemplateZ = EntityZ.extend({
  entityType: z.literal(EntityType.DISCOUNT_TEMPLATE).default(EntityType.DISCOUNT_TEMPLATE), // Override entityType
  templateName: z.string(),
  description: z.string().nullable().optional(),
  bookingChannel: z.nativeEnum(DiscountBookingChannel),
  discountMechanics: z.nativeEnum(DiscountMechanics),
  discountType: z.nativeEnum(DiscountType),
  basePrice: z.nativeEnum(DiscountBasePrice),
  discountMode: z.nativeEnum(DiscountMode),
  applyWithTierDiscounts: z.boolean().default(false),
  applyWithOtherDiscounts: z.boolean().default(false),
  whichPax: z.nativeEnum(DiscountWhichPax).default(DiscountWhichPax.NA),
  paxType: z.nativeEnum(DiscountPaxType).default(DiscountPaxType.NA),
  minPax: z.number().int().min(0).default(0),
  minSpending: z.number().min(0).default(0),
  amountType: z.nativeEnum(DiscountAmountType).default(DiscountAmountType.UNLIMITED),
  amountValue: z.number().int().nullable().optional(),
  amountRangeStart: z.number().int().nullable().optional(),
  amountRangeEnd: z.number().int().nullable().optional(),
  specialDatesType: z.nativeEnum(DiscountSpecialDatesType).default(DiscountSpecialDatesType.NA),
  specialDatesStart: DateISOStringZ.nullable().optional(), // Use DateISOStringZ
  specialDatesEnd: DateISOStringZ.nullable().optional(), // Use DateISOStringZ
  timeslotType: z.nativeEnum(DiscountTimeslotType).default(DiscountTimeslotType.NA),
  timeslotStart: z.string().nullable().optional(), // Keep as string for TIME HH:MM:SS
  timeslotEnd: z.string().nullable().optional(), // Keep as string for TIME HH:MM:SS
  discountValue: z.number().default(0),
  howToApply: z.nativeEnum(DiscountHowToApply).default(DiscountHowToApply.AUTO),
  useDiscountCode: z.boolean().default(false),
});

export type DiscountTemplate = z.infer<typeof DiscountTemplateZ>;
