import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { EntityZ } from "../entity";


export enum GroupTourPricingEvents {
  GROUP_TOUR_PRICING_UPDATED = "GROUP_TOUR_PRICING_UPDATED",
  GROUP_TOUR_PRICING_LIST_UPDATED = "GROUP_TOUR_PRICING_LIST_UPDATED",
}


export const GroupTourPricingEntryZ = z.object({
  groupTourCostingEntryOID: z.string(), // oid of GroupTourCostingEntryZ

  priceValue: z.object({
    currency: z.string(),
    amount: z.number(),
    tax: z.number(),
  }),
});


export const GroupTourPricingZ = EntityZ.extend({
  groupTourCostingOID: z.string(),

  name: z.string(),
  code: z.string(),

  remarks: z.string().nullable(),
  targetYieldPercentage: z.number(),

  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,

  isActive: z.boolean(),

  fullFare: z.object({
    twin: z.number(),
    single: z.number(),
    triple: z.number(),
    quad: z.number(),
    childTwin: z.number(),
    childWithBed: z.number(),
    childNoBed: z.number(),
    infant: z.number(),
  }),

  landFare: z.object({
    twin: z.number(),
    single: z.number(),
    triple: z.number(),
    quad: z.number(),
    childTwin: z.number(),
    childWithBed: z.number(),
    childNoBed: z.number(),
    infant: z.number(),
  }),

  airportTax: z.object({
    adult: z.number(),
    child: z.number(),
  }),

  discount: z.object({
    tierConfigs: z.array(z.object({
      from: z.number(),
      to: z.number(),
    })).min(1),

    groups: z.array(z.object({
      name: z.string(),
      tierData: z.record(
        z.number().describe("Tier index"),
        z.object({
          adult: z.number(),
          child: z.number(),
        }),
      ),
    })).min(1),
  }).optional(),

  groupTourPricingEntries: z.array(GroupTourPricingEntryZ),
});

export type GroupTourPricing = z.infer<typeof GroupTourPricingZ>;
export type GroupTourPricingEntry = z.infer<typeof GroupTourPricingEntryZ>;
