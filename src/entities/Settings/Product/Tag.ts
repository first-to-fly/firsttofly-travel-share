import { EntityType } from "entities/entityType";
import { z } from "zod";

import { EntityZ } from "../../entity";


export const TagStyleZ = z.object({
  textColor: z.string(),
  backgroundColor: z.string(),
  borderColor: z.string(),
});

export type TagStyle = z.infer<typeof TagStyleZ>;

export const TagGroupZ = EntityZ.extend({
  entityType: z.literal(EntityType.TAG_GROUP),

  name: z.string(),

  tagIds: z.array(z.string().uuid()),

});

export type TagGroup = z.infer<typeof TagGroupZ>;

export const TagZ = EntityZ.extend({
  entityType: z.literal(EntityType.TAG),

  name: z.string(),
  isActive: z.boolean(),
  sortOrder: z.number().int(),
  style: TagStyleZ,

  tagGroupId: z.string().uuid(),
});

export type Tag = z.infer<typeof TagZ>;
