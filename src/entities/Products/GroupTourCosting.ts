import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { EntityZ } from "../entity";
import { CalculationBasis, CostingItemCategory, OccupancyType, PackageType } from "../Settings/Product/CostingItem";


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
  groupTourCostingOID: z.string(),

  // Copy from CostingItem
  name: z.string(),
  category: z.nativeEnum(CostingItemCategory),
  calculationBasis: z.nativeEnum(CalculationBasis),
  applyToPackageType: z.nativeEnum(PackageType),
  applyToOccupancyType: z.nativeEnum(OccupancyType),

  remarks: z.string().optional(),

  quantity: z.number(),

  isTieredPrice: z.boolean(),
  currency: z.string(),

  prices: z.array(z.object({
    tierIndex: z.number().optional(), // Optional for non-tiered prices
    amount: z.number(),
    tax: z.number(),
  })).min(1),

  // budget fields - start
  originalEntryOID: z.string().optional(),
  forexRate: z.number().optional(),
  localCurrency: z.string().optional(),
  localAmount: z.number().optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  paidAmount: z.number().optional(),
  // budget fields - end
});


export const GroupTourCostingZ = EntityZ.extend({
  groupTourProductOID: z.string(),

  templateOID: z.string(),
  name: z.string(),
  code: z.string(),

  remarks: z.string(),

  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,

  landTourGroupSizeTiers: z.array(z.object({
    from: z.number(),
    to: z.number(),
  })).min(1),

  freeOfChargeTiers: z.array(z.object({
    pax: z.number(),
    freePax: z.number(),
  })).optional(),

  leadManagerCountTiers: z.array(z.object({
    pax: z.number(),
    leadCount: z.number(),
    managerCount: z.number(),
  })).optional(),

  groupTourCostingEntries: z.array(GroupTourCostingEntryZ),

  isActive: z.boolean(),

  airlineOIDs: z.array(z.string()).optional(), // ???

  // budget fields - start
  budgetOID: z.string().optional(),
  originalGroupTourCostingOID: z.string().optional(),
  // budget fields - end
});

export type GroupTourCosting = z.infer<typeof GroupTourCostingZ>;
export type GroupTourCostingEntry = z.infer<typeof GroupTourCostingEntryZ>;
