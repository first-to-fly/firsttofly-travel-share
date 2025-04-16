import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { RoomConfigurationZ } from "../../../entities/Settings/Product/RoomConfiguration";


const basePath = "/api/settings/room-configurations";

const CreateRoomConfigurationZ = RoomConfigurationZ.pick({
  tenantOID: true,
  name: true,
  isActive: true,
  remarks: true,
  childWithoutBedStartAge: true,
  childWithoutBedEndAge: true,
  typeNames: true,
  checkChart: true,
  sectorOIDs: true,
  sectorGroupOIDs: true,
  productOIDs: true,
});

const UpdateRoomConfigurationZ = CreateRoomConfigurationZ.omit({
  tenantOID: true,
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

  updateRoomConfiguration: {
    summary: "Update an existing room configuration",
    method: "PATCH",
    path: `${basePath}/:roomConfigurationOID`,
    body: UpdateRoomConfigurationZ,
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

  deleteRoomConfiguration: {
    summary: "Delete a room configuration",
    method: "DELETE",
    path: `${basePath}/:roomConfigurationOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
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
