import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum AccountCodeType {
  ASSET = "asset",
  LIABILITY = "liability",
  EQUITY = "equity",
  REVENUE = "revenue",
  EXPENSE = "expense",
  COST_OF_GOODS_SOLD = "cost-of-goods-sold",
  OTHER_INCOME = "other-income",
  OTHER_EXPENSE = "other-expense",
}

export enum AccountCodeStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}

export enum AccountCodeEvents {
  ACCOUNT_CODE_UPDATED = "ACCOUNT_CODE_UPDATED",
  ACCOUNT_CODE_LIST_UPDATED = "ACCOUNT_CODE_LIST_UPDATED",
}

export const AccountCodeZ = EntityZ.extend({
  entityType: z.literal(EntityType.ACCOUNT_CODE),
  code: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  type: z.nativeEnum(AccountCodeType),
  status: z.nativeEnum(AccountCodeStatus).default(AccountCodeStatus.ACTIVE),
  currency: z.string().nullish(),

  // No relation OIDs for AccountCode currently

  // Xero integration fields
  xeroAccountId: z.string().nullish(),
  xeroAccountCode: z.string().nullish(),
  xeroSyncStatus: z.string().nullish(),
  xeroSyncedAt: z.string().nullish(),

  // Additional metadata
  isSystemGenerated: z.boolean().default(false),
});


export type AccountCode = z.infer<typeof AccountCodeZ>;
