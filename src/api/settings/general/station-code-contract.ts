import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { StationCodeZ } from "../../../entities/Settings/General/StationCode";


const basePath = "/api/settings/station-codes";

const CreateStationCodeZ = StationCodeZ.pick({
  tenantOID: true,
  code: true,
  isActive: true,
  seq: true,
}).extend({
  departmentOIDs: z.array(z.string()).optional(),
});

const UpdateStationCodeZ = CreateStationCodeZ.omit({
  tenantOID: true,
}).partial();

export type UpdateStationCode = z.infer<typeof UpdateStationCodeZ>;
export type CreateStationCode = z.infer<typeof CreateStationCodeZ>;

export const stationCodeContract = initContract().router({
  getStationCodes: {
    summary: "Get station codes",
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

  createStationCode: {
    summary: "Create a new station code",
    method: "POST",
    path: basePath,
    body: CreateStationCodeZ,
    responses: {
      200: z.string(),
    },
  },

  updateStationCode: {
    summary: "Update an existing station code",
    method: "PATCH",
    path: `${basePath}/:stationCodeOID`,
    body: UpdateStationCodeZ,
    responses: {
      200: z.string(),
    },
  },

  updateStationCodes: {
    summary: "Update multiple existing station codes",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of station code to update"),
      UpdateStationCodeZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated station codes")),
    },
  },

  deleteStationCode: {
    summary: "Delete a station code",
    method: "DELETE",
    path: `${basePath}/:stationCodeOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteStationCodes: {
    summary: "Delete multiple station codes",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      stationCodeOIDs: z.array(z.string().describe("OIDs of station codes to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
