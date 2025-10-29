// simple-import-sort
import { z } from "zod";

import { NamedURLZ } from "../../types/url";
import { EntityOIDZ, EntityZ } from "../entity";


export const CustomizedTourItineraryDayZ = EntityZ.extend({
  customizedTourItineraryOID: EntityOIDZ,
  dayNumber: z.number().int().positive(),
  title: z.record(z.string(), z.string()).nullish(),
  description: z.record(z.string(), z.string()).nullish(),
  files: z.array(NamedURLZ).nullish(),
  internalRemarks: z.array(z.string()).nullish(),
  externalRemarks: z.array(z.string()).nullish(),
  itineraryItemOIDs: z.array(EntityOIDZ).nullish(),
});

export type CustomizedTourItineraryDay = z.infer<typeof CustomizedTourItineraryDayZ>;

export enum CustomizedTourItineraryDayEvents {
  CUSTOMIZED_TOUR_ITINERARY_DAY_UPDATED = "CUSTOMIZED_TOUR_ITINERARY_DAY_UPDATED",
  CUSTOMIZED_TOUR_ITINERARY_DAY_LIST_UPDATED = "CUSTOMIZED_TOUR_ITINERARY_DAY_LIST_UPDATED",
}
