import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { LocationZ } from "../../entities/Settings/Location";


const basePath = "/api/settings/locations";

export const locationContract = initContract().router({
  getLocations: {
    summary: "Get locations with pagination and filtering",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOid: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createLocation: {
    summary: "Create a new location",
    method: "POST",
    path: basePath,
    body: LocationZ.pick({
      tenantOid: true,
      name: true,
      description: true,
      type: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateLocation: {
    summary: "Update an existing location",
    method: "PATCH",
    path: `${basePath}/:locationOid`,
    body: LocationZ.pick({
      name: true,
      description: true,
      type: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateLocations: {
    summary: "Update multiple existing locations",
    method: "PATCH",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of location to update"),
      LocationZ.pick({
        name: true,
        description: true,
        type: true,
      }),
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated locations")),
    },
  },

  deleteLocation: {
    summary: "Delete a location",
    method: "DELETE",
    path: `${basePath}/:locationOid`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteLocations: {
    summary: "Delete multiple locations",
    method: "DELETE",
    path: `${basePath}/batch-delete`,
    body: z.object({
      locationOids: z.array(z.string().describe("OIDs of locations to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
