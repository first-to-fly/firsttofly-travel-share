import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/iata";

export const iataContract = initContract().router({
  getAirlineByCode: {
    method: "PUT",
    path: `${basePath}/airline`,
    summary: "Search airlines by query",
    body: z.object({
      query: z.string().describe("Query to search"),
    }),
    responses: {
      200: z.object({
        airline: z.array(
          z.object({
            name: z.string(),
            code: z.string(),
            country: z.string(),
          }),
        ),
      }),
    },
  },
  getAirportsByCode: {
    method: "PUT",
    path: `${basePath}/airport`,
    summary: "Search airports by query",
    body: z.object({
      query: z.string().describe("Query to search"),
    }),
    responses: {
      200: z.object({
        airports: z.array(
          z.object({
            airportName: z.string(),
            code: z.string(),
            cityName: z.string(),
          }),
        ),
      }),
    },
  },
});
