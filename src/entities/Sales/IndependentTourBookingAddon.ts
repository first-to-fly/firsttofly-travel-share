// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum IndependentTourBookingAddonType {
  OPTIONAL_SERVICE = "optional_service",
  MANUAL = "manual",
}

export const IndependentTourBookingAddonTypeZ = z.nativeEnum(IndependentTourBookingAddonType);

export const IndependentTourBookingAddonZ = EntityZ.extend({
  independentTourBookingOID: EntityOIDZ,
  independentTourOptionalServiceOID: EntityOIDZ.nullish(),

  type: IndependentTourBookingAddonTypeZ,
  serviceDate: z.string(), // ISO datetime string
  name: z.string(),
  unitPrice: z.number().positive(),
  tax: z.number().nullish(),
  quantity: z.number().int().positive(),
  totalPrice: z.number().positive(),

  supplierOID: EntityOIDZ.nullish(),
  notes: z.string().nullish(),
});

export type IndependentTourBookingAddon = z.infer<typeof IndependentTourBookingAddonZ>;

export enum IndependentTourBookingAddonEvents {
  INDEPENDENT_TOUR_BOOKING_ADDON_UPDATED = "INDEPENDENT_TOUR_BOOKING_ADDON_UPDATED",
  INDEPENDENT_TOUR_BOOKING_ADDON_LIST_UPDATED = "INDEPENDENT_TOUR_BOOKING_ADDON_LIST_UPDATED",
}
