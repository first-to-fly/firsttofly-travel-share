import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum ReferenceCodeTreeEvents {
  REFERENCE_CODE_TREE_UPDATED = "REFERENCE_CODE_TREE_UPDATED",
  REFERENCE_CODE_TREE_LIST_UPDATED = "REFERENCE_CODE_TREE_LIST_UPDATED",
}

export const ReferenceCodeTreeZ = EntityZ.extend({
  entityType: z.literal(EntityType.REFERENCE_CODE_TREE),
  name: z.string(),
  moduleId: z.string(),
  parentId: z.string().optional(),
  seq: z.number().optional(),
});


export type ReferenceCodeTree = z.infer<typeof ReferenceCodeTreeZ>;
