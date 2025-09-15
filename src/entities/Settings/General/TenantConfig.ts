import { z } from "zod";

import { ProductPlatform } from "../../../types/platform";
import { EntityZ } from "../../entity";


export const TENANT_CONFIG_KEYS = {
  GIT_BOOKING_EXPECTED_CANCEL_TIME: "GIT_BOOKING_EXPECTED_CANCEL_TIME",
  BOOKING_EXTENSION_RULE: "BOOKING_EXTENSION_RULE",
} as const;

export type TenantConfigKey = keyof typeof TENANT_CONFIG_KEYS;
export type BookingExtensionRule = {
  balanceSeats: {
    op: "<" | ">" | "=" | "<=" | ">=";
    value: number;
  };

  requestSeats: {
    op: "<" | ">" | "=" | "<=" | ">=";
    value: number;
  };
  numExtendedTimes: number;
  // key is the remaining extended times, value is the extendable time
  remainingExtendedTimesToExtendableTime: {
    [remainingExtendedTimes: number]: {
      extendableTime: number;
      requireApproval: boolean;
    };
  };
};

export type TenantConfigTypes = {
  [TENANT_CONFIG_KEYS.GIT_BOOKING_EXPECTED_CANCEL_TIME]: Record<ProductPlatform, number>;
  [TENANT_CONFIG_KEYS.BOOKING_EXTENSION_RULE]: BookingExtensionRule[];
};

export const DEFAULT_TENANT_CONFIG_VALUES: TenantConfigTypes = {
  [TENANT_CONFIG_KEYS.GIT_BOOKING_EXPECTED_CANCEL_TIME]: {
    [ProductPlatform.SALESKIT]: 24 * 60 * 60 * 1000, // 24 hours in milliseconds (30 hours during Travel Fair)
    [ProductPlatform.B2B]: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds (configurable: 3/5/10 days)
    [ProductPlatform.B2C]: 30 * 60 * 1000, // 30 minutes in milliseconds
  },
  [TENANT_CONFIG_KEYS.BOOKING_EXTENSION_RULE]: [
    {
      balanceSeats: {
        op: ">=",
        value: 10,
      },
      requestSeats: {
        op: ">",
        value: 6,
      },

      numExtendedTimes: 1,
      remainingExtendedTimesToExtendableTime: {
        1: {
          requireApproval: true,
          extendableTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds}
        },
      },
    },
    {
      balanceSeats: {
        op: ">=",
        value: 10,
      },
      requestSeats: {
        op: "<=",
        value: 6,
      },
      numExtendedTimes: 2,
      remainingExtendedTimesToExtendableTime: {
        1: {
          extendableTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
          requireApproval: false,
        },
      },
    },
    {
      balanceSeats: {
        op: "<",
        value: 10,
      },
      requestSeats: {
        op: ">=",
        value: 4,
      },
      numExtendedTimes: 1,
      remainingExtendedTimesToExtendableTime: {
        1: {
          extendableTime: 12 * 60 * 60 * 1000, // 24 hours in milliseconds
          requireApproval: true,
        },
      },
    },
    {
      balanceSeats: {
        op: "<",
        value: 10,
      },
      requestSeats: {
        op: "<",
        value: 4,
      },
      numExtendedTimes: 1,
      remainingExtendedTimesToExtendableTime: {
        1: {
          extendableTime: 24 * 60 * 60 * 1000, // 12 hours in milliseconds
          requireApproval: false,
        },
      },
    },
  ],
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
