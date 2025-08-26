import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { StationCodeZ } from "../../../entities/Settings/General/StationCode";
import { FTFSafeMaxNumberZ } from "../../../types/number";


const basePath = "/api/settings/station-codes";

const CreateStationCodeZ = StationCodeZ.pick({
  tenantOID: true,
  code: true,
  seq: true,
}).extend({
  isActive: z.boolean().optional(),
  departmentOIDs: z.array(z.string()).optional(),
});

const UpdateStationCodeZ = z.object({
  code: z.string().min(1, "Station code is required").max(50, "Station code must be 50 characters or less").optional(),
  isActive: z.boolean().optional(),
  seq: FTFSafeMaxNumberZ({
    max: 99999999,
    name: "Sequence",
  }).int().nonnegative().optional(),
  departmentOIDs: z.array(z.string()).optional(),
});

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
