import { EntityZ } from "entities/entity";
import { z } from "zod";


export const GroupTourProductZ = EntityZ.extend({
  productCode: z.string(),
  name: z.record(z.string(), z.string()),
  description: z.record(z.string(), z.string()),
  departmentOID: z.string(),
  shoutout: z.record(z.string(), z.string()),
  writeup: z.record(z.string(), z.string()),
  highlights: z.record(z.string(), z.string()),
  importantNotes: z.record(z.string(), z.string()),
  inclusions: z.record(z.string(), z.string()),
  exclusions: z.record(z.string(), z.string()),
  durationDays: z.number(),
  durationNights: z.number(),
  validityStartDate: z.date(),
  validityEndDate: z.date(),
  salesPeriodStartDate: z.date(),
  salesPeriodEndDate: z.date(),
  isActive: z.boolean(),
  published: z.boolean(),
});

export type GroupTourProduct = z.infer<typeof GroupTourProductZ>;
