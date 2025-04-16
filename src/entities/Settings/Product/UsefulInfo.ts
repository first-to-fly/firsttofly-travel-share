import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum UsefulInfoEvents {
  USEFUL_INFO_UPDATED = "USEFUL_INFO_UPDATED",
  USEFUL_INFO_LIST_UPDATED = "USEFUL_INFO_LIST_UPDATED",
}

export const UsefulInfoZ = EntityZ.extend({
  entityType: z.literal(EntityType.USEFUL_INFO),

  name: z.string(),
  coverageType: z.enum(["sectors", "sector-group", "products"]),
  isActive: z.boolean().default(true),
  remarks: z.string().optional(),
  info: z.object({
    otherInfo: z.string().optional(),
    tipping: z.string().optional(),
    visa: z.string().optional(),
    weather: z.string().optional(),
    optionalTours: z.string().optional(),
  }).optional(),

  refOIDs: z.array(z.string()).optional(),
  productTypeOIDs: z.array(z.string()).optional(),
});

export type UsefulInfo = z.infer<typeof UsefulInfoZ>;
