import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export const DepartmentZ = EntityZ.extend({
  entityType: z.literal(EntityType.DEPARTMENT),

  name: z.string().min(1, "Department name is required"),
  locationId: z.string().uuid(),
  parentDepartmentId: z.string().uuid().optional(),
  code: z.string(),
  isActive: z.boolean().default(true),
});

export type Department = z.infer<typeof DepartmentZ>;
