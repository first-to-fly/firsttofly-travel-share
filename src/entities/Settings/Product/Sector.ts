import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export const SectorZ = EntityZ.extend({
  entityType: z.literal(EntityType.SECTOR),

  name: z.string(),
  isActive: z.boolean().default(true),
  images: z.array(z.string().url()).optional(),
  parentOID: z.string().uuid().optional(),

  isPopular: z.boolean().default(false),

  productTypeOIDs: z.array(z.string().uuid()).optional(),

});

export type Sector = z.infer<typeof SectorZ>;
