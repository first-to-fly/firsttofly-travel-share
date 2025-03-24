import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum RoleEvents {
  ROLE_UPDATED = "role.updated",
  ROLE_LIST_UPDATED = "role.list.updated",
}

export const RoleZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROLE),
  permissions: z.array(z.string()),
});

export type Role = z.infer<typeof RoleZ>;
