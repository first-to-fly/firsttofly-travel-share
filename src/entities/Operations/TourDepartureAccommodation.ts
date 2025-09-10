import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { MultiLangRecordZ } from "../../types/multipleLanguage";
import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { GeoPointZ } from "../Settings/General/POI";


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
  checkIn: DateISOStringZ
    .refine(
      (date) => new Date(date) >= new Date(),
      "Check-in date must be in the future",
    ),
  checkOut: DateISOStringZ
    .refine(
      (date) => new Date(date) >= new Date(),
      "Check-out date must be in the future",
    ),
  location: GeoPointZ,
  contact: z.string(),
  address: z.string(),
  description: MultiLangRecordZ(z.string()),
  remarks: z.string().nullish(),
  poiOID: EntityOIDZ.nullish(),
  countryCode: z.string(),
  cityCode: z.string(),
  dev: z.string(),
}).refine(
  (data) => new Date(data.checkOut) > new Date(data.checkIn),
  {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  },
).refine(
  (data) => {
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const diffInDays = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 365; // Maximum 1 year stay
  },
  {
    message: "Accommodation stay cannot exceed 365 days",
    path: ["checkOut"],
  },
);

export type TourDepartureAccommodation = z.infer<typeof TourDepartureAccommodationZ>;
