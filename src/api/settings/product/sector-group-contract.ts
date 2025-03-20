import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SectorGroupZ } from "../../../entities/Settings/Product/SectorGroup";


const basePath = "/api/settings/sector-groups";

const UpdateSectorGroupZ = SectorGroupZ.pick({
  name: true,
  isActive: true,
  sectorOIDs: true,
});

export type UpdateSectorGroup = z.infer<typeof UpdateSectorGroupZ>;

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
    body: SectorGroupZ.pick({
      tenantOID: true,
      name: true,
      isActive: true,
      sectorOIDs: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateSectorGroup: {
    summary: "Update an existing sector group",
    method: "PATCH",
    path: `${basePath}/:sectorGroupOID`,
    body: UpdateSectorGroupZ,
    responses: {
      200: z.string(),
    },
  },

  deleteSectorGroup: {
    summary: "Delete a sector group",
    method: "DELETE",
    path: `${basePath}/:sectorGroupOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
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
