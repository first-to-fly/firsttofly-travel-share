import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";

/**
 * Zod schema for ExchangeOrderItem
 */
export const ExchangeOrderItemZ = EntityZ.extend({
  entityType: z.literal(EntityType.EXCHANGE_ORDER_ITEM),

  exchangeOrderOID: z.string(),

  order: z.number(),

  name: z.string(),

  quantity: z.number(),
  unitPrice: z.number(),
});

export type ExchangeOrderItem = z.infer<typeof ExchangeOrderItemZ>;
