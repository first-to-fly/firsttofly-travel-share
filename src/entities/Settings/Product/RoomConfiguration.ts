import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum RoomConfigurationEvents {
  ROOM_CONFIGURATION_UPDATED = "ROOM_CONFIGURATION_UPDATED",
  ROOM_CONFIGURATION_LIST_UPDATED = "ROOM_CONFIGURATION_LIST_UPDATED",
}

export enum RoomType {
  SINGLE = "single",
  TWIN = "twin",
  TRIPLE = "triple",
  QUADRUPLE = "quadruple",
}

export const RoomConfigurationRuleZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROOM_CONFIG_RULE),

  roomConfigurationOID: z.string(),

  roomType: z.nativeEnum(RoomType),

  occupancy: z.object({
    adultNum: z.number().int().nonnegative().lte(4)
      .optional(),
    childWithBedNum: z.number().int().nonnegative().lte(4)
      .optional(),
    childWithoutBedNum: z.number().int().nonnegative().lte(4)
      .optional(),
    infantNum: z.number().int().nonnegative().lte(4)
      .optional(),
  }),

  pricingArrangement: z.object({
    single: z.number().int().nonnegative().optional(),
    twin: z.number().int().nonnegative().optional(),
    triple: z.number().int().nonnegative().optional(),
    quad: z.number().int().nonnegative().optional(),
    childTwin: z.number().int().nonnegative().optional(),
    childWithBed: z.number().int().nonnegative().optional(),
    childNoBed: z.number().int().nonnegative().optional(),
    infant: z.number().int().nonnegative().optional(),
  }),

  isBackendOnly: z.boolean().optional(),
  isTcp: z.boolean().optional(),
});


export const RoomConfigurationZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROOM_CONFIG),

  name: z.string(),
  isActive: z.boolean().default(true),
  remarks: z.string().optional(),

  childWithoutBedStartAge: z.number().int().nonnegative(),
  childWithoutBedEndAge: z.number().int().nonnegative(),

  coveredEntityOIDs: z.array(z.string()).min(1),
  roomConfigurationRules: z.array(RoomConfigurationRuleZ),
});

export type RoomConfiguration = z.infer<typeof RoomConfigurationZ>;
export type RoomConfigurationRule = z.infer<typeof RoomConfigurationRuleZ>;
