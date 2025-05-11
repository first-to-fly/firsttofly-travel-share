import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { TransportType } from "./TransportGroup";
import { GroupTourPricingDiscountZ } from "../Products/GroupTourPricing";

/**
 * TourDeparture status enum
 */
export enum TourDepartureStatus {
  DRAFT = "draft",
  CONFIRMED = "confirmed",
  OPEN = "open",
  CLOSED = "closed",
  CANCELLED = "cancelled",
}


/**
 * Assembly details for tour departure
 */
export const AssemblyDetailZ = z.object({
  location: z.string(),
  time: DateISOStringZ,
});

export type AssemblyDetail = z.infer<typeof AssemblyDetailZ>;

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

  transportType: z.nativeEnum(TransportType).optional(),
  transportGroupOIDs: z.array(EntityOIDZ).optional(),

  durationDays: z.number().int().positive(),
  durationNights: z.number().int().nonnegative(),

  departureDate: DateISOStringZ,
  finalizationDate: DateISOStringZ.optional(),
  paymentDueDate: DateISOStringZ.optional(),
  discount: GroupTourPricingDiscountZ.optional(),

  assemblyDetails: AssemblyDetailZ.optional(),

  tourLeaderOIDs: z.array(EntityOIDZ).optional(),
  tourManagerOIDs: z.array(EntityOIDZ).optional(),
});

export type TourDeparture = z.infer<typeof TourDepartureZ>;
