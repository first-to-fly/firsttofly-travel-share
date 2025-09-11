import { z } from "zod";

import { FTFSafeMaxNumberZ } from "../../../types/number";
import { EntityOIDZ, EntityZ } from "../../entity";
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

export const RoomOccupancyZ = z.object({
  adultNum: FTFSafeMaxNumberZ({ name: "Room occupancy adult number" }).int().nonnegative().optional(),
  childWithBedNum: FTFSafeMaxNumberZ({ name: "Room occupancy child with bed number" }).int().nonnegative().optional(),
  childWithoutBedNum: FTFSafeMaxNumberZ({ name: "Room occupancy child without bed number" }).int().nonnegative().optional(),
  infantNum: FTFSafeMaxNumberZ({ name: "Room occupancy infant number" }).int().nonnegative().optional(),
});

export type RoomOccupancy = z.infer<typeof RoomOccupancyZ>;

const RoomPricingArrangementZ = z.object({
  single: FTFSafeMaxNumberZ({ name: "Room pricing arrangement single" }).int().nonnegative().optional(),
  twin: FTFSafeMaxNumberZ({ name: "Room pricing arrangement twin" }).int().nonnegative().optional(),
  triple: FTFSafeMaxNumberZ({ name: "Room pricing arrangement triple" }).int().nonnegative().optional(),
  quad: FTFSafeMaxNumberZ({ name: "Room pricing arrangement quad" }).int().nonnegative().optional(),
  childTwin: FTFSafeMaxNumberZ({ name: "Room pricing arrangement child twin" }).int().nonnegative().optional(),
  childWithBed: FTFSafeMaxNumberZ({ name: "Room pricing arrangement child with bed" }).int().nonnegative().optional(),
  childNoBed: FTFSafeMaxNumberZ({ name: "Room pricing arrangement child no bed" }).int().nonnegative().optional(),
  infant: FTFSafeMaxNumberZ({ name: "Room pricing arrangement infant" }).int().nonnegative().optional(),
});

export type RoomPricingArrangement = z.infer<typeof RoomPricingArrangementZ>;

export const RoomConfigurationRuleZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROOM_CONFIG_RULE),

  roomConfigurationOID: EntityOIDZ,

  roomType: z.nativeEnum(RoomType),

  occupancy: RoomOccupancyZ,

  pricingArrangement: RoomPricingArrangementZ,

  isBackendOnly: z.boolean().nullish(),
  isTcp: z.boolean().nullish(),
});


export const RoomConfigurationZ = EntityZ.extend({
  entityType: z.literal(EntityType.ROOM_CONFIG),

  name: z.string(),
  isActive: z.boolean().default(true),
  remarks: z.string().nullish(),

  childWithoutBedStartAge: FTFSafeMaxNumberZ({
    max: 2,
    name: "Room configuration child without bed start age",
  }).int().nonnegative(),
  childWithoutBedEndAge: FTFSafeMaxNumberZ({
    max: 14,
    name: "Room configuration child without bed end age",
  }).int().nonnegative(),

  coveredEntityOIDs: z.array(EntityOIDZ).min(1),
  roomConfigurationRules: z.array(RoomConfigurationRuleZ),
});

export type RoomConfiguration = z.infer<typeof RoomConfigurationZ>;
export type RoomConfigurationRule = z.infer<typeof RoomConfigurationRuleZ>;
