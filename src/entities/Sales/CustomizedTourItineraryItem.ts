// simple-import-sort
import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { EntityOIDZ, EntityZ } from "../entity";
import { GeoPointZ } from "../Settings/General/POI";
import { RoomType } from "../Settings/Product/RoomConfiguration";


const POIAccommodationDetailsZ = z.object({
  type: z.literal("poi-accommodation"),
  poiOID: EntityOIDZ,
  checkIn: DateISOStringZ.nullish(),
  checkOut: DateISOStringZ.nullish(),
  roomType: z.nativeEnum(RoomType).nullish(),
  specialRequests: z.string().nullish(),
  notes: z.string().nullish(),
});

const FreeFormAccommodationDetailsZ = z.object({
  type: z.literal("free-form-accommodation"),
  hotelName: z.string(),
  address: z.string().nullish(),
  location: GeoPointZ.nullish(),
  checkIn: DateISOStringZ.nullish(),
  checkOut: DateISOStringZ.nullish(),
  roomType: z.nativeEnum(RoomType).nullish(),
  contactNumber: z.string().nullish(),
  specialRequests: z.string().nullish(),
  notes: z.string().nullish(),
});

export const CustomizedTourItineraryItemDetailsZ = z.discriminatedUnion("type", [
  POIAccommodationDetailsZ,
  FreeFormAccommodationDetailsZ,
]);

export enum CustomizedTourItineraryItemCategory {
  ACCOMMODATION = "accommodation",
  TRANSPORT = "transport",
  ACTIVITY = "activity",
  FOOD_DINING = "food-dining",
  SERVICES = "services",
  OTHER = "other",
}

export const CustomizedTourItineraryItemZ = EntityZ.extend({
  customizedTourItineraryOID: EntityOIDZ,
  category: z.nativeEnum(CustomizedTourItineraryItemCategory),
  supplierOID: EntityOIDZ.nullish(),
  name: z.string(),
  details: CustomizedTourItineraryItemDetailsZ.nullish(),
  internalRemarks: z.string().nullish(),
  externalRemarks: z.string().nullish(),
  startsAt: DateISOStringZ.nullish(),
  endsAt: DateISOStringZ.nullish(),
  costEstimated: z.number().nullish(),
  priceQuoted: z.number().nullish(),
  costActual: z.number().nullish(),
  marginPercentage: z.number().nullish(),
  linkedCostItemOID: EntityOIDZ.nullish(),
});

export type CustomizedTourItineraryItem = z.infer<typeof CustomizedTourItineraryItemZ>;
export type CustomizedTourItineraryItemDetails = z.infer<
  typeof CustomizedTourItineraryItemDetailsZ
>;
export type POIAccommodationDetails = z.infer<typeof POIAccommodationDetailsZ>;
export type FreeFormAccommodationDetails = z.infer<typeof FreeFormAccommodationDetailsZ>;

export enum CustomizedTourItineraryItemEvents {
  CUSTOMIZED_TOUR_ITINERARY_ITEM_UPDATED = "CUSTOMIZED_TOUR_ITINERARY_ITEM_UPDATED",
  CUSTOMIZED_TOUR_ITINERARY_ITEM_LIST_UPDATED = "CUSTOMIZED_TOUR_ITINERARY_ITEM_LIST_UPDATED",
}
