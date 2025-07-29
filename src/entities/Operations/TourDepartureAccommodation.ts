import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { GeoPointZ } from "../Settings/General/POI";

/**
 * TourDepartureAccommodation status enum
 */
export enum TourDepartureAccommodationStatus {
  DRAFT = "draft",
  CONFIRMED = "confirmed",
  BOOKED = "booked",
  CANCELLED = "cancelled",
}

export enum TourDepartureAccommodationEvents {
  TOUR_DEPARTURE_ACCOMMODATION_UPDATED = "TOUR_DEPARTURE_ACCOMMODATION_UPDATED",
  TOUR_DEPARTURE_ACCOMMODATION_LIST_UPDATED = "TOUR_DEPARTURE_ACCOMMODATION_LIST_UPDATED",
}

/**
 * Zod schema for TourDepartureAccommodation
 */
export const TourDepartureAccommodationZ = EntityZ.extend({
  entityType: z.literal(EntityType.TOUR_DEPARTURE_ACCOMMODATION),

  tourDepartureOID: EntityOIDZ,
  name: MultiLangRecordZ(z.string()),
  checkIn: DateISOStringZ,
  checkOut: DateISOStringZ,
  location: GeoPointZ,
  contact: z.string(),
  address: z.string(),
  description: MultiLangRecordZ(z.string()),
  poiOID: EntityOIDZ.optional(),
  countryCode: z.string(),
  cityCode: z.string(),
  status: z.nativeEnum(TourDepartureAccommodationStatus),
});

export type TourDepartureAccommodation = z.infer<typeof TourDepartureAccommodationZ>;