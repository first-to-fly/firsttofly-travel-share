import { z } from "zod";

import { DateISOStringZ } from "../../../types/date"; // Assuming path
import { FTFSafeMaxNumberZ } from "../../../types/number";
import { EntityZ } from "../../entity"; // Correct path
import { EntityType } from "../../entityType"; // Correct path
import { DiscountAmountType, DiscountBasePrice, DiscountBookingChannel, DiscountHowToApply, DiscountMechanics, DiscountMode, DiscountPaxType, DiscountSpecialDatesType, DiscountTimeslotType, DiscountType, DiscountWhichPax } from "./Discount";


// Socket Events
export enum DiscountTemplateEvents {
  DISCOUNT_TEMPLATE_LIST_UPDATED = "DISCOUNT_TEMPLATE_LIST_UPDATED",
  DISCOUNT_TEMPLATE_UPDATED = "DISCOUNT_TEMPLATE_UPDATED",
}


export const DiscountTemplateZ = EntityZ.extend({
  entityType: z.literal(EntityType.DISCOUNT_TEMPLATE),

  templateName: z.string(),
  description: z.string().optional(),

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
  amountValue: FTFSafeMaxNumberZ({ name: "Amount value" }).int().optional(),
  amountRangeStart: FTFSafeMaxNumberZ({ name: "Amount range start" }).int().optional(),
  amountRangeEnd: FTFSafeMaxNumberZ({ name: "Amount range end" }).int().optional(),

  specialDatesType: z.nativeEnum(DiscountSpecialDatesType).default(DiscountSpecialDatesType.NA),
  specialDatesStart: DateISOStringZ.optional(),
  specialDatesEnd: DateISOStringZ.optional(),

  timeslotType: z.nativeEnum(DiscountTimeslotType).default(DiscountTimeslotType.NA),
  timeslotStart: z.string().optional().refine((val) => val === "" || val === null || val === undefined || /^\d{2}:\d{2}$/.test(val), {
    message: "Timeslot must be in 'HH:MM' format",
  }),
  timeslotEnd: z.string().optional().refine((val) => val === "" || val === null || val === undefined || /^\d{2}:\d{2}$/.test(val), {
    message: "Timeslot must be in 'HH:MM' format",
  }),
  timeslotTimezone: z.string().optional(),

  discountValue: FTFSafeMaxNumberZ({ name: "Discount value" }).int().nonnegative().default(0),
  howToApply: z.nativeEnum(DiscountHowToApply).default(DiscountHowToApply.AUTO),
  useDiscountCode: z.boolean().default(false),
});

export type DiscountTemplate = z.infer<typeof DiscountTemplateZ>;
