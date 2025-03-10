import { EntityZ } from "../entity";
import { z } from "zod";


export const ProductZ = EntityZ.extend({
  tenantId: z.string().uuid(),
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

  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string().uuid(),
  updatedBy: z.string().uuid().optional(),
  deletedAt: z.date().optional(),
});

export type Product = z.infer<typeof ProductZ>;
