import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SectorZ } from "../../../entities/Settings/Product/Sector";


const basePath = "/api/settings/sectors";

const CreateSectorZ = SectorZ.pick({
  tenantOID: true,
  name: true,
  parentOID: true,
  isActive: true,
  isPopular: true,
  images: true,
  productTypes: true,
  departmentOID: true,
});

const UpdateSectorZ = CreateSectorZ.omit({
  tenantOID: true,
}).partial();

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
      200: z.object({
        oids: z.array(z.string().describe("OIDs of sectors")),
      }),
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
