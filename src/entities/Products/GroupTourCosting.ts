import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { FTFSafeMaxNumberZ } from "../../types/number";
import { EntityOIDZ, EntityZ } from "../entity";
import { CalculationBasis, CostingItemCategory, OccupancyType, PackageType, QuantityMode } from "../Settings/Product/CostingItem";


export enum GroupTourCostingEvents {
  GROUP_TOUR_COSTING_UPDATED = "GROUP_TOUR_COSTING_UPDATED",
  GROUP_TOUR_COSTING_LIST_UPDATED = "GROUP_TOUR_COSTING_LIST_UPDATED",
}

export enum PaymentStatus {
  UNPAID = "unpaid",
  PARTIALLY_PAID = "partially-paid",
  PAID = "paid",
}


export const GroupTourCostingEntryZ = EntityZ.extend({
  groupTourCostingOID: EntityOIDZ,

  supplierOID: EntityOIDZ.nullish(),

  // Copy from CostingItem
  name: z.string(),
  category: z.nativeEnum(CostingItemCategory),
  calculationBasis: z.nativeEnum(CalculationBasis),
  applyToPackageType: z.nativeEnum(PackageType),
  applyToOccupancyType: z.nativeEnum(OccupancyType),

  remarks: z.string().nullish(),

  quantityMode: z.nativeEnum(QuantityMode).default(QuantityMode.AUTO),
  quantity: FTFSafeMaxNumberZ({ name: "Quantity" }),

  isTieredPrice: z.boolean(),
  currency: z.string(),

  prices: z.array(z.object({
    tierIndex: FTFSafeMaxNumberZ({ name: "Tier index" }).optional(), // Optional for non-tiered prices
    amount: FTFSafeMaxNumberZ({ name: "Amount" }),
    tax: FTFSafeMaxNumberZ({ name: "Tax" }),
  })).min(1),

});


export const GroupTourCostingZ = EntityZ.extend({
  groupTourProductOID: EntityOIDZ,

  templateOID: EntityOIDZ,
  name: z.string(),
  code: z.string(),

  remarks: z.string().nullish(),

  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,

  landTourGroupSizeTiers: z.array(z.object({
    from: FTFSafeMaxNumberZ({ name: "Group Size from" }),
    to: FTFSafeMaxNumberZ({ name: "Group Size to" }),
  })).min(1),

  freeOfChargeTiers: z.array(z.object({
    pax: FTFSafeMaxNumberZ({ name: "FOC Tier Pax" }),
    freePax: FTFSafeMaxNumberZ({ name: "FOC Tier Free Pax" }),
  })).nullish(),

  leadManagerCountTiers: z.array(z.object({
    pax: FTFSafeMaxNumberZ({ name: "Lead Manager Count per Pax" }),
    leadCount: FTFSafeMaxNumberZ({ name: "Lead Count" }),
    managerCount: FTFSafeMaxNumberZ({ name: "Manager Count" }),
  })).nullish(),

  groupTourCostingEntries: z.array(GroupTourCostingEntryZ),

  isActive: z.boolean(),

  airlineOIDs: z.array(EntityOIDZ).nullish(), // ???

});

export type GroupTourCosting = z.infer<typeof GroupTourCostingZ>;
export type GroupTourCostingEntry = z.infer<typeof GroupTourCostingEntryZ>;
