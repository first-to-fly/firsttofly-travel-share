import { z } from "zod";

import { BookingPaxType } from "../../enums/BookingTypes";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum IndependentTourAccommodationEvents {
  INDEPENDENT_TOUR_ACCOMMODATION_UPDATED = "INDEPENDENT_TOUR_ACCOMMODATION_UPDATED",
  INDEPENDENT_TOUR_ACCOMMODATION_LIST_UPDATED = "INDEPENDENT_TOUR_ACCOMMODATION_LIST_UPDATED",
}


// Pax pricing from design spec
const PaxPricingZ = z.record(z.nativeEnum(BookingPaxType), z.number()); // Record<BookingPaxType, number>

// Cost value structure with pax pricing
const CostValueZ = z.object({
  currency: z.string(),
  tax: z.number().nullish(),
  paxPricing: PaxPricingZ,
  peakSurchargeFixedAmount: z.number().nullish(),
  extraNightPrice: z.number().nullish(),
});

// Price value structure with pax pricing (same as cost value)
const PriceValueZ = z.object({
  currency: z.string(),
  tax: z.number().nullish(),
  paxPricing: PaxPricingZ,
  peakSurchargeFixedAmount: z.number().nullish(),
  extraNightPrice: z.number().nullish(),
});

// Peak period definition
const PeakPeriodZ = z.object({
  startDate: z.string(), // ISO date string
  endDate: z.string(), // ISO date string
  name: z.string().nullish(),
});

export const IndependentTourAccommodationZ = EntityZ.extend({
  entityType: z.literal(EntityType.INDEPENDENT_TOUR_ACCOMMODATION),

  independentTourProductOID: z.string(),

  name: z.string(),
  costValue: CostValueZ,
  priceValue: PriceValueZ,
  peakPeriods: z.array(PeakPeriodZ),
});

export type IndependentTourAccommodation = z.infer<typeof IndependentTourAccommodationZ>;
