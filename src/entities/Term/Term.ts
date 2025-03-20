import { z } from "zod";

import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum TermEvents {
  TERM_UPDATED = "TERM_UPDATED",
  TERM_LIST_UPDATED = "TERM_LIST_UPDATED",
}

export enum TermType {
  TOUR_LEADING_SKILL = "tour-leading-skill",
}

export const TermZ = EntityZ.extend({
  entityType: z.literal(EntityType.TERM),

  type: z.nativeEnum(TermType),
  value: MultiLangRecordZ(z.string()),
});

export type Term = z.infer<typeof TermZ>;
