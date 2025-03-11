import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


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

  roomConfigId: z.string().uuid(),
  roomType: z.enum(["single", "twin", "triple", "quad"]),
  occupantArrangement: z.unknown(),
  pricingArrangement: z.unknown(),
  isPublished: z.boolean().default(false),
  allowToCompleteParty: z.boolean().default(false),
});

export type RoomConfigRule = z.infer<typeof RoomConfigRuleZ>;

export const RoomConfigCoverageZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROOM_CONFIG_COVERAGE),

  roomConfigId: z.string().uuid(),
  coverageType: z.enum(["sectors", "sector-group", "products"]),
  coverageId: z.string().uuid(),
});

export type RoomConfigCoverage = z.infer<typeof RoomConfigCoverageZ>;
