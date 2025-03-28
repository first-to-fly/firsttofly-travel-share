import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum ProductTypeEvents {
  PRODUCT_TYPE_UPDATED = "PRODUCT_TYPE_UPDATED",
  PRODUCT_TYPE_LIST_UPDATED = "PRODUCT_TYPE_LIST_UPDATED",
}


export const ProductTypeZ = EntityZ.extend({
  entityType: z.literal(EntityType.PRODUCT_TYPE),

  name: z.string(),

});

export type ProductType = z.infer<typeof ProductTypeZ>;
