import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { FTFSafeMaxNumberZ } from "../../types/number";
import { EntityZ } from "../entity";


export enum GroupTourItineraryEvents {
  GROUP_TOUR_ITINERARY_UPDATED = "GROUP_TOUR_ITINERARY_UPDATED",
  GROUP_TOUR_ITINERARY_LIST_UPDATED = "GROUP_TOUR_ITINERARY_LIST_UPDATED",
}


export enum MealType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
}


export const GroupTourItineraryMealZ = EntityZ.omit({
  tenantOID: true,
}).extend({
  groupTourItineraryDayOID: z.string(),

  type: z.nativeEnum(MealType),
  title: MultiLangRecordZ(z.string()),
  description: MultiLangRecordZ(z.string()),

  provided: z.boolean(),
  onBoard: z.boolean(),
  poiOID: z.string().optional(),
});


export const GroupTourItineraryEventZ = EntityZ.omit({
  tenantOID: true,
}).extend({
  groupTourItineraryDayOID: z.string(),

  title: MultiLangRecordZ(z.string()),
  description: MultiLangRecordZ(z.string()),

  poiOID: z.string().optional(),
});

export const GroupTourItineraryDayZ = EntityZ.omit({
  tenantOID: true,
}).extend({
  groupTourItineraryOID: z.string(),

  dayNumber: FTFSafeMaxNumberZ({ name: "Day number" }).int().nonnegative(),
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
