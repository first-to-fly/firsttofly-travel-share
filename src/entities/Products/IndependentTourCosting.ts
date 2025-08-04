import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export const IndependentTourCostingZ = EntityZ.extend({
  entityType: z.literal(EntityType.INDEPENDENT_TOUR_COSTING),

  independentTourProductOID: z.string(),

  name: z.string(),
  code: z.string(),

  remarks: z.string().optional(),

  isActive: z.boolean(),
});

export type IndependentTourCosting = z.infer<typeof IndependentTourCostingZ>;
