import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum BookingAddonType {
  PRICING_ENTRY = "pricing_entry",
  MANUAL = "manual",
}

export const BookingAddonTypeZ = z.nativeEnum(BookingAddonType);

export const BookingAddonZ = EntityZ.extend({
  bookingOID: EntityOIDZ,
  type: BookingAddonTypeZ,
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

export type BookingAddon = z.infer<typeof BookingAddonZ>;

export enum BookingAddonEvents {
  BOOKING_ADDON_UPDATED = "BOOKING_ADDON_UPDATED",
  BOOKING_ADDON_LIST_UPDATED = "BOOKING_ADDON_LIST_UPDATED",
}
