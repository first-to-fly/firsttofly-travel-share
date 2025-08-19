import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/misc/airline-meal-codes";

// Schema definitions
const MealCodeZ = z.object({
  code: z.string().describe("The IATA meal code. Example: AVML, VGML, KSML"),
  name: z.string().describe("The full name of the meal code. Example: Asian Vegetarian Meal"),
  description: z.string().describe("Detailed description of the meal type"),
  category: z.string().describe("The category of the meal. Example: vegetarian, religious, medical"),
});

const AirlineMealCodeZ = z.object({
  airlineCode: z.string().describe("The IATA code of the airline. Example: SQ, EK, QF"),
  airlineName: z.string().describe("The full name of the airline. Example: Singapore Airlines"),
  supportedMealCodes: z.array(z.string()).describe("Array of supported IATA meal codes for this airline"),
});

const GetMealCodesByAirlineResponseZ = z.object({
  airline: AirlineMealCodeZ,
  supportedMealCodes: z.array(MealCodeZ).describe("Array of meal codes supported by this airline"),
});

// Export the contract
export const airlineMealCodeContract = initContract().router({
  getAllSupportedAirlines: {
    summary: "Get all airlines that support meal codes",
    method: "GET",
    path: `${basePath}/airlines`,
    responses: {
      200: z.array(AirlineMealCodeZ),
    },
  },

  getAllSupportedMealCodes: {
    summary: "Get all supported meal codes across all airlines",
    method: "GET",
    path: `${basePath}/mealCodes`,
    responses: {
      200: z.array(MealCodeZ),
    },
  },

  getMealCodesByAirline: {
    summary: "Get meal codes supported by a specific airline",
    method: "GET",
    path: `${basePath}/airlines/:airlineCode/mealCodes`,
    responses: {
      200: GetMealCodesByAirlineResponseZ,
      404: z.object({ message: z.string() }),
    },
  },
});

// Export types
export type MealCode = z.infer<typeof MealCodeZ>;
export type AirlineMealCode = z.infer<typeof AirlineMealCodeZ>;
export type GetMealCodesByAirlineResponse = z.infer<typeof GetMealCodesByAirlineResponseZ>;
