import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { OccupancyType } from "../Settings/Product/CostingItem";


// Occupancy pricing from design spec
const OccupancyPricingZ = z.record(z.nativeEnum(OccupancyType), z.number()); // Record<OccupancyType, number>

// Cost value structure with occupancy pricing
const CostValueZ = z.object({
  currency: z.string(),
  tax: z.number().optional(),
  occupancyPricing: OccupancyPricingZ,
});

// Price value structure with occupancy pricing (same as cost value)
const PriceValueZ = z.object({
  currency: z.string(),
  tax: z.number().optional(),
  occupancyPricing: OccupancyPricingZ,
});

// Night extension configuration
const NightExtensionConfigZ = z.object({
  maxNights: z.number(),
  pricePerNight: z.number(),
});

// Peak surcharge rates
const PeakSurchargeRatesZ = z.object({
  percentage: z.number(),
  fixedAmount: z.number(),
});

// Peak period definition
const PeakPeriodZ = z.object({
  startDate: z.string(), // ISO date string
  endDate: z.string(), // ISO date string
  name: z.string().optional(),
});

export const IndependentTourAccommodationZ = EntityZ.extend({
  entityType: z.literal(EntityType.INDEPENDENT_TOUR_ACCOMMODATION),

  independentTourProductOID: z.string(),

  name: z.string(),
  costValue: CostValueZ,
  priceValue: PriceValueZ,
  nightExtensionConfig: NightExtensionConfigZ,
  peakSurchargeRates: PeakSurchargeRatesZ,
  peakPeriods: z.array(PeakPeriodZ),
});

export type IndependentTourAccommodation = z.infer<typeof IndependentTourAccommodationZ>;
