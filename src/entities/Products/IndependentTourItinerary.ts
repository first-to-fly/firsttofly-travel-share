import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { FTFSafeMaxNumberZ } from "../../types/number";
import { NamedURLZ } from "../../types/url";
import { EntityOIDZ, EntityZ } from "../entity";


export enum IndependentTourItineraryEvents {
  INDEPENDENT_TOUR_ITINERARY_UPDATED = "INDEPENDENT_TOUR_ITINERARY_UPDATED",
  INDEPENDENT_TOUR_ITINERARY_LIST_UPDATED = "INDEPENDENT_TOUR_ITINERARY_LIST_UPDATED",
}


export enum MealType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACK = "snack",
}


export const IndependentTourItineraryMealZ = EntityZ.omit({
  tenantOID: true,
}).extend({
  independentTourItineraryDayOID: EntityOIDZ,

  type: z.nativeEnum(MealType),
  title: MultiLangRecordZ(z.string()),
  description: MultiLangRecordZ(z.string()),

  provided: z.boolean(),
  onBoard: z.boolean(),
  poiOID: EntityOIDZ.nullish(),
});


export const IndependentTourItineraryEventZ = EntityZ.omit({
  tenantOID: true,
}).extend({
  independentTourItineraryDayOID: EntityOIDZ,

  title: MultiLangRecordZ(z.string()),
  description: MultiLangRecordZ(z.string()),

  poiOID: EntityOIDZ.nullish(),
  seq: FTFSafeMaxNumberZ({ name: "Sequence" }).int().nonnegative(),
});

export const IndependentTourItineraryDayZ = EntityZ.omit({
  tenantOID: true,
}).extend({
  independentTourItineraryOID: EntityOIDZ,

  dayNumber: FTFSafeMaxNumberZ({ name: "Day number" }).int().nonnegative(),
  title: MultiLangRecordZ(z.string()),
  description: MultiLangRecordZ(z.string()),

  files: z.array(NamedURLZ).nullish(),

  independentTourItineraryMeals: z.array(IndependentTourItineraryMealZ).nullish(),
  independentTourItineraryEvents: z.array(IndependentTourItineraryEventZ).nullish(),
});


export const IndependentTourItineraryZ = EntityZ.extend({
  independentTourProductOID: EntityOIDZ,

  name: z.string(),

  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,

  pdfs: MultiLangRecordZ(z.array(z.object({
    active: z.boolean(),
    file: NamedURLZ,
    updatedAt: z.string(),
  }))).nullish(),

  independentTourItineraryDays: z.array(IndependentTourItineraryDayZ).nullish(),
});

export type IndependentTourItinerary = z.infer<typeof IndependentTourItineraryZ>;
export type IndependentTourItineraryDay = z.infer<typeof IndependentTourItineraryDayZ>;
export type IndependentTourItineraryMeal = z.infer<typeof IndependentTourItineraryMealZ>;
export type IndependentTourItineraryEvent = z.infer<typeof IndependentTourItineraryEventZ>;
