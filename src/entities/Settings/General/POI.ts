import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum POIType {
  ACCOMMODATION = "accommodation",
  RESTAURANT = "restaurant",
  EXPERIENCE = "experience",
  LOCATION = "location",
  TRANSPORT = "transport",
}

export enum POICategory {
  ATTRACTION = "attraction",
  MUSEUM = "museum",
  CHURCH = "church",
  MONUMENT = "monument",
  PALACE = "palace",
  GARDEN = "garden",
  OTHER = "other",
}

export enum POIEvents {
  POI_UPDATED = "POI_UPDATED",
  POI_LIST_UPDATED = "POI_LIST_UPDATED",
}

export const GeoPointZ = z.object({
  type: z.literal("Point"),
  coordinate: z.object({
    x: z.number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
    y: z.number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
  }),
});

export type GeoPoint = z.infer<typeof GeoPointZ>;

export const POIZ = EntityZ.extend({
  entityType: z.literal(EntityType.POI),
  name: z.string(),
  address: z.string(),
  type: z.nativeEnum(POIType),
  country: z.string(),
  area: z.string(),
  category: z.nativeEnum(POICategory),
  description: z.string().nullish(),
  position: GeoPointZ,
  images: z.array(z.string()).nullish(),
  additionalInfo: z.record(z.string(), z.any()).nullish(),
});


export type POI = z.infer<typeof POIZ>;
