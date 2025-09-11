import { z } from "zod";

import { ProductType } from "../../../enums/ProductType";
import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum UsefulInfoEvents {
  USEFUL_INFO_UPDATED = "USEFUL_INFO_UPDATED",
  USEFUL_INFO_LIST_UPDATED = "USEFUL_INFO_LIST_UPDATED",
}

export const UsefulInfoZ = EntityZ.extend({
  entityType: z.literal(EntityType.USEFUL_INFO),

  productTypes: z.array(z.nativeEnum(ProductType)).nullish(),

  name: z.string(),
  isActive: z.boolean().default(true),
  remarks: z.string().nullish(),
  info: z.object({
    otherInfo: z.string().nullish(),
    tipping: z.string().nullish(),
    visa: z.string().nullish(),
    weather: z.string().nullish(),
    optionalTours: z.string().nullish(),
  }).nullish(),

  applyToEntityOIDs: z.array(EntityOIDZ).nullish(),
});

export type UsefulInfo = z.infer<typeof UsefulInfoZ>;
