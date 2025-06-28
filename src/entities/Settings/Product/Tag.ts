import { z } from "zod";

import { FTFSafeMaxNumberZ } from "../../../types/number";
import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum TagEvents {
  TAG_UPDATED = "TAG_UPDATED",
  TAG_LIST_UPDATED = "TAG_LIST_UPDATED",
}


export const TagStyleZ = z.object({
  textColor: z.string(),
  backgroundColor: z.string(),
  borderColor: z.string(),
});

export type TagStyle = z.infer<typeof TagStyleZ>;

export const TagGroupZ = EntityZ.extend({
  entityType: z.literal(EntityType.TAG_GROUP),

  name: z.string(),

  tagOIDs: z.array(EntityOIDZ),

});

export type TagGroup = z.infer<typeof TagGroupZ>;

export const TagZ = EntityZ.extend({
  entityType: z.literal(EntityType.TAG),

  name: z.string(),
  isActive: z.boolean(),
  sortOrder: FTFSafeMaxNumberZ({ name: "Sort order" }).int(),
  style: TagStyleZ,

  tagGroupOID: EntityOIDZ,
});

export type Tag = z.infer<typeof TagZ>;
