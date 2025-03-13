import { z } from "zod";

import { DateISOStringZ } from "../types/date";
import { EntityType } from "./entityType";


export const EntityOIDZ = z.string().regex(/[a-z]+-[a-zA-Z]+-*/);
export const EntityZ = z.object({
  oid: EntityOIDZ,
  entityType: z.nativeEnum(EntityType),

  tenantOid: z.string(), // .uuid(), Temp disable for testing

  createdBy: z.string(),
  updatedBy: z.string().optional(),

  createdAt: DateISOStringZ,
  updatedAt: DateISOStringZ.optional(),
  deletedAt: DateISOStringZ.optional(),

});
export const EntityIDZ = z.string();

export type BaseEntityRelation = Record<string, never>;

export type Entity = z.infer<typeof EntityZ>;
export type EntityOID = z.infer<typeof EntityOIDZ>;
export type EntityID = z.infer<typeof EntityIDZ>;
