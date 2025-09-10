import { z } from "zod";

import { FTFSafeMaxNumberZ } from "../../types/number";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum IndependentTourMiscellaneousEvents {
  INDEPENDENT_TOUR_MISCELLANEOUS_UPDATED = "INDEPENDENT_TOUR_MISCELLANEOUS_UPDATED",
  INDEPENDENT_TOUR_MISCELLANEOUS_LIST_UPDATED = "INDEPENDENT_TOUR_MISCELLANEOUS_LIST_UPDATED",
}


// Cost value structure from design spec
const CostValueZ = z.object({
  currency: z.string(),
  amount: z.number(),
  tax: z.number().nullish(),
});

// Price value structure similar to GroupTourPricing
const PriceValueZ = z.object({
  currency: z.string(),
  amount: FTFSafeMaxNumberZ({ name: "Amount" }),
  tax: FTFSafeMaxNumberZ({ name: "Tax" }),
});

export const IndependentTourMiscellaneousZ = EntityZ.extend({
  entityType: z.literal(EntityType.INDEPENDENT_TOUR_MISCELLANEOUS),

  independentTourProductOID: z.string(),

  name: z.string(),
  costValue: CostValueZ,
  priceValue: PriceValueZ,
});

export type IndependentTourMiscellaneous = z.infer<typeof IndependentTourMiscellaneousZ>;
