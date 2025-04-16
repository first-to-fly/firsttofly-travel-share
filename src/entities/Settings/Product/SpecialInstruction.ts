import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum SpecialInstructionEvents {
  SPECIAL_INSTRUCTION_UPDATED = "SPECIAL_INSTRUCTION_UPDATED",
  SPECIAL_INSTRUCTION_LIST_UPDATED = "SPECIAL_INSTRUCTION_LIST_UPDATED",
}


export const SpecialInstructionZ = EntityZ.extend({
  entityType: z.literal(EntityType.SPECIAL_INSTRUCTION),

  isPrepare: z.boolean(),
  description: z.string().nullable(),
  remark: z.string().nullable(),
  isActive: z.boolean().default(true),
  isCustomized: z.boolean().nullable(),

  // Relationships
  sectorOIDs: z.array(z.string()).optional(),
  sectorGroupOIDs: z.array(z.string()).optional(),
  productOIDs: z.array(z.string()).optional(),
  productTypeOIDs: z.array(z.string()).optional(),
});

export type SpecialInstruction = z.infer<typeof SpecialInstructionZ>;
