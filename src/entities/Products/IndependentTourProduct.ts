import { z } from "zod";

import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


// Interface for Independent Tour Product MultiLanguageContent fields
export interface MultiLanguageContent {
  [languageCode: string]: string;
}

// Interface for Named URL
export interface NamedURL {
  name: string;
  url: string;
}

export const IndependentTourProductZ = EntityZ.extend({
  entityType: z.literal(EntityType.INDEPENDENT_TOUR_PRODUCT),

  departmentOID: z.string(),
  sectorGroupOID: z.string().optional(),
  itineraryOID: z.string(),

  code: z.string(),

  name: MultiLangRecordZ(z.string()),
  description: MultiLangRecordZ(z.string()).optional(),
  remarks: z.string().optional(),

  shoutout: MultiLangRecordZ(z.string()).optional(),
  highlights: MultiLangRecordZ(z.string()).optional(),
  writeup: MultiLangRecordZ(z.string()).optional(),
  importantNotes: MultiLangRecordZ(z.string()).optional(),
  inclusions: MultiLangRecordZ(z.string()).optional(),
  exclusions: MultiLangRecordZ(z.string()).optional(),

  durationDays: z.number(),
  durationNights: z.number(),

  validityStartDate: z.string(),
  validityEndDate: z.string().optional(),

  salesPeriodStartDate: z.string(),
  salesPeriodEndDate: z.string().optional(),

  isActive: z.boolean(),
  published: z.boolean(),

  media: z.array(z.object({
    name: z.string(),
    url: z.string(),
  })).default([]),
});

export type IndependentTourProduct = z.infer<typeof IndependentTourProductZ>;
