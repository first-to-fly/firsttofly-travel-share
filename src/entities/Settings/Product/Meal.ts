import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum MealType {
  AIRLINE = "airline",
  LAND = "land",
  CRUISE = "cruise",
}

export enum MealEvents {
  MEAL_UPDATED = "MEAL_UPDATED",
  MEAL_LIST_UPDATED = "MEAL_LIST_UPDATED",
}


export const MealZ = EntityZ.extend({
  entityType: z.literal(EntityType.MEAL),

  code: z.string(),
  description: z.string().optional(),
  type: z.nativeEnum(MealType),
  seq: z.number().optional().default(0),
  offlineOperator: z.string().optional(),
});

export type Meal = z.infer<typeof MealZ>;
