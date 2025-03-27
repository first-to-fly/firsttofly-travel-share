import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum ReferenceCodeTemplateEvents {
  UpdatedReferenceCodeTemplate = "updated_reference_code_template",
  UpdatedReferenceCodeTemplates = "updated_reference_code_templates",
  CreatedReferenceCodeTemplate = "created_reference_code_template",
  DeletedReferenceCodeTemplate = "deleted_reference_code_template",
  DeletedReferenceCodeTemplates = "deleted_reference_code_templates",
}

const ReferenceCodeTemplateEventValues = Object.values(ReferenceCodeTemplateEvents);

export type ReferenceCodeTemplateEvent = (typeof ReferenceCodeTemplateEventValues)[number];

export enum CounterType {
  Sequential = "sequential",
  Random = "random",
}

export enum ResetCounterType {
  Disabled = "disabled",
  Daily = "daily",
  Monthly = "monthly",
  Yearly = "yearly",
}

export const ReferenceCodeTemplateZ = EntityZ.extend({
  name: z.string(),
  counterType: z.nativeEnum(CounterType).default(CounterType.Sequential),
  resetCounterType: z.nativeEnum(ResetCounterType).default(ResetCounterType.Disabled),
  counterWidth: z.number().default(5),
  template: z.string(),
  remarks: z.string().nullable(),
  offlineOperator: z.string().nullable(),
  referenceCodeTreeOID: z.string(),
});

export const ReferenceCodeTemplateEntityType = EntityType.REFERENCE_CODE_TEMPLATE;

export type ReferenceCodeTemplate = z.infer<typeof ReferenceCodeTemplateZ>;
