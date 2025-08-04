import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum MediaEvents {
  MEDIA_UPDATED = "MEDIA_UPDATED",
  MEDIA_LIST_UPDATED = "MEDIA_LIST_UPDATED",
}

export enum MediaType {
  PHOTO = "photo",
  VIDEO = "video",
}

export const MediaTypeZ = z.nativeEnum(MediaType);

export const MediaDimensionsZ = z.object({
  width: z.number(),
  height: z.number(),
});

export const MediaRelevantLocationZ = z.object({
  countryCode: z.string(),
  cities: z.array(z.string()),
});

export const MediaZ = EntityZ.extend({
  entityType: z.literal(EntityType.MEDIA),

  type: MediaTypeZ,
  name: z.string(),
  url: z.string(),
  size: z.number().optional(),
  dimensions: MediaDimensionsZ.optional(),
  description: z.string().optional(),
  relevantLocations: z.array(MediaRelevantLocationZ).optional(),
});

export type Media = z.infer<typeof MediaZ>;
export type MediaDimensions = z.infer<typeof MediaDimensionsZ>;
export type MediaRelevantLocation = z.infer<typeof MediaRelevantLocationZ>;
