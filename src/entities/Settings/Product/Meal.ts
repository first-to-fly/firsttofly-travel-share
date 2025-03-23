import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export const MealZ = EntityZ.extend({
  entityType: z.literal(EntityType.MEAL),

  code: z.string(),
  description: z.string().optional(),
  type: z.enum(["Airline", "Land", "Cruise"]),
  seq: z.string().optional().default("0"),
  offlineOperator: z.string().optional(),
});

export type Meal = z.infer<typeof MealZ>;
