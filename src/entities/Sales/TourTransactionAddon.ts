import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum TourTransactionAddonType {
  PRICING_ENTRY = "pricing_entry",
  MANUAL = "manual",
}

export const TourTransactionAddonTypeZ = z.nativeEnum(TourTransactionAddonType);

export const TourTransactionAddonZ = EntityZ.extend({
  tourTransactionOID: EntityOIDZ,
  type: TourTransactionAddonTypeZ,
  groupTourPricingOID: EntityOIDZ.optional(),
  groupTourCostingEntryOID: EntityOIDZ.optional(),
  name: z.string(),
  unitPrice: z.number(),
  tax: z.number().optional(),
  quantity: z.number(),
  totalPrice: z.number(),
  supplierOID: EntityOIDZ.optional(),
  notes: z.string().optional(),
});

export type TourTransactionAddon = z.infer<typeof TourTransactionAddonZ>;

export enum TourTransactionAddonEvents {
  TOUR_TRANSACTION_ADDON_UPDATED = "TOUR_TRANSACTION_ADDON_UPDATED",
  TOUR_TRANSACTION_ADDON_LIST_UPDATED = "TOUR_TRANSACTION_ADDON_LIST_UPDATED",
}
