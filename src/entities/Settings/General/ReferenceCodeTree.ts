import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum ReferenceCodeTreeEvents {
  UpdatedReferenceCodeTree = "updated_reference_code_tree",
  UpdatedReferenceCodeTrees = "updated_reference_code_trees",
  CreatedReferenceCodeTree = "created_reference_code_tree",
  DeletedReferenceCodeTree = "deleted_reference_code_tree",
  DeletedReferenceCodeTrees = "deleted_reference_code_trees",
}

const ReferenceCodeTreeEventValues = Object.values(ReferenceCodeTreeEvents);

export type ReferenceCodeTreeEvent = (typeof ReferenceCodeTreeEventValues)[number];

export const ReferenceCodeTreeZ = EntityZ.extend({
  name: z.string(),
  moduleId: z.number(),
  parentId: z.number().default(0),
  seq: z.number().default(0),
  createTime: z.date(),
  updateTime: z.date(),
  offlineOperator: z.string().nullable(),
});

export const ReferenceCodeTreeEntityType = EntityType.REFERENCE_CODE_TREE;

export type ReferenceCodeTree = z.infer<typeof ReferenceCodeTreeZ>;
