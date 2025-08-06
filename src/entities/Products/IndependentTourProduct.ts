import { z } from "zod";

import { LanguageCodeZ, MultiLangRecordZ } from "../../types/multipleLanguage";
import { NamedURLZ } from "../../types/url";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum IndependentTourProductDocumentationType {
  SALE_KIT = "sale-kit",
  COMPARISON_CHART = "comparison-chart",
  USP_LIST = "usp-list",
  IMPORTANT_NOTICE = "important-notice",
  IMMIGRATION_POLICY = "immigration-policy",
  SPECIAL_REQUIREMENTS = "special-requirements",
  VISA_APPLICATION_FORM = "visa-application-form",
  EXTRA_INFORMATION = "extra-information",
}

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

  targetYieldPercentage: z.number().optional(),

  isActive: z.boolean(),
  published: z.boolean(),

  media: z.array(NamedURLZ).default([]),
  coverPicture: NamedURLZ.optional(),
  productBannerDesktop: NamedURLZ.optional(),
  productBannerMobile: NamedURLZ.optional(),

  videos: z.array(z.object({
    active: z.boolean(),
    title: z.string(),
    file: NamedURLZ,
    updatedAt: z.string(),
  })).optional(),
  itineraryPDFs: z.array(z.object({
    active: z.boolean(),
    lang: LanguageCodeZ,
    title: z.string(),
    itineraryOID: z.string().optional(),
    file: NamedURLZ,
    updatedAt: z.string(),
  })).optional(),
  documentations: z.array(z.object({
    active: z.boolean(),
    type: z.nativeEnum(IndependentTourProductDocumentationType),
    file: NamedURLZ,
    updatedAt: z.string(),
  })).optional(),
});

export type IndependentTourProduct = z.infer<typeof IndependentTourProductZ>;
