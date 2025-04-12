import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { EntityZ } from "../entity";


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

  groupTourPricingEntries: z.array(GroupTourPricingEntryZ),
});

export type GroupTourPricing = z.infer<typeof GroupTourPricingZ>;
export type GroupTourPricingEntry = z.infer<typeof GroupTourPricingEntryZ>;
