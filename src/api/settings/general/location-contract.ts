import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { LocationZ } from "../../../entities/Settings/General/Location";


const basePath = "/api/settings/locations";

const CreateLocationZ = LocationZ.pick({
  tenantOID: true,
  name: true,
  type: true,
  description: true,
});

const UpdateLocationZ = CreateLocationZ.omit({
  tenantOID: true,
}).partial();

export type UpdateLocation = z.infer<typeof UpdateLocationZ>;
export type CreateLocation = z.infer<typeof CreateLocationZ>;

export const locationContract = initContract().router({
  getLocations: {
    summary: "Get locations",
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

  createLocation: {
    summary: "Create a new location",
    method: "POST",
    path: basePath,
    body: CreateLocationZ,
    responses: {
      200: z.string(),
    },
  },

  updateLocation: {
    summary: "Update an existing location",
    method: "PATCH",
    path: `${basePath}/:locationOID`,
    body: UpdateLocationZ,
    responses: {
      200: z.string(),
    },
  },

  updateLocations: {
    summary: "Update multiple existing locations",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of location to update"),
      UpdateLocationZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated locations")),
    },
  },

  deleteLocation: {
    summary: "Delete a location",
    method: "DELETE",
    path: `${basePath}/:locationOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteLocations: {
    summary: "Delete multiple locations",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      locationOIDs: z.array(z.string().describe("OIDs of locations to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
