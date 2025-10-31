// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum CustomizedTourCostItemCategory {
  GENERAL = "general",
  ACCOMMODATION = "accommodation",
  TRANSPORTATION = "transportation",
  MEAL = "meal",
  ACTIVITY = "activity",
  SERVICE = "service",
  TICKET = "ticket",
  FEE = "fee",
  TAX = "tax",
  INSURANCE = "insurance",
  MISCELLANEOUS = "miscellaneous",
  OTHER = "other",
}

export enum CustomizedTourCostItemOrigin {
  AUTO = "auto",
  MANUAL = "manual",
}

export const CustomizedTourCostItemZ = EntityZ.extend({
  customizedTourBookingOID: EntityOIDZ,
  customizedTourItineraryItemOID: EntityOIDZ.nullish(),
  origin: z.nativeEnum(CustomizedTourCostItemOrigin),
  category: z.nativeEnum(CustomizedTourCostItemCategory),
  supplierOID: EntityOIDZ.nullish(),
  estCost: z.number().nullish(),
  quotedPrice: z.number().nullish(),
  actualCost: z.number().nullish(),
  margin: z.number().nullish(),
  overrideLocked: z.boolean(),
});

export type CustomizedTourCostItem = z.infer<typeof CustomizedTourCostItemZ>;

export enum CustomizedTourCostItemEvents {
  CUSTOMIZED_TOUR_COST_ITEM_UPDATED = "CUSTOMIZED_TOUR_COST_ITEM_UPDATED",
  CUSTOMIZED_TOUR_COST_ITEM_LIST_UPDATED = "CUSTOMIZED_TOUR_COST_ITEM_LIST_UPDATED",
}
