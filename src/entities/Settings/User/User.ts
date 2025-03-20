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

  departmentOID: z.string(),

  tourLeadingSkills: z.array(z.object({
    sectorOID: z.string(),
    termOID: z.string(),
    startYear: z.number(),
  })).optional(),

});


export type User = z.infer<typeof UserZ>;
