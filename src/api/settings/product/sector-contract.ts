import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SectorZ } from "../../../entities/Settings/Product";


const basePath = "/api/settings/sectors";

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
      parentOID: true,
      isActive: true,
      isPopular: true,
      images: true,
      productTypeOIDs: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateSector: {
    summary: "Update an existing sector",
    method: "PATCH",
    path: `${basePath}/:sectorOID`,
    body: SectorZ.pick({
      name: true,
      parentOID: true,
      isActive: true,
      isPopular: true,
      images: true,
      productTypeOIDs: true,
    }),
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

});
