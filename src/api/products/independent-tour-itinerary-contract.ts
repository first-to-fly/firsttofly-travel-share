import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { IndependentTourItineraryDayZ, IndependentTourItineraryEventZ, IndependentTourItineraryMealZ, IndependentTourItineraryZ } from "../../entities/Products/IndependentTourItinerary";


const basePath = "/api/products/independent-tour-itineraries";

// Create/Update schemas
const CreateIndependentTourItineraryMealZ = IndependentTourItineraryMealZ.pick({
  type: true,
  title: true,
  description: true,
  provided: true,
  onBoard: true,
  poiOID: true,
});

const UpdateIndependentTourItineraryMealZ = CreateIndependentTourItineraryMealZ.extend({
  oid: z.string().optional(),
}).partial();

const CreateIndependentTourItineraryEventZ = IndependentTourItineraryEventZ.pick({
  title: true,
  description: true,
  poiOID: true,
});

const UpdateIndependentTourItineraryEventZ = CreateIndependentTourItineraryEventZ.extend({
  oid: z.string().optional(),
}).partial();

const CreateIndependentTourItineraryDayZ = IndependentTourItineraryDayZ.pick({
  dayNumber: true,
  title: true,
  description: true,
}).extend({
  independentTourItineraryMeals: z.array(CreateIndependentTourItineraryMealZ),
  independentTourItineraryEvents: z.array(CreateIndependentTourItineraryEventZ),
});

const UpdateIndependentTourItineraryDayZ = CreateIndependentTourItineraryDayZ.omit({
  independentTourItineraryMeals: true,
  independentTourItineraryEvents: true,
}).extend({
  oid: z.string().optional(),
  independentTourItineraryMeals: z.array(UpdateIndependentTourItineraryMealZ),
  independentTourItineraryEvents: z.array(UpdateIndependentTourItineraryEventZ),
}).partial();

const CreateIndependentTourItineraryZ = IndependentTourItineraryZ.pick({
  name: true,
  validityStartDate: true,
  validityEndDate: true,
  isActive: true,
  independentTourProductOID: true,
  tenantOID: true,
  pdfs: true,
}).extend({
  independentTourItineraryDays: z.array(CreateIndependentTourItineraryDayZ),
});

const UpdateIndependentTourItineraryZ = CreateIndependentTourItineraryZ.omit({
  independentTourProductOID: true,
  tenantOID: true,
  independentTourItineraryDays: true,
}).extend({
  independentTourItineraryDays: z.array(UpdateIndependentTourItineraryDayZ),
}).partial();

export type UpdateIndependentTourItinerary = z.infer<typeof UpdateIndependentTourItineraryZ>;
export type CreateIndependentTourItinerary = z.infer<typeof CreateIndependentTourItineraryZ>;

export const independentTourItineraryContract = initContract().router({
  getIndependentTourItineraries: {
    summary: "Get independent tour itineraries",
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

  createIndependentTourItinerary: {
    summary: "Create a new independent tour itinerary",
    method: "POST",
    path: `${basePath}`,
    body: CreateIndependentTourItineraryZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourItineraries: {
    summary: "Update multiple existing independent tour itineraries",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of independent tour itinerary to update"),
      UpdateIndependentTourItineraryZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated independent tour itineraries")),
    },
  },

  deleteIndependentTourItineraries: {
    summary: "Delete multiple independent tour itineraries",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      itineraryOIDs: z.array(z.string().describe("OIDs of independent tour itineraries to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
