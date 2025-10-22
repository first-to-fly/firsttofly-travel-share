// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export const CustomizedTourCostItemZ = EntityZ.extend({
  customizedTourBookingOID: EntityOIDZ,
  customizedTourItineraryItemOID: EntityOIDZ.nullish(),
  category: z.string(),
  supplierOID: EntityOIDZ.nullish(),
  estCost: z.number().nullish(),
  quotedPrice: z.number().nullish(),
  actualCost: z.number().nullish(),
  margin: z.number().nullish(),
});

export type CustomizedTourCostItem = z.infer<typeof CustomizedTourCostItemZ>;

export enum CustomizedTourCostItemEvents {
  CUSTOMIZED_TOUR_COST_ITEM_UPDATED = "CUSTOMIZED_TOUR_COST_ITEM_UPDATED",
  CUSTOMIZED_TOUR_COST_ITEM_LIST_UPDATED = "CUSTOMIZED_TOUR_COST_ITEM_LIST_UPDATED",
}
