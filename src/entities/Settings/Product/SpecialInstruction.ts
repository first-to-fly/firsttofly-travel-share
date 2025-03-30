import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum SpecialInstructionEvents {
  SPECIAL_INSTRUCTION_UPDATED = "SPECIAL_INSTRUCTION_UPDATED",
  SPECIAL_INSTRUCTION_LIST_UPDATED = "SPECIAL_INSTRUCTION_LIST_UPDATED",
}


export const SpecialInstructionZ = EntityZ.extend({
  entityType: z.literal(EntityType.SPECIAL_INSTRUCTION),

  tenantOID: z.string(),
  isPrepare: z.boolean(),
  description: z.string().nullable(),
  remark: z.string().nullable(),
  status: z.string().nullable(),
  isCustomized: z.boolean().nullable(),
  offlineOperator: z.string().nullable(),

  // Relationships
  sectorOIDs: z.array(z.string()).optional(),
  sectorGroupOIDs: z.array(z.string()).optional(),
  productOIDs: z.array(z.string()).optional(),
  participatorOIDs: z.array(z.string()).optional(),
  personInChargeOIDs: z.array(z.string()).optional(),
  productTypeOIDs: z.array(z.string()).optional(),
});

export type SpecialInstruction = z.infer<typeof SpecialInstructionZ>;
