import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export const ProductTypeZ = EntityZ.extend({
  entityType: z.literal(EntityType.PRODUCT_TYPE),

  name: z.string(),

});

export type ProductType = z.infer<typeof ProductTypeZ>;
