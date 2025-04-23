import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SectorGroupZ } from "../../../entities/Settings/Product/SectorGroup";


const basePath = "/api/settings/sector-groups";

const CreateSectorGroupZ = SectorGroupZ.pick({
  tenantOID: true,
  name: true,
  isActive: true,
  sectorOIDs: true,
});

const UpdateSectorGroupZ = CreateSectorGroupZ.omit({
  tenantOID: true,
}).partial();

export type UpdateSectorGroup = z.infer<typeof UpdateSectorGroupZ>;
export type CreateSectorGroup = z.infer<typeof CreateSectorGroupZ>;

export const sectorGroupContract = initContract().router({
  getSectorGroups: {
    summary: "Get sector groups",
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

  createSectorGroup: {
    summary: "Create a new sector group",
    method: "POST",
    path: basePath,
    body: CreateSectorGroupZ,
    responses: {
      200: z.string(),
    },
  },

  updateSectorGroups: {
    summary: "Update multiple existing sector groups",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of sector group to update"),
      UpdateSectorGroupZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated sector groups")),
    },
  },

  deleteSectorGroups: {
    summary: "Delete multiple sector groups",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      sectorGroupOIDs: z.array(z.string().describe("OIDs of sector groups to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
