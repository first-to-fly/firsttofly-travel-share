import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { FTFSafeMaxNumberZ } from "../../types/number";
import { EntityOIDZ, EntityZ } from "../entity";


export enum GroupTourProductEvents {
  GROUP_TOUR_PRODUCT_UPDATED = "GROUP_TOUR_PRODUCT_UPDATED",
  GROUP_TOUR_PRODUCT_LIST_UPDATED = "GROUP_TOUR_PRODUCT_LIST_UPDATED",
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
});

export type GroupTourProduct = z.infer<typeof GroupTourProductZ>;
