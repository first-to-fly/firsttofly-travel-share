import { z } from "zod";

import { ProductType } from "../../../enums/ProductType";
import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum SectorEvents {
  SECTOR_UPDATED = "SECTOR_UPDATED",
  SECTOR_LIST_UPDATED = "SECTOR_LIST_UPDATED",
}


export const SectorZ = EntityZ.extend({
  entityType: z.literal(EntityType.SECTOR),

  name: z.string(),
  isActive: z.boolean().default(true),
  images: z.array(z.string().url()).nullish(),
  parentOID: EntityOIDZ.nullish(),

  isPopular: z.boolean().default(false),
  allowOverbooking: z.boolean().default(false),

  productTypes: z.array(z.nativeEnum(ProductType)).nullish(),

  departmentOID: EntityOIDZ.nullish(),
});

export type Sector = z.infer<typeof SectorZ>;
