import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { FTFSafeMaxNumberZ } from "../../types/number";
import { EntityZ } from "../entity";


export enum GroupTourPricingEvents {
  GROUP_TOUR_PRICING_UPDATED = "GROUP_TOUR_PRICING_UPDATED",
  GROUP_TOUR_PRICING_LIST_UPDATED = "GROUP_TOUR_PRICING_LIST_UPDATED",
}


export const GroupTourPricingEntryZ = z.object({
  groupTourCostingEntryOID: z.string(), // oid of GroupTourCostingEntryZ

  priceValue: z.object({
    currency: z.string(),
    amount: FTFSafeMaxNumberZ({ name: "Amount" }),
    tax: FTFSafeMaxNumberZ({ name: "Tax" }),
  }),
});

export const GroupTourPricingDiscountZ = z.object({
  tierConfigs: z.array(z.object({
    from: FTFSafeMaxNumberZ({ name: "Discount tier from" }),
    to: FTFSafeMaxNumberZ({ name: "Discount tier to" }),
  })).min(1),

  groups: z.array(z.object({
    name: z.string(),
    tierData: z.record(
      FTFSafeMaxNumberZ({ name: "Discount tier index" }),
      z.object({
        adult: FTFSafeMaxNumberZ({ name: "Adult discount" }),
        child: FTFSafeMaxNumberZ({ name: "Child discount" }),
      }),
    ),
  })).min(1),
});


export const GroupTourPricingZ = EntityZ.extend({
  groupTourProductOID: z.string(),
  groupTourCostingOID: z.string(),

  name: z.string(),
  code: z.string(),

  remarks: z.string().nullable(),
  targetYieldPercentage: FTFSafeMaxNumberZ({ name: "Target yield percentage" }),

  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,

  isActive: z.boolean(),

  fullFare: z.object({
    twin: FTFSafeMaxNumberZ({ name: "Twin" }),
    single: FTFSafeMaxNumberZ({ name: "Single" }),
    triple: FTFSafeMaxNumberZ({ name: "Triple" }),
    quad: FTFSafeMaxNumberZ({ name: "Quad" }),
    childTwin: FTFSafeMaxNumberZ({ name: "Child twin" }),
    childWithBed: FTFSafeMaxNumberZ({ name: "Child with bed" }),
    childNoBed: FTFSafeMaxNumberZ({ name: "Child no bed" }),
    infant: FTFSafeMaxNumberZ({ name: "Infant" }),
  }),

  landFare: z.object({
    twin: FTFSafeMaxNumberZ({ name: "Twin" }),
    single: FTFSafeMaxNumberZ({ name: "Single" }),
    triple: FTFSafeMaxNumberZ({ name: "Triple" }),
    quad: FTFSafeMaxNumberZ({ name: "Quad" }),
    childTwin: FTFSafeMaxNumberZ({ name: "Child twin" }),
    childWithBed: FTFSafeMaxNumberZ({ name: "Child with bed" }),
    childNoBed: FTFSafeMaxNumberZ({ name: "Child no bed" }),
    infant: FTFSafeMaxNumberZ({ name: "Infant" }),
  }),

  airportTax: z.object({
    adult: FTFSafeMaxNumberZ({ name: "Airport tax adult" }),
    child: FTFSafeMaxNumberZ({ name: "Airport tax child" }),
  }),

  discount: GroupTourPricingDiscountZ.optional(),

  groupTourPricingEntries: z.array(GroupTourPricingEntryZ),
});

export type GroupTourPricing = z.infer<typeof GroupTourPricingZ>;
export type GroupTourPricingEntry = z.infer<typeof GroupTourPricingEntryZ>;
export type GroupTourPricingDiscount = z.infer<typeof GroupTourPricingDiscountZ>;
