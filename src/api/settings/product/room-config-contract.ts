import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { RoomConfigZ } from "../../../entities/Settings/Product/RoomConfig";


const basePath = "/api/settings/room-configs";

const CreateRoomConfigZ = RoomConfigZ.pick({
  tenantOID: true,
  name: true,
  coverageType: true,
  childNoBedStartAge: true,
  childNoBedEndAge: true,
  remarks: true,
  isActive: true,
});

const UpdateRoomConfigZ = CreateRoomConfigZ.omit({
  tenantOID: true,
}).partial();

export type UpdateRoomConfig = z.infer<typeof UpdateRoomConfigZ>;
export type CreateRoomConfig = z.infer<typeof CreateRoomConfigZ>;


export const roomConfigContract = initContract().router({
  getRoomConfigs: {
    summary: "Get room configurations",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createRoomConfig: {
    summary: "Create a new room configuration",
    method: "POST",
    path: basePath,
    body: CreateRoomConfigZ,
    responses: {
      200: z.string(),
    },
  },

  updateRoomConfig: {
    summary: "Update an existing room configuration",
    method: "PATCH",
    path: `${basePath}/:roomConfigOID`,
    body: UpdateRoomConfigZ,
    responses: {
      200: z.string(),
    },
  },

  deleteRoomConfig: {
    summary: "Delete a room configuration",
    method: "DELETE",
    path: `${basePath}/:roomConfigOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
