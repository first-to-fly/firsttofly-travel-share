import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";

// Product entity
export const ProductIDZ = z.number();
export const ProductOIDZ = z.string();
export const ProductZ = EntityZ.pick({
  oid: true,
  entityType: true,
}).extend({
  entityType: z.literal(EntityType.PRODUCT),
  code: z.string(),
  validityStartDate: z.date(),
  validityEndDate: z.date(),
  salesStartDate: z.date(),
  salesEndDate: z.date(),
  durationDays: z.number(),
  durationNights: z.number(),
  isActive: z.boolean(),
  isPublished: z.boolean(),
  status: z.string(),
  sectorGroupId: z.number(),
  departmentId: z.number(),
});

// Type exports
export type ProductID = z.infer<typeof ProductIDZ>;
export type ProductOID = z.infer<typeof ProductOIDZ>;
export type Product = z.infer<typeof ProductZ>;
