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
    body: LocationZ,
    responses: {
      200: z.string(),
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
});
