import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum DepartmentEvents {
  DEPARTMENT_UPDATED = "DEPARTMENT_UPDATED",
  DEPARTMENT_LIST_UPDATED = "DEPARTMENT_LIST_UPDATED",
}


export const DepartmentZ = EntityZ.extend({
  entityType: z.literal(EntityType.DEPARTMENT),

  name: z.string().min(1, "Department name is required"),
  locationOID: z.string().uuid(),
  parentDepartmentOID: z.string().uuid().optional(),
  code: z.string(),
  isActive: z.boolean().default(true),
});

export type Department = z.infer<typeof DepartmentZ>;
