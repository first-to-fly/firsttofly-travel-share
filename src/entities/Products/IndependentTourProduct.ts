import { z } from "zod";

import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { ProductPlatformZ } from "../../types/platform";
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

export enum IndependentTourProductEvents {
  INDEPENDENT_TOUR_PRODUCT_UPDATED = "INDEPENDENT_TOUR_PRODUCT_UPDATED",
  INDEPENDENT_TOUR_PRODUCT_LIST_UPDATED = "INDEPENDENT_TOUR_PRODUCT_LIST_UPDATED",
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
  sectorGroupOID: z.string().nullish(),
  sectorOIDs: z.array(z.string()).nullish(),

  code: z.string(),

  name: MultiLangRecordZ(z.string()),
  description: MultiLangRecordZ(z.string()).nullish(),
  remarks: z.string().nullish(),

  shoutout: MultiLangRecordZ(z.string()).nullish(),
  highlights: MultiLangRecordZ(z.string()).nullish(),
  writeup: MultiLangRecordZ(z.string()).nullish(),
  importantNotes: MultiLangRecordZ(z.string()).nullish(),
  inclusions: MultiLangRecordZ(z.string()).nullish(),
  exclusions: MultiLangRecordZ(z.string()).nullish(),

  durationDays: z.number(),
  durationNights: z.number(),

  validityStartDate: z.string(),
  validityEndDate: z.string().nullish(),

  targetYieldPercentage: z.number().nullish(),

  defaultFullPaymentDueDays: z.number().nullish(),
  pricingPlaceholder: z.record(z.string(), z.number()).nullish(),

  isActive: z.boolean(),
  published: z.boolean(),
  isUmrahHaj: z.boolean().nullish(),

  platforms: z.array(ProductPlatformZ).nullish(),

  coverPicture: NamedURLZ.nullish(),
  productBannerDesktop: NamedURLZ.nullish(),
  productBannerMobile: NamedURLZ.nullish(),

  videos: z.array(z.object({
    active: z.boolean(),
    title: z.string(),
    file: NamedURLZ,
    updatedAt: z.string(),
  })).nullish(),
  documentations: z.array(z.object({
    active: z.boolean(),
    type: z.nativeEnum(IndependentTourProductDocumentationType),
    file: NamedURLZ,
    updatedAt: z.string(),
  })).nullish(),
});

export type IndependentTourProduct = z.infer<typeof IndependentTourProductZ>;
