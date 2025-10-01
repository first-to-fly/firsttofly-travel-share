import { z } from "zod";

import { DateISOStringZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum TenantApiStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  REVOKED = "revoked",
}

export const TenantApiZ = EntityZ.extend({
  entityType: z.literal(EntityType.FTF_TENANT_API),
  name: z.string(),
  status: z.nativeEnum(TenantApiStatus).default(TenantApiStatus.ACTIVE),
  keyId: z.string(),
  secretMasked: z.string(),
  revokedAt: DateISOStringZ.optional(),
  lastUsedAt: DateISOStringZ.optional(),
  lastUsedIp: z.string().optional(),
});

export type TenantApi = z.infer<typeof TenantApiZ>;

export enum TenantApiEvents {
  TENANT_API_CREATED = "TENANT_API_CREATED",
  TENANT_API_UPDATED = "TENANT_API_UPDATED",
}
