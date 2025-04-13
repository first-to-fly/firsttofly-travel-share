import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { EntityZ } from "../entity";


export const GroupTourProductZ = EntityZ.extend({
  code: z.string(),

  name: MultiLangRecordZ(z.string()),
  description: z.record(z.string(), z.string()),

  departmentOID: z.string(),
  sectorOIDs: z.array(z.string()),
  displaySectorOIDs: z.array(z.string()),

  sectorGroupOID: z.string().optional(),

  shoutout: MultiLangRecordZ(z.string()).optional(),
  highlights: MultiLangRecordZ(z.string()).optional(),
  writeup: MultiLangRecordZ(z.string()).optional(),
  importantNotes: MultiLangRecordZ(z.string()).optional(),
  inclusions: MultiLangRecordZ(z.string()).optional(),
  exclusions: MultiLangRecordZ(z.string()).optional(),

  durationDays: z.number(),
  durationNights: z.number(),

  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,

  salesPeriodStartDate: DateISOStringZ,
  salesPeriodEndDate: DateISOStringZ,

  isActive: z.boolean(),
  published: z.boolean(),
});

export type GroupTourProduct = z.infer<typeof GroupTourProductZ>;
