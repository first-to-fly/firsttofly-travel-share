// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export const IndependentTourBookingAddonZ = EntityZ.extend({
  independentTourBookingOID: EntityOIDZ,
  independentTourOptionalServiceOID: EntityOIDZ.optional(),

  type: z.enum(["optional_service", "manual"]),
  serviceDate: z.string(), // ISO datetime string
  name: z.string(),
  unitPrice: z.number().positive(),
  tax: z.number().optional(),
  quantity: z.number().int().positive(),
  totalPrice: z.number().positive(),

  supplierOID: EntityOIDZ.optional(),
  notes: z.string().optional(),
});

export type IndependentTourBookingAddon = z.infer<typeof IndependentTourBookingAddonZ>;

export enum IndependentTourBookingAddonEvents {
  INDEPENDENT_TOUR_BOOKING_ADDON_UPDATED = "INDEPENDENT_TOUR_BOOKING_ADDON_UPDATED",
  INDEPENDENT_TOUR_BOOKING_ADDON_LIST_UPDATED = "INDEPENDENT_TOUR_BOOKING_ADDON_LIST_UPDATED",
}
