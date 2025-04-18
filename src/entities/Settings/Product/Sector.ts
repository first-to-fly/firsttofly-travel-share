import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum SectorEvents {
  SECTOR_UPDATED = "SECTOR_UPDATED",
  SECTOR_LIST_UPDATED = "SECTOR_LIST_UPDATED",
}


export const SectorZ = EntityZ.extend({
  entityType: z.literal(EntityType.SECTOR),

  name: z.string(),
  isActive: z.boolean().default(true),
  images: z.array(z.string().url()).optional(),
  parentOID: z.string().optional(),

  isPopular: z.boolean().default(false),

  productTypeOIDs: z.array(z.string()).optional(),

  departmentOID: z.string().optional(),
});

export type Sector = z.infer<typeof SectorZ>;
