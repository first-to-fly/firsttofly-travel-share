import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


// Cost value structure from design spec
const CostValueZ = z.object({
  currency: z.string(),
  amount: z.number(),
  tax: z.number().optional(),
});


export const IndependentTourOptionalServiceCostingZ = EntityZ.extend({
  entityType: z.literal(EntityType.INDEPENDENT_TOUR_OPTIONAL_SERVICE_COSTING),

  independentTourCostingOID: z.string(),

  name: z.string(),
  costValue: CostValueZ,
});

export type IndependentTourOptionalServiceCosting = z.infer<typeof IndependentTourOptionalServiceCostingZ>;
