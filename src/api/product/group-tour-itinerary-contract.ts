import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { GroupTourItineraryZ } from "../../entities/Product/GroupTourItinerary";


const basePath = "/api/group-tour";

// Create/Update schemas
const UpdateGroupTourItineraryZ = GroupTourItineraryZ.pick({
  name: true,
  validityStartDate: true,
  validityEndDate: true,
  isActive: true,
});

const CreateGroupTourItineraryZ = UpdateGroupTourItineraryZ.extend({
  groupTourProductOID: z.string(),
  tenantOID: z.string(),
});

export type UpdateGroupTourItinerary = z.infer<typeof UpdateGroupTourItineraryZ>;
export type CreateGroupTourItinerary = z.infer<typeof CreateGroupTourItineraryZ>;

export const groupTourItineraryContract = initContract().router({
  getGroupTourItineraries: {
    summary: "Get group tour itineraries",
    method: "GET",
    path: `${basePath}/products/:productOID/itineraries`,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createGroupTourItinerary: {
    summary: "Create a new group tour itinerary",
    method: "POST",
    path: `${basePath}/products/:productOID/itineraries`,
    body: CreateGroupTourItineraryZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourItinerary: {
    summary: "Update an existing group tour itinerary",
    method: "PATCH",
    path: `${basePath}/products/:productOID/itineraries/:itineraryOID`,
    body: UpdateGroupTourItineraryZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourItineraries: {
    summary: "Update multiple existing group tour itineraries",
    method: "POST",
    path: `${basePath}/products/:productOID/itineraries/batch-update`,
    body: z.record(
      z.string().describe("OID of group tour itinerary to update"),
      UpdateGroupTourItineraryZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated group tour itineraries")),
    },
  },

  deleteGroupTourItinerary: {
    summary: "Delete a group tour itinerary",
    method: "DELETE",
    path: `${basePath}/products/:productOID/itineraries/:itineraryOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteGroupTourItineraries: {
    summary: "Delete multiple group tour itineraries",
    method: "POST",
    path: `${basePath}/products/:productOID/itineraries/batch-delete`,
    body: z.object({
      itineraryOIDs: z.array(z.string().describe("OIDs of group tour itineraries to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
