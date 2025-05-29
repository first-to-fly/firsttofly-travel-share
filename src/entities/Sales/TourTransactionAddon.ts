import { z } from "zod";

import { EntityZ } from "../entity";


export enum TourTransactionAddonType {
  BUDGET_ENTRY = "budget_entry",
  MANUAL = "manual",
}

export const TourTransactionAddonTypeZ = z.nativeEnum(TourTransactionAddonType);

export const TourTransactionAddonZ = EntityZ.extend({
  tourTransactionOID: z.string(),
  type: TourTransactionAddonTypeZ,
  budgetItemOID: z.string().optional(),
  name: z.string(),
  unitPrice: z.number(),
  quantity: z.number(),
  totalPrice: z.number(),
  supplierOID: z.string().optional(),
  notes: z.string().optional(),
});

export type TourTransactionAddon = z.infer<typeof TourTransactionAddonZ>;

export enum TourTransactionAddonEvents {
  TOUR_TRANSACTION_ADDON_UPDATED = "TOUR_TRANSACTION_ADDON_UPDATED",
  TOUR_TRANSACTION_ADDON_LIST_UPDATED = "TOUR_TRANSACTION_ADDON_LIST_UPDATED",
}
