import { ProductPlatform } from "../../../types/platform";


export const TENANT_CONFIG_KEYS = {
  GIT_BOOKING_EXPECTED_CANCEL_TIME: "GIT_BOOKING_EXPECTED_CANCEL_TIME",
} as const;

export type TenantConfigKey = keyof typeof TENANT_CONFIG_KEYS;

export type TenantConfigTypes = {
  [TENANT_CONFIG_KEYS.GIT_BOOKING_EXPECTED_CANCEL_TIME]: Record<ProductPlatform, number>;
};

export const DEFAULT_TENANT_CONFIG_VALUES: TenantConfigTypes = {
  [TENANT_CONFIG_KEYS.GIT_BOOKING_EXPECTED_CANCEL_TIME]: {
    [ProductPlatform.SALESKIT]: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    [ProductPlatform.B2B]: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    [ProductPlatform.B2C]: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  },
};