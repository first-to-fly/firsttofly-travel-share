import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { MealZ } from "../../../entities/Settings/Product/Meal";


const basePath = "/api/settings/meals";

const UpdateMealZ = MealZ.pick({
  code: true,
  type: true,
  seq: true,
}).extend({
  description: z.string().nullish(),
  offlineOperator: z.string().nullish(),
});

const CreateMealZ = UpdateMealZ.extend({
  tenantOID: z.string(),
});

export type UpdateMeal = z.infer<typeof UpdateMealZ>;
export type CreateMeal = z.infer<typeof CreateMealZ>;

export const mealContract = initContract().router({
  getMeals: {
    summary: "Get meals",
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

  createMeal: {
    summary: "Create a new meal",
    method: "POST",
    path: basePath,
    body: CreateMealZ,
    responses: {
      200: z.string(),
    },
  },

  updateMeal: {
    summary: "Update an existing meal",
    method: "PATCH",
    path: `${basePath}/:mealOID`,
    body: UpdateMealZ,
    responses: {
      200: z.string(),
    },
  },

  updateMeals: {
    summary: "Update multiple existing meals",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of meal to update"),
      UpdateMealZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated meals")),
    },
  },

  deleteMeal: {
    summary: "Delete a meal",
    method: "DELETE",
    path: `${basePath}/:mealOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteMeals: {
    summary: "Delete multiple meals",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      mealOIDs: z.array(z.string().describe("OIDs of meals to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
