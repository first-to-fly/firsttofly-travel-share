import { EntityZ } from "entities/entity";
import { z } from "zod";


export const GroupTourPricingZ = EntityZ.extend({
  groupTourProductOID: z.string(),
  groupTourCostingOID: z.string(),
  name: z.string(),
  code: z.string(),
  remarks: z.string(),
  targetYieldPercentage: z.number(),
  validityStartDate: z.date(),
  validityEndDate: z.date(),
  isActive: z.boolean(),
});

export type GroupTourPricing = z.infer<typeof GroupTourPricingZ>;
