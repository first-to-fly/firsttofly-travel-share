import { initContract } from "@ts-rest/core";
import { PageListIdsResponseZ } from "types/pageListIdsResponse";
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
      page: z.string().optional(),
      pageSize: z.string().optional(),
      name: z.string().optional(),
      parentId: z.string().optional(),
      sectorGroupId: z.string().optional(),
      isActive: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
    },
  },

  createSector: {
    summary: "Create a new sector",
    method: "POST",
    path: basePath,
    body: SectorZ.pick({
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
  getSectorGroups: {
    summary: "Get sector groups with pagination and filtering",
    method: "GET",
    path: sectorGroupBasePath,
    query: z.object({
      page: z.string().optional(),
      pageSize: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
    },
  },

  createSectorGroup: {
    summary: "Create a new sector group",
    method: "POST",
    path: sectorGroupBasePath,
    body: SectorGroupZ.pick({
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
