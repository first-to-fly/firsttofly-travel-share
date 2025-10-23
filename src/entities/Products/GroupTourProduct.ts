import { z } from "zod";

import { BookingPaxType } from "../../enums/BookingTypes";
import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { FTFSafeMaxNumberZ } from "../../types/number";
import { ProductPlatformZ } from "../../types/platform";
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
  sectorOID: EntityOIDZ,
  displaySectorOIDs: z.array(EntityOIDZ),

  sectorGroupOID: EntityOIDZ.nullish(),

  shoutout: MultiLangRecordZ(z.string()).nullish(),
  highlights: MultiLangRecordZ(z.string()).nullish(),
  writeup: MultiLangRecordZ(z.string()).nullish(),
  importantNotes: MultiLangRecordZ(z.string()).nullish(),
  inclusions: MultiLangRecordZ(z.string()).nullish(),
  exclusions: MultiLangRecordZ(z.string()).nullish(),

  durationDays: FTFSafeMaxNumberZ({ name: "Duration days" }),
  durationNights: FTFSafeMaxNumberZ({ name: "Duration nights" }),

  proposedDepartureDates: z.array(DateISOStringZ).nullish(),
  transportPlanOIDs: z.array(EntityOIDZ).nullish(),

  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ.nullish(), // end indefinitely

  salesPeriodStartDate: DateISOStringZ,
  salesPeriodEndDate: DateISOStringZ.nullish(), // end indefinitely

  defaultFullPaymentDueDays: z.number().nullish(),
  pricingPlaceholder: z.record(z.string(), z.number()).nullish(),

  defaultStartingPricePaxType: z.nativeEnum(BookingPaxType).default(BookingPaxType.TWIN),

  isActive: z.boolean(),
  published: z.boolean(),
  isUmrahHaj: z.boolean().nullish(),

  platforms: z.array(ProductPlatformZ).nullish(),

  ownerOIDs: z.array(z.string()).optional(),

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
    type: z.nativeEnum(GroupTourProductDocumentationType),
    file: NamedURLZ,
    updatedAt: z.string(),
  })).nullish(),

  startingPrice: z.number().nullish(),
});

export type GroupTourProduct = z.infer<typeof GroupTourProductZ>;
