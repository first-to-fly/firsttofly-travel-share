import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum DesignationEvents {
  DESIGNATION_UPDATED = "DESIGNATION_UPDATED",
  DESIGNATION_LIST_UPDATED = "DESIGNATION_LIST_UPDATED",
}


export const DesignationZ = EntityZ.extend({
  entityType: z.literal(EntityType.DESIGNATION),

  name: z.string(),
  abbreviation: z.string(),
});

export type Designation = z.infer<typeof DesignationZ>;
