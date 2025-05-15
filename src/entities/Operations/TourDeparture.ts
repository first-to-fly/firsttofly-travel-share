import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { GroupTourPricingDiscountZ } from "../Products/GroupTourPricing";
import { TransportType } from "./TransportGroup";

/**
 * TourDeparture status enum
 */
export enum TourDepartureStatus {
  DRAFT = "draft",
  CONFIRMED = "confirmed",
  OPEN = "open",
  CLOSED = "closed",
}

export enum TourDepartureEvents {
  TOUR_DEPARTURE_UPDATED = "TOUR_DEPARTURE_UPDATED",
  TOUR_DEPARTURE_LIST_UPDATED = "TOUR_DEPARTURE_LIST_UPDATED",
}

/**
 * Zod schema for TourDeparture
 */
export const TourDepartureZ = EntityZ.extend({
  entityType: z.literal(EntityType.TOUR_DEPARTURE),

  productPricingOID: EntityOIDZ,
  appliedItineraryOID: EntityOIDZ,
  itineraryOID: EntityOIDZ,

  departureCode: z.string().max(50),
  description: MultiLangRecordZ(z.string()),

  status: z.nativeEnum(TourDepartureStatus),
  isArchived: z.boolean().default(false),
  isCancelled: z.boolean().default(false),

  transportType: z.nativeEnum(TransportType).optional(),
  transportGroupOIDs: z.array(EntityOIDZ).optional(),

  durationDays: z.number().int().positive(),
  durationNights: z.number().int().nonnegative(),
  totalCapacity: z.number().int().positive(),
  blockedCapacity: z.number().int().nonnegative(),
  minimumPax: z.number().int().nonnegative(),

  departureDate: DateISOStringZ,
  finalizationDate: DateISOStringZ.optional(),
  paymentDueDate: DateISOStringZ.optional(),
  discount: GroupTourPricingDiscountZ.optional(),

  assembleLocationAirlineOID: EntityOIDZ.optional(),
  assembleAirlineLocationTime: z.string().max(5).regex(/^\d{2}:\d{2}$/).optional(),

  tourLeaderOIDs: z.array(EntityOIDZ).optional(),
  tourManagerOIDs: z.array(EntityOIDZ).optional(),
});

export type TourDeparture = z.infer<typeof TourDepartureZ>;
