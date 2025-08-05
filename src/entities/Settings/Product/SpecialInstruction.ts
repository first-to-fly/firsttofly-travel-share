import { z } from "zod";

import { ProductType } from "../../../enums/ProductType";
import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum SpecialInstructionEvents {
  SPECIAL_INSTRUCTION_UPDATED = "SPECIAL_INSTRUCTION_UPDATED",
  SPECIAL_INSTRUCTION_LIST_UPDATED = "SPECIAL_INSTRUCTION_LIST_UPDATED",
}


export const SpecialInstructionZ = EntityZ.extend({
  entityType: z.literal(EntityType.SPECIAL_INSTRUCTION),

  isPreset: z.boolean(),
  description: z.string().optional(),

  remarks: z.string().optional(),
  isActive: z.boolean().default(true),
  isCustomized: z.boolean().optional(),

  // Relationships
  coveredEntityOIDs: z.array(EntityOIDZ), // OIDs of Sectors / SectorGroups / GroupTourProducts
  productTypes: z.array(z.nativeEnum(ProductType)).optional(),
});

export type SpecialInstruction = z.infer<typeof SpecialInstructionZ>;
