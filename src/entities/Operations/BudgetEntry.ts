import { z } from "zod";

import { FTFSafeMaxNumberZ } from "../../types/number";
import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { CalculationBasis, CostingItemCategory, OccupancyType, PackageType, QuantityMode } from "../Settings/Product/CostingItem";


export enum BudgetEntryEvents {
  BUDGET_ENTRY_UPDATED = "BUDGET_ENTRY_UPDATED",
  BUDGET_ENTRY_LIST_UPDATED = "BUDGET_ENTRY_LIST_UPDATED",
}

export const BudgetEntryZ = EntityZ.extend({
  entityType: z.literal(EntityType.BUDGET_ENTRY),

  budgetOID: EntityOIDZ,
  supplierOID: EntityOIDZ.nullish(),

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
    tierIndex: FTFSafeMaxNumberZ({ name: "Tier index" }).optional(),
    amount: FTFSafeMaxNumberZ({ name: "Amount" }),
    tax: FTFSafeMaxNumberZ({ name: "Tax" }),
  })).min(1),

  originalCostingEntryOID: EntityOIDZ.nullish(),
  forexRate: FTFSafeMaxNumberZ({ name: "Forex rate" }).nullish(),
  localCurrency: z.string().nullish(),
  localAmount: FTFSafeMaxNumberZ({ name: "Local amount" }).nullish(),
});

export type BudgetEntry = z.infer<typeof BudgetEntryZ>;
