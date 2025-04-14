import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { GroupTourItineraryDayZ, GroupTourItineraryEventZ, GroupTourItineraryMealZ, GroupTourItineraryZ } from "../../entities/Products/GroupTourItinerary";


const basePath = "/api/products/group-tours-itineraries";

// Create/Update schemas
const CreateGroupTourItineraryMealZ = GroupTourItineraryMealZ.pick({
  type: true,
  title: true,
  description: true,
  provided: true,
  onBoard: true,
  poiOID: true,
});

const UpdateGroupTourItineraryMealZ = CreateGroupTourItineraryMealZ.extend({
  oid: z.string().optional(),
}).partial();

const CreateGroupTourItineraryEventZ = GroupTourItineraryEventZ.pick({
  title: true,
  description: true,
  poiOID: true,
});

const UpdateGroupTourItineraryEventZ = CreateGroupTourItineraryEventZ.extend({
  oid: z.string().optional(),
}).partial();

const CreateGroupTourItineraryDayZ = GroupTourItineraryDayZ.pick({
  dayNumber: true,
  title: true,
  description: true,
}).extend({
  groupTourItineraryMeals: z.array(CreateGroupTourItineraryMealZ),
  groupTourItineraryEvents: z.array(CreateGroupTourItineraryEventZ),
});

const UpdateGroupTourItineraryDayZ = CreateGroupTourItineraryDayZ.omit({
  groupTourItineraryMeals: true,
  groupTourItineraryEvents: true,
}).extend({
  oid: z.string().optional(),
  groupTourItineraryMeals: z.array(UpdateGroupTourItineraryMealZ),
  groupTourItineraryEvents: z.array(UpdateGroupTourItineraryEventZ),
}).partial();

const CreateGroupTourItineraryZ = GroupTourItineraryZ.pick({
  name: true,
  validityStartDate: true,
  validityEndDate: true,
  isActive: true,
  groupTourProductOID: true,
  tenantOID: true,
}).extend({
  groupTourItineraryDays: z.array(CreateGroupTourItineraryDayZ),
});

const UpdateGroupTourItineraryZ = CreateGroupTourItineraryZ.omit({
  groupTourProductOID: true,
  tenantOID: true,
  groupTourItineraryDays: true,
}).extend({
  groupTourItineraryDays: z.array(UpdateGroupTourItineraryDayZ),
}).partial();

export type UpdateGroupTourItinerary = z.infer<typeof UpdateGroupTourItineraryZ>;
export type CreateGroupTourItinerary = z.infer<typeof CreateGroupTourItineraryZ>;

export const groupTourItineraryContract = initContract().router({
  getGroupTourItineraries: {
    summary: "Get group tour itineraries",
    method: "GET",
    path: `${basePath}`,
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
    path: `${basePath}`,
    body: CreateGroupTourItineraryZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourItineraries: {
    summary: "Update multiple existing group tour itineraries",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of group tour itinerary to update"),
      UpdateGroupTourItineraryZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated group tour itineraries")),
    },
  },

  deleteGroupTourItineraries: {
    summary: "Delete multiple group tour itineraries",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      itineraryOIDs: z.array(z.string().describe("OIDs of group tour itineraries to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
