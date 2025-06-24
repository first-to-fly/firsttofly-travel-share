import { z } from "zod";

import { EntityZ } from "../../entity";


export enum DepositType {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

export const DepositZ = EntityZ.extend({

  name: z.string(),
  minDeposit: z.number(),
  type: z.nativeEnum(DepositType),
  remarks: z.string().optional(),

  coveredEntityOIDs: z.array(z.string()),
  productTypeOIDs: z.array(z.string()),

  isActive: z.boolean().default(true),
});

export type Deposit = z.infer<typeof DepositZ>;

export enum DepositEvents {
  DEPOSIT_UPDATED = "DEPOSIT_UPDATED",
  DEPOSIT_LIST_UPDATED = "DEPOSIT_LIST_UPDATED",
}
