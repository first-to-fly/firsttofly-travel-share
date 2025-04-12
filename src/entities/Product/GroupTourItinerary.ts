import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { EntityZ } from "../entity";


export enum MealType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
}


export const GroupTourItineraryMealZ = EntityZ.extend({
  type: z.nativeEnum(MealType),
  title: MultiLangRecordZ(z.string()),
  description: MultiLangRecordZ(z.string()),

  provided: z.boolean(),
  onBoard: z.boolean(),
  poiOID: z.string().optional(),
});


export const GroupTourItineraryEventZ = EntityZ.extend({
  title: MultiLangRecordZ(z.string()),
  description: MultiLangRecordZ(z.string()),

  poiOID: z.string().optional(),
});

export const GroupTourItineraryDayZ = EntityZ.extend({
  dayNumber: z.number(),
  title: MultiLangRecordZ(z.string()),
  description: MultiLangRecordZ(z.string()),

  groupTourItineraryMeals: z.array(GroupTourItineraryMealZ),
  groupTourItineraryEvents: z.array(GroupTourItineraryEventZ),
});


export const GroupTourItineraryZ = EntityZ.extend({
  groupTourProductOID: z.string(),

  name: z.string(),

  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,
  isActive: z.boolean(),

  groupTourItineraryDays: z.array(GroupTourItineraryDayZ),
});

export type GroupTourItinerary = z.infer<typeof GroupTourItineraryZ>;
export type GroupTourItineraryDay = z.infer<typeof GroupTourItineraryDayZ>;
export type GroupTourItineraryMeal = z.infer<typeof GroupTourItineraryMealZ>;
export type GroupTourItineraryEvent = z.infer<typeof GroupTourItineraryEventZ>;
