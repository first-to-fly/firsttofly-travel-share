import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum StationCodeEvents {
  STATION_CODE_UPDATED = "STATION_CODE_UPDATED",
  STATION_CODE_LIST_UPDATED = "STATION_CODE_LIST_UPDATED",
}


export const StationCodeZ = EntityZ.extend({
  entityType: z.literal(EntityType.STATION_CODE),

  code: z.string().min(1, "Station code is required"),
  isActive: z.boolean().default(true),
  seq: z.number().default(0),
});

export type StationCode = z.infer<typeof StationCodeZ>;
