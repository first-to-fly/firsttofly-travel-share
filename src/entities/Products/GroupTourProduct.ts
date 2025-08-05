import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { LanguageCodeZ, MultiLangRecordZ } from "../../types/multipleLanguage";
import { FTFSafeMaxNumberZ } from "../../types/number";
import { NamedURLZ } from "../../types/url";
import { EntityOIDZ, EntityZ } from "../entity";


export enum GroupTourProductEvents {
  GROUP_TOUR_PRODUCT_UPDATED = "GROUP_TOUR_PRODUCT_UPDATED",
  GROUP_TOUR_PRODUCT_LIST_UPDATED = "GROUP_TOUR_PRODUCT_LIST_UPDATED",
}

export enum GroupTourProductDocumentationType {
  SALE_KIT = "sale-kit",
  COMPARISON_CHART = "comparison-chart",
  USP_LIST = "usp-list",
  IMPORTANT_NOTICE = "important-notice",
  IMMIGRATION_POLICY = "immigration-policy",
  SPECIAL_REQUIREMENTS = "special-requirements",
  VISA_APPLICATION_FORM = "visa-application-form",
  EXTRA_INFORMATION = "extra-information",
}


export const GroupTourProductZ = EntityZ.extend({
  code: z.string(),

  name: MultiLangRecordZ(z.string()),
  description: z.record(z.string(), z.string()),

  departmentOID: EntityOIDZ,
  sectorOIDs: z.array(EntityOIDZ),
  displaySectorOIDs: z.array(EntityOIDZ),

  sectorGroupOID: EntityOIDZ.optional(),

  shoutout: MultiLangRecordZ(z.string()).optional(),
  highlights: MultiLangRecordZ(z.string()).optional(),
  writeup: MultiLangRecordZ(z.string()).optional(),
  importantNotes: MultiLangRecordZ(z.string()).optional(),
  inclusions: MultiLangRecordZ(z.string()).optional(),
  exclusions: MultiLangRecordZ(z.string()).optional(),

  durationDays: FTFSafeMaxNumberZ({ name: "Duration days" }),
  durationNights: FTFSafeMaxNumberZ({ name: "Duration nights" }),

  proposedDepartureDates: z.array(DateISOStringZ).optional(),
  transportPlanOIDs: z.array(EntityOIDZ).optional(),

  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ.optional(), // end indefinitely

  salesPeriodStartDate: DateISOStringZ,
  salesPeriodEndDate: DateISOStringZ.optional(), // end indefinitely

  isActive: z.boolean(),
  published: z.boolean(),

  ownerOIDs: z.array(z.string()).optional(),

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
    type: z.nativeEnum(GroupTourProductDocumentationType),
    file: NamedURLZ,
    updatedAt: z.string(),
  })).optional(),
});

export type GroupTourProduct = z.infer<typeof GroupTourProductZ>;
