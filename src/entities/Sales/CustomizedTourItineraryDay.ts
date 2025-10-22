// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export const CustomizedTourItineraryDayZ = EntityZ.extend({
  customizedTourItineraryOID: EntityOIDZ,
  dayNumber: z.number().int().positive(),
  title: z.record(z.string(), z.string()).nullish(),
  description: z.record(z.string(), z.string()).nullish(),
  files: z.array(z.object({
    name: z.string(),
    url: z.string(),
  })).nullish(),
});

export type CustomizedTourItineraryDay = z.infer<typeof CustomizedTourItineraryDayZ>;

export enum CustomizedTourItineraryDayEvents {
  CUSTOMIZED_TOUR_ITINERARY_DAY_UPDATED = "CUSTOMIZED_TOUR_ITINERARY_DAY_UPDATED",
  CUSTOMIZED_TOUR_ITINERARY_DAY_LIST_UPDATED = "CUSTOMIZED_TOUR_ITINERARY_DAY_LIST_UPDATED",
}
