// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export const CustomizedTourItineraryZ = EntityZ.extend({
  customizedTourBookingOID: EntityOIDZ,
  name: z.string(),
  validityStartDate: z.string().datetime().nullish(),
  validityEndDate: z.string().datetime().nullish(),
  pdfs: z.record(z.string(), z.string()).nullish(),
});

export type CustomizedTourItinerary = z.infer<typeof CustomizedTourItineraryZ>;

export enum CustomizedTourItineraryEvents {
  CUSTOMIZED_TOUR_ITINERARY_UPDATED = "CUSTOMIZED_TOUR_ITINERARY_UPDATED",
  CUSTOMIZED_TOUR_ITINERARY_LIST_UPDATED = "CUSTOMIZED_TOUR_ITINERARY_LIST_UPDATED",
}
