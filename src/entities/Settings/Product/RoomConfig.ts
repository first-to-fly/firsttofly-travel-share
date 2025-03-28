import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum RoomConfigEvents {
  ROOM_CONFIG_UPDATED = "ROOM_CONFIG_UPDATED",
  ROOM_CONFIG_LIST_UPDATED = "ROOM_CONFIG_LIST_UPDATED",
}


export const RoomConfigZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROOM_CONFIG),

  name: z.string(),
  coverageType: z.enum(["sectors", "sector-group", "products"]),
  childNoBedStartAge: z.number().int(),
  childNoBedEndAge: z.number().int(),
  remarks: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type RoomConfig = z.infer<typeof RoomConfigZ>;

export const RoomConfigRuleZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROOM_CONFIG_RULE),

  roomConfigOID: z.string(),
  roomType: z.enum(["single", "twin", "triple", "quad"]),
  occupantArrangement: z.unknown(),
  pricingArrangement: z.unknown(),
  isPublished: z.boolean().default(false),
  allowToCompleteParty: z.boolean().default(false),
});

export type RoomConfigRule = z.infer<typeof RoomConfigRuleZ>;

export const RoomConfigCoverageZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROOM_CONFIG_COVERAGE),

  roomConfigOID: z.string(),
  coverageType: z.enum(["sectors", "sector-group", "products"]),
  coverageOID: z.string(),
});

export type RoomConfigCoverage = z.infer<typeof RoomConfigCoverageZ>;
