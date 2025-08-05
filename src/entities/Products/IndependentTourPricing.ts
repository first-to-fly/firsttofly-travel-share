import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export const IndependentTourPricingZ = EntityZ.extend({
  entityType: z.literal(EntityType.INDEPENDENT_TOUR_PRICING),

  independentTourProductOID: z.string(),
  independentTourCostingOID: z.string(),

  name: z.string(),
  code: z.string(),

  remarks: z.string().optional(),
  targetYieldPercentage: z.number(),

  isActive: z.boolean(),
});

export type IndependentTourPricing = z.infer<typeof IndependentTourPricingZ>;
