import { initContract } from "@ts-rest/core";
import { PageListIdsResponseZ } from "types/pageListIdsResponse";
import { z } from "zod";

import { MealZ } from "../../../entities/Settings/Product";


const basePath = "/api/settings/meals";


export const mealContract = initContract().router({
  getMeals: {
    summary: "Get meals with pagination and filtering",
    method: "GET",
    path: basePath,
    query: z.object({
      page: z.string().optional(),
      pageSize: z.string().optional(),
      type: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
    },
  },

  createMeal: {
    summary: "Create a new meal",
    method: "POST",
    path: basePath,
    body: MealZ.pick({
      code: true,
      description: true,
      type: true,
      seq: true,
      offlineOperator: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateMeal: {
    summary: "Update an existing meal",
    method: "PATCH",
    path: `${basePath}/:mealId`,
    body: MealZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteMeal: {
    summary: "Delete a meal",
    method: "DELETE",
    path: `${basePath}/:mealId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

});
