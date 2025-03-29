import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum CounterType {
  SEQUENTIAL = "Sequential",
  RANDOM = "Random",
}

export enum ResetCounterType {
  DISABLED = "Disabled",
  DAILY = "Daily",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

export enum ReferenceCodeTemplateEvents {
  REFERENCE_CODE_TEMPLATE_UPDATED = "REFERENCE_CODE_TEMPLATE_UPDATED",
  REFERENCE_CODE_TEMPLATE_LIST_UPDATED = "REFERENCE_CODE_TEMPLATE_LIST_UPDATED",
}

export const ReferenceCodeTemplateZ = EntityZ.extend({
  entityType: z.literal(EntityType.REFERENCE_CODE_TEMPLATE),
  name: z.string(),
  moduleId: z.string(),
  counterType: z.nativeEnum(CounterType).default(CounterType.SEQUENTIAL),
  resetCounterType: z.nativeEnum(ResetCounterType).default(ResetCounterType.DISABLED),
  counterWidth: z.number().default(5),
  template: z.string(),
  remarks: z.string().optional(),
  // Relationship
  componentIds: z.array(z.string()).optional(),
});


export type ReferenceCodeTemplate = z.infer<typeof ReferenceCodeTemplateZ>;
