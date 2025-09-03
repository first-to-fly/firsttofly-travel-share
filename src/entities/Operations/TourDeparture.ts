import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { FTFSafeMaxNumberZ } from "../../types/number";
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

  groupTourPricingOID: EntityOIDZ,
  appliedItineraryOID: EntityOIDZ,
  itineraryOID: EntityOIDZ,

  departureCode: z.string().max(50),
  customTourName: z.string().optional(),
  description: MultiLangRecordZ(z.string()),

  status: z.nativeEnum(TourDepartureStatus),
  isArchived: z.boolean().default(false),
  isCancelled: z.boolean().default(false),

  transportType: z.nativeEnum(TransportType).optional(),
  transportGroupOIDs: z.array(EntityOIDZ).optional(),

  durationDays: FTFSafeMaxNumberZ({
    max: 999,
    name: "Duration days",
  }).int().positive(),
  durationNights: FTFSafeMaxNumberZ({
    max: 999,
    name: "Duration nights",
  }).int().nonnegative(),
  totalCapacity: FTFSafeMaxNumberZ({
    max: 9_999,
    name: "Total capacity",
  }).int().positive(),
  blockedCapacity: FTFSafeMaxNumberZ({
    max: 9_999,
    name: "Blocked capacity",
  }).int().nonnegative(),
  minimumPax: FTFSafeMaxNumberZ({
    max: 9_999,
    name: "Minimum pax",
  }).int().nonnegative(),

  departureDate: DateISOStringZ,
  finalizationDate: DateISOStringZ.optional(),
  paymentDueDate: DateISOStringZ.optional(),
  fullPaymentDueDaysOverride: z.number().optional(),
  discount: GroupTourPricingDiscountZ.optional(),

  assembleLocationAirlineOID: EntityOIDZ.optional(),
  assembleAirlineLocationTime: z.string().max(5).regex(/^\d{2}:\d{2}$/).optional(),
  hkSeat: FTFSafeMaxNumberZ({
    max: 9_999,
    name: "HK Seat",
  }).int().nonnegative().optional(),

  tourLeaderOIDs: z.array(EntityOIDZ).optional(),
  tourManagerOIDs: z.array(EntityOIDZ).optional(),
});

export type TourDeparture = z.infer<typeof TourDepartureZ>;
