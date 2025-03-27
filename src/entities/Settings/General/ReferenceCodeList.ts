import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum ReferenceCodeListEvents {
  UpdatedReferenceCodeList = "updated_reference_code_list",
  UpdatedReferenceCodeLists = "updated_reference_code_lists",
  CreatedReferenceCodeList = "created_reference_code_list",
  DeletedReferenceCodeList = "deleted_reference_code_list",
  DeletedReferenceCodeLists = "deleted_reference_code_lists",
}

const ReferenceCodeListEventValues = Object.values(ReferenceCodeListEvents);

export type ReferenceCodeListEvent = (typeof ReferenceCodeListEventValues)[number];

export enum CounterType {
  SEQUENTIAL = "sequential",
  // Add other counter types as needed
}

export enum ResetCounterType {
  MONTHLY = "monthly",
  YEARLY = "yearly",
  NEVER = "never",
  // Add other reset types as needed
}

export const ReferenceCodeListZ = EntityZ.extend({
  moduleId: z.number(),
  name: z.string().nullable(),
  counterType: z.nativeEnum(CounterType),
  resetCounterType: z.nativeEnum(ResetCounterType),
  counterWidth: z.number(),
  template: z.string(),
  remarks: z.string().optional(),
  offlineOperator: z.string().nullable(),
  createTime: z.date().optional(),
  updateTime: z.date().optional(),
});

export const ReferenceCodeListEntityType = EntityType.REFERENCE_CODE_LIST;

export type ReferenceCodeList = z.infer<typeof ReferenceCodeListZ>;
