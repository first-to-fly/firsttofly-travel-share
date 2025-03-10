import { z } from "zod";

import { DateISOStringZ } from "../types/date";
import { EntityType } from "./entityType";


export const EntityOIDZ = z.string().regex(/[a-z]+-[a-zA-Z]+-*/);
export const EntityZ = z.object({
  oid: EntityOIDZ,
  entityType: z.nativeEnum(EntityType),
  createdBy: z.string(),
  updatedAt: DateISOStringZ,
  createdAt: DateISOStringZ,
});
export const EntityIDZ = z.union([z.string(), z.number()]);
export const EntityIDNumberZ = z.number();

export type BaseEntityRelation = Record<string, never>;

export type Entity = z.infer<typeof EntityZ>;
export type EntityOID = z.infer<typeof EntityOIDZ>;
export type EntityID = z.infer<typeof EntityIDZ>;
export type EntityIDNumber = z.infer<typeof EntityIDNumberZ>;
