import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SectorZ } from "../../../entities/Settings/Product/Sector";


const basePath = "/api/settings/sectors";

const UpdateSectorZ = SectorZ.pick({
  name: true,
  parentOID: true,
  isActive: true,
  isPopular: true,
  images: true,
  productTypeOIDs: true,
  departmentOID: true,
});

const CreateSectorZ = UpdateSectorZ.extend({
  tenantOID: z.string(),
});

export type UpdateSector = z.infer<typeof UpdateSectorZ>;
export type CreateSector = z.infer<typeof CreateSectorZ>;

export const sectorContract = initContract().router({
  getSectors: {
    summary: "Get sectors",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.array(SectorZ), // Return full sector objects
    },
  },

  createSector: {
    summary: "Create a new sector",
    method: "POST",
    path: basePath,
    body: CreateSectorZ,
    responses: {
      200: z.string(),
    },
  },

  updateSector: {
    summary: "Update an existing sector",
    method: "PATCH",
    path: `${basePath}/:sectorOID`,
    body: UpdateSectorZ,
    responses: {
      200: z.string(),
    },
  },

  deleteSector: {
    summary: "Delete a sector",
    method: "DELETE",
    path: `${basePath}/:sectorOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  updateSectors: {
    summary: "Update multiple existing sectors",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of sector to update"),
      UpdateSectorZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated sectors")),
    },
  },

  deleteSectors: {
    summary: "Delete multiple sectors",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      sectorOIDs: z.array(z.string().describe("OIDs of sectors to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
