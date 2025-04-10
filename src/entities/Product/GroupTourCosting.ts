import { EntityZ } from "entities/entity";
import { z } from "zod";


export const GroupTourCostingZ = EntityZ.extend({
  groupTourProductOID: z.string(),
  templateOID: z.string(),
  name: z.string(),
  code: z.string(),
  remarks: z.string(),
  validityStartDate: z.date(),
  validityEndDate: z.date(),
  isActive: z.boolean(),
});

export type GroupTourCosting = z.infer<typeof GroupTourCostingZ>;
