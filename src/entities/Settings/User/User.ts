import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export const UserZ = EntityZ.extend({
  entityType: z.literal(EntityType.USER),

  email: z.string(),
  emailVerified: z.boolean(),
  displayName: z.string(),
  photoURL: z.string(),
  phoneNumber: z.string(),

  departmentID: z.string().uuid(),
});


export type User = z.infer<typeof UserZ>;
