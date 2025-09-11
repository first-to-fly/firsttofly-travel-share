import { z } from "zod";

import { ProductType } from "../../../enums/ProductType";
import { EntityOIDZ, EntityZ } from "../../entity";


export enum DepositType {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

export const DepositZ = EntityZ.extend({

  name: z.string(),
  minDeposit: z.number(),
  type: z.nativeEnum(DepositType),
  remarks: z.string().nullish(),

  coveredEntityOIDs: z.array(EntityOIDZ),
  productTypes: z.array(z.nativeEnum(ProductType)).nullish(),

  isActive: z.boolean().default(true),
});

export type Deposit = z.infer<typeof DepositZ>;

export enum DepositEvents {
  DEPOSIT_UPDATED = "DEPOSIT_UPDATED",
  DEPOSIT_LIST_UPDATED = "DEPOSIT_LIST_UPDATED",
}
