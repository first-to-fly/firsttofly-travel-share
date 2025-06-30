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

export type GroupTourBookingAddon = z.infer<typeof GroupTourBookingAddonZ>;

export enum GroupTourBookingAddonEvents {
  GROUP_TOUR_BOOKING_ADDON_UPDATED = "GROUP_TOUR_BOOKING_ADDON_UPDATED",
  GROUP_TOUR_BOOKING_ADDON_LIST_UPDATED = "GROUP_TOUR_BOOKING_ADDON_LIST_UPDATED",
}
