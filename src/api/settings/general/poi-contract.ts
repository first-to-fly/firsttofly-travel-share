import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { POIZ } from "../../../entities/Settings/General/POI";


const basePath = "/api/settings/pois";

const UpdatePOIZ = POIZ.pick({
  name: true,
  address: true,
  type: true,
  country: true,
  area: true,
  category: true,
  description: true,
  position: true,
  images: true,
  additionalInfo: true,
});

const CreatePOIZ = UpdatePOIZ.extend({
  tenantOID: z.string(),
});

export type UpdatePOI = z.infer<typeof UpdatePOIZ>;
export type CreatePOI = z.infer<typeof CreatePOIZ>;

export const poiContract = initContract().router({
  getPOIs: {
    summary: "Get points of interest",
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

  createPOI: {
    summary: "Create a new point of interest",
    method: "POST",
    path: basePath,
    body: CreatePOIZ,
    responses: {
      200: z.string(),
    },
  },

  updatePOI: {
    summary: "Update an existing point of interest",
    method: "PATCH",
    path: `${basePath}/:poiOID`,
    body: UpdatePOIZ,
    responses: {
      200: z.string(),
    },
  },

  updatePOIs: {
    summary: "Update multiple existing points of interest",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of point of interest to update"),
      UpdatePOIZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated points of interest")),
    },
  },

  deletePOI: {
    summary: "Delete a point of interest",
    method: "DELETE",
    path: `${basePath}/:poiOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deletePOIs: {
    summary: "Delete multiple points of interest",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      poiOIDs: z.array(z.string().describe("OIDs of points of interest to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
