import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export const UserIDZ = z.string();
export const UserOIDZ = z.string();
export const UserZ = EntityZ.pick({
  oid: true,
  entityType: true,
}).extend({
  entityType: z.literal(EntityType.USER),
  email: z.string(),
  emailVerified: z.boolean(),
  displayName: z.string(),
  photoURL: z.string(),
  phoneNumber: z.string(),
});


export type UserID = z.infer<typeof UserIDZ>;
export type UserOID = z.infer<typeof UserOIDZ>;
export type User = z.infer<typeof UserZ>;
