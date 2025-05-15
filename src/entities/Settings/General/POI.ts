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
    x: z.number(),
    y: z.number(),
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
  description: z.string().optional(),
  position: GeoPointZ,
  images: z.array(z.string()).optional(),
  additionalInfo: z.record(z.string(), z.any()).optional(),
});


export type POI = z.infer<typeof POIZ>;
