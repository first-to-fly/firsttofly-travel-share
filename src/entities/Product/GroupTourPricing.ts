import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { EntityZ } from "../entity";


export const GroupTourPricingZ = EntityZ.extend({
  groupTourProductOID: z.string(),
  groupTourCostingOID: z.string(),
  name: z.string(),
  code: z.string(),
  remarks: z.string(),
  targetYieldPercentage: z.number(),
  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,
  isActive: z.boolean(),
});

export type GroupTourPricing = z.infer<typeof GroupTourPricingZ>;
