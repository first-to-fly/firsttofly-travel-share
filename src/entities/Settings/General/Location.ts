import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum LocationType {
  ALL = "all",
  OFFICE = "office",
  QUEUE = "queue",
}

export enum LocationEvents {
  LOCATION_UPDATED = "LOCATION_UPDATED",
  LOCATION_LIST_UPDATED = "LOCATION_LIST_UPDATED",
}

export const LocationZ = EntityZ.extend({
  entityType: z.literal(EntityType.LOCATION),
  name: z.string(),
  description: z.string().optional(),
  type: z.nativeEnum(LocationType),
});


export type Location = z.infer<typeof LocationZ>;
