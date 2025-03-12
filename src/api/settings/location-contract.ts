import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { LocationZ } from "../../entities/Settings/Location";


const basePath = "/api/settings/locations";

export const locationContract = initContract().router({
  getLocations: {
    summary: "Get locations with pagination and filtering",
    method: "GET",
    path: basePath,
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
    path: `${basePath}/:locationId`,
    body: LocationZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteLocation: {
    summary: "Delete a location",
    method: "DELETE",
    path: `${basePath}/:locationId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
