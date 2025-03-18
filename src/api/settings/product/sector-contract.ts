import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SectorGroupZ, SectorZ } from "../../../entities/Settings/Product";


const basePath = "/api/settings/sectors";
const sectorGroupBasePath = "/api/settings/sector-groups";


export const sectorContract = initContract().router({
  getSectors: {
    summary: "Get sectors with pagination and filtering",
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

  createSector: {
    summary: "Create a new sector",
    method: "POST",
    path: basePath,
    body: SectorZ.pick({
      tenantOID: true,
      name: true,
      parentId: true,
      sectorGroupId: true,
      isActive: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateSector: {
    summary: "Update an existing sector",
    method: "PATCH",
    path: `${basePath}/:sectorId`,
    body: SectorZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteSector: {
    summary: "Delete a sector",
    method: "DELETE",
    path: `${basePath}/:sectorId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  // SectorGroup methods
  getSectorDepartments: {
    summary: "Get sector groups with pagination and filtering",
    method: "GET",
    path: sectorGroupBasePath,
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
    path: sectorGroupBasePath,
    body: SectorGroupZ.pick({
      tenantOID: true,
      name: true,
      description: true,
      sectorIds: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateSectorGroup: {
    summary: "Update an existing sector group",
    method: "PATCH",
    path: `${sectorGroupBasePath}/:sectorGroupId`,
    body: SectorGroupZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteSectorGroup: {
    summary: "Delete a sector group",
    method: "DELETE",
    path: `${sectorGroupBasePath}/:sectorGroupId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
