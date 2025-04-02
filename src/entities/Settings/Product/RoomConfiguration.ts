import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum RoomConfigurationEvents {
  ROOM_CONFIGURATION_UPDATED = "ROOM_CONFIGURATION_UPDATED",
  ROOM_CONFIGURATION_LIST_UPDATED = "ROOM_CONFIGURATION_LIST_UPDATED",
}

export const RoomConfigurationZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROOM_CONFIG),

  name: z.string(),
  status: z.number().int(),
  remarks: z.string().optional(),
  offlineOperator: z.string().optional(),
  childWithoutBedStartAge: z.number().int(),
  childWithoutBedEndAge: z.number().int(),
  typeNames: z.string().optional(),
  checkChart: z.string().optional(),
  sectorOIDs: z.array(z.string()).optional(),
  sectorGroupOIDs: z.array(z.string()).optional(),
  productOIDs: z.array(z.string()).optional(),
  participatorOIDs: z.array(z.string()).optional(),
  personInChargeOIDs: z.array(z.string()).optional(),
});

export type RoomConfiguration = z.infer<typeof RoomConfigurationZ>;

export const RoomConfigurationRuleZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROOM_CONFIG_RULE),

  roomConfigurationOID: z.string(),
  formula: z.string().optional(),
  roomType: z.string().optional(),
  adultNum: z.number().int().optional(),
  childWithBedNum: z.number().int().optional(),
  childWithoutBedNum: z.number().int().optional(),
  infantNum: z.number().int().optional(),
  adultSingle: z.number().int().optional(),
  adultTwin: z.number().int().optional(),
  adultTriple: z.number().int().optional(),
  adultQuad: z.number().int().optional(),
  childWithHalfTwin: z.number().int().optional(),
  childWithBed: z.number().int().optional(),
  childWithoutBed: z.number().int().optional(),
  infant: z.number().int().optional(),
  offlineOperator: z.string().optional(),
  isBackend: z.boolean().optional(),
  isTcp: z.boolean().optional(),
});

export type RoomConfigurationRule = z.infer<typeof RoomConfigurationRuleZ>;
