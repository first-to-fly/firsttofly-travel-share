import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export const ProductZ = EntityZ.extend({
  entityType: z.literal(EntityType.PRODUCT),

  code: z.string().max(255),

  validityStartDate: z.date(),
  validityEndDate: z.date(),
  salesStartDate: z.date(),
  salesEndDate: z.date(),

  durationDays: z.number().int(),
  durationNights: z.number().int(),

  isActive: z.boolean(),
  isPublished: z.boolean(),
  status: z.string().max(50),

  sectorGroupOID: z.string().uuid(),
  departmentOID: z.string().uuid(),
});

export type Product = z.infer<typeof ProductZ>;
