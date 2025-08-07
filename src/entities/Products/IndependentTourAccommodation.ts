import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { OccupancyType } from "../Settings/Product/CostingItem";


// Cost value structure from design spec
const CostValueZ = z.object({
  currency: z.string(),
  amount: z.number(),
  tax: z.number().optional(),
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

// Occupancy pricing from design spec
const OccupancyPricingZ = z.record(z.nativeEnum(OccupancyType), z.number()); // Record<OccupancyType, number>

export const IndependentTourAccommodationZ = EntityZ.extend({
  entityType: z.literal(EntityType.INDEPENDENT_TOUR_ACCOMMODATION),

  independentTourProductOID: z.string(),

  name: z.string(),
  costValue: CostValueZ,
  occupancyPricing: OccupancyPricingZ,
  nightExtensionConfig: NightExtensionConfigZ,
  peakSurchargeRates: PeakSurchargeRatesZ,
  peakPeriods: z.array(PeakPeriodZ),
});

export type IndependentTourAccommodation = z.infer<typeof IndependentTourAccommodationZ>;
