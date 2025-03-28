import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum SectorGroupEvents {
  SECTOR_GROUP_UPDATED = "SECTOR_GROUP_UPDATED",
  SECTOR_GROUP_LIST_UPDATED = "SECTOR_GROUP_LIST_UPDATED",
}


export const SectorGroupZ = EntityZ.extend({
  entityType: z.literal(EntityType.SECTOR_GROUP),

  name: z.string(),
  isActive: z.boolean().default(true),

  sectorOIDs: z.array(z.string()),
});

export type SectorGroup = z.infer<typeof SectorGroupZ>;
