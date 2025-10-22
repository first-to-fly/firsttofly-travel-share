// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export const CustomizedTourItineraryItemZ = EntityZ.extend({
  customizedTourItineraryDayOID: EntityOIDZ,
  category: z.string(),
  supplierOID: EntityOIDZ.nullish(),
  name: z.string(),
  details: z.record(z.string(), z.string()).nullish(),
  costEstimated: z.number().nullish(),
  priceQuoted: z.number().nullish(),
  costActual: z.number().nullish(),
  marginPercentage: z.number().nullish(),
  linkedCostItemOID: EntityOIDZ.nullish(),
});

export type CustomizedTourItineraryItem = z.infer<typeof CustomizedTourItineraryItemZ>;

export enum CustomizedTourItineraryItemEvents {
  CUSTOMIZED_TOUR_ITINERARY_ITEM_UPDATED = "CUSTOMIZED_TOUR_ITINERARY_ITEM_UPDATED",
  CUSTOMIZED_TOUR_ITINERARY_ITEM_LIST_UPDATED = "CUSTOMIZED_TOUR_ITINERARY_ITEM_LIST_UPDATED",
}
