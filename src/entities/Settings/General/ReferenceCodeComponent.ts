import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum ReferenceCodeComponentEvents {
  REFERENCE_CODE_COMPONENT_UPDATED = "REFERENCE_CODE_COMPONENT_UPDATED",
  REFERENCE_CODE_COMPONENT_LIST_UPDATED = "REFERENCE_CODE_COMPONENT_LIST_UPDATED",
}

export const ReferenceCodeComponentZ = EntityZ.extend({
  entityType: z.literal(EntityType.REFERENCE_CODE_COMPONENT),
  name: z.string(),
  code: z.string(),
  type: z.number(),
  seq: z.number().optional(),
  description: z.string().optional(),
});


export type ReferenceCodeComponent = z.infer<typeof ReferenceCodeComponentZ>;
