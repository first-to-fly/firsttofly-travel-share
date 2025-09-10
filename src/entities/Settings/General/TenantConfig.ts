import { z } from "zod";

import { ProductPlatform } from "../../../types/platform";
import { EntityZ } from "../../entity";


export const TENANT_CONFIG_KEYS = {
  GIT_BOOKING_EXPECTED_CANCEL_TIME: "GIT_BOOKING_EXPECTED_CANCEL_TIME",
} as const;

export type TenantConfigKey = keyof typeof TENANT_CONFIG_KEYS;

export type TenantConfigTypes = {
  [TENANT_CONFIG_KEYS.GIT_BOOKING_EXPECTED_CANCEL_TIME]: Record<ProductPlatform, number>;
};

export const DEFAULT_TENANT_CONFIG_VALUES: TenantConfigTypes = {
  [TENANT_CONFIG_KEYS.GIT_BOOKING_EXPECTED_CANCEL_TIME]: {
    [ProductPlatform.SALESKIT]: 24 * 60 * 60 * 1000, // 24 hours in milliseconds (30 hours during Travel Fair)
    [ProductPlatform.B2B]: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds (configurable: 3/5/10 days)
    [ProductPlatform.B2C]: 30 * 60 * 1000, // 30 minutes in milliseconds
  },
};

export const TenantConfigZ = EntityZ.extend({
  tenantOID: z.string(),
  key: z.string(),
  configValue: z.unknown(),
});

export type TenantConfig = z.infer<typeof TenantConfigZ>;

export enum TenantConfigEvents {
  TENANT_CONFIG_UPDATED = "TENANT_CONFIG_UPDATED",
  TENANT_CONFIG_LIST_UPDATED = "TENANT_CONFIG_LIST_UPDATED",
}
