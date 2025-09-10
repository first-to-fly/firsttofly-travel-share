import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum TransportType {
  FLIGHT = "flight",
  BUS = "bus",
  CRUISE = "cruise",
  TRAIN = "train",
  FERRY = "ferry",
}

export enum TransportGroupEvents {
  TRANSPORT_GROUP_UPDATED = "TRANSPORT_GROUP_UPDATED",
  TRANSPORT_GROUP_LIST_UPDATED = "TRANSPORT_GROUP_LIST_UPDATED",
}

export const TransportGroupZ = EntityZ.extend({
  entityType: z.literal(EntityType.TRANSPORT_GROUP),
  name: z.string(),
  mainType: z.nativeEnum(TransportType).nullish(),
  description: z.string().nullish(),
});

export type TransportGroup = z.infer<typeof TransportGroupZ>;
