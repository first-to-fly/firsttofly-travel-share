import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export const TagStyleZ = z.object({
  textColor: z.string(),
  backgroundColor: z.string(),
  borderColor: z.string(),
});

export type TagStyle = z.infer<typeof TagStyleZ>;

export const TagGroupZ = EntityZ.extend({
  entityType: z.literal(EntityType.TAG_GROUP),

  name: z.string(),

  tagOIDs: z.array(z.string()),

});

export type TagGroup = z.infer<typeof TagGroupZ>;

export const TagZ = EntityZ.extend({
  entityType: z.literal(EntityType.TAG),

  name: z.string(),
  isActive: z.boolean(),
  sortOrder: z.number().int(),
  style: TagStyleZ,

  tagGroupOID: z.string(),
});

export type Tag = z.infer<typeof TagZ>;
