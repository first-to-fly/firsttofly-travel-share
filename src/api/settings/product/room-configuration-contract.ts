import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { RoomConfigurationRuleZ, RoomConfigurationZ } from "../../../entities/Settings/Product/RoomConfiguration";


const basePath = "/api/settings/room-configurations";

const CreateRoomConfigurationRuleZ = RoomConfigurationRuleZ.pick({
  roomType: true,
  occupancy: true,
  pricingArrangement: true,
  isBackendOnly: true,
  isTcp: true,
});

const UpdateRoomConfigurationRuleZ = CreateRoomConfigurationRuleZ.extend({
  oid: z.string().optional(),
}).partial();

const CreateRoomConfigurationZ = RoomConfigurationZ.pick({
  tenantOID: true,
  name: true,
  isActive: true,
  remarks: true,
  childWithoutBedStartAge: true,
  childWithoutBedEndAge: true,
  coveredEntityOIDs: true,
}).extend({
  roomConfigurationRules: z.array(CreateRoomConfigurationRuleZ),
});

const UpdateRoomConfigurationZ = CreateRoomConfigurationZ.omit({
  tenantOID: true,
}).extend({
  roomConfigurationRules: z.array(UpdateRoomConfigurationRuleZ),
}).partial();

export type UpdateRoomConfiguration = z.infer<typeof UpdateRoomConfigurationZ>;
export type CreateRoomConfiguration = z.infer<typeof CreateRoomConfigurationZ>;

export const roomConfigurationContract = initContract().router({
  getRoomConfigurations: {
    summary: "Get room configurations",
    method: "GET",
    path: basePath,
    query: z
      .object({
        tenantOID: z.string(),
      })
      .passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createRoomConfiguration: {
    summary: "Create a new room configuration",
    method: "POST",
    path: basePath,
    body: CreateRoomConfigurationZ,
    responses: {
      200: z.string(),
    },
  },

  updateRoomConfigurations: {
    summary: "Update multiple existing room configurations",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string().describe("OID of room configuration to update"), UpdateRoomConfigurationZ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated room configurations")),
    },
  },

  deleteRoomConfigurations: {
    summary: "Delete multiple room configurations",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      roomConfigurationOIDs: z.array(z.string().describe("OIDs of room configurations to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
