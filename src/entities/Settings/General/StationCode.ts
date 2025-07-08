import { z } from "zod";

import { FTFSafeMaxNumberZ } from "../../../types/number";
import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum StationCodeEvents {
  STATION_CODE_UPDATED = "STATION_CODE_UPDATED",
  STATION_CODE_LIST_UPDATED = "STATION_CODE_LIST_UPDATED",
}


export const StationCodeZ = EntityZ.extend({
  entityType: z.literal(EntityType.STATION_CODE),

  code: z.string().min(1, "Station code is required").max(50, "Station code must be 50 characters or less"),
  isActive: z.boolean().default(true),
  seq: FTFSafeMaxNumberZ({
    max: 99999999,
    name: "Sequence",
  }).int().nonnegative(),
});

export type StationCode = z.infer<typeof StationCodeZ>;
