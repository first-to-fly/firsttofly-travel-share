import { initContract } from "@ts-rest/core";
import { PageListIdsResponseZ } from "types/pageListIdsResponse";
import { z } from "zod";

import { RoomConfigZ } from "../../../entities/Settings/Product";


const basePath = "/api/settings/room-configs";


export const roomConfigContract = initContract().router({
  getRoomConfigs: {
    summary: "Get room configurations with pagination and filtering",
    method: "GET",
    path: basePath,
    query: z.object({
      page: z.string().optional(),
      pageSize: z.string().optional(),
      name: z.string().optional(),
      coverageType: z.string().optional(),
      isActive: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
    },
  },

  createRoomConfig: {
    summary: "Create a new room configuration",
    method: "POST",
    path: basePath,
    body: RoomConfigZ.pick({
      name: true,
      coverageType: true,
      childNoBedStartAge: true,
      childNoBedEndAge: true,
      remarks: true,
      isActive: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateRoomConfig: {
    summary: "Update an existing room configuration",
    method: "PATCH",
    path: `${basePath}/:roomConfigId`,
    body: RoomConfigZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteRoomConfig: {
    summary: "Delete a room configuration",
    method: "DELETE",
    path: `${basePath}/:roomConfigId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
