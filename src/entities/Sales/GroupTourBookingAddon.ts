import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum GroupTourBookingAddonType {
  PRICING_ENTRY = "pricing_entry",
  MANUAL = "manual",
}

export const GroupTourBookingAddonTypeZ = z.nativeEnum(GroupTourBookingAddonType);

export const GroupTourBookingAddonZ = EntityZ.extend({
  bookingOID: EntityOIDZ,
  type: GroupTourBookingAddonTypeZ,
  groupTourPricingOID: EntityOIDZ.nullish(),
  groupTourCostingEntryOID: EntityOIDZ.nullish(),
  name: z.string(),
  unitPrice: z.number(),
  tax: z.number().nullish(),
  quantity: z.number(),
  totalPrice: z.number(),
  supplierOID: EntityOIDZ.nullish(),
  notes: z.string().nullish(),
});

export type GroupTourBookingAddon = z.infer<typeof GroupTourBookingAddonZ>;

export enum GroupTourBookingAddonEvents {
  GROUP_TOUR_BOOKING_ADDON_UPDATED = "GROUP_TOUR_BOOKING_ADDON_UPDATED",
  GROUP_TOUR_BOOKING_ADDON_LIST_UPDATED = "GROUP_TOUR_BOOKING_ADDON_LIST_UPDATED",
}
