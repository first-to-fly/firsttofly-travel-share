import { initContract } from "@ts-rest/core";
import { z } from "zod";

// Define a schema for a single activity item (adjust properties as needed)
const ActivitySchema = z.object({
  logID: z.number(),
  oid: z.string(),
  attribute: z.string().optional(),
  action: z.string(), // Consider using an enum schema if applicable
  userOID: z.string(),
  logFormat: z.string(),
  logParams: z.array(z.object({
    key: z.string(),
    value: z.any(),
  })), // Define more strictly if possible
  createdAt: z.string(),
});


const c = initContract();

export const activityContract = c.router({
  getActivitiesByOID: {
    method: "GET",
    path: "/activities/:oid",
    pathParams: z.object({
      oid: z.string().describe("The Object ID (OID) to fetch activities for"),
    }),
    query: z.object({
      limit: z.coerce.number().int().min(1).max(100)
        .optional()
        .describe("Maximum number of activities to return (default 100)"),
      lastLogID: z.coerce.number().int().min(0).optional()
        .describe("Fetch activities older than this log ID (for cursor pagination)"),
    }),
    responses: {
      200: z.array(ActivitySchema),
      // Add other potential responses like 404 Not Found, 400 Bad Request, 500 Server Error
    },
    summary: "Get activities for a specific OID using cursor pagination",
    description: "Retrieves a list of activity logs associated with the given Object ID (OID), ordered by creation date descending. Supports cursor-based pagination using `limit` and `lastLogID`.",
  },
  // Add other activity-related endpoints here if needed
});

// Export types for convenience (optional but recommended)
export type IActivityContract = typeof activityContract;
export type Activity = z.infer<typeof ActivitySchema>;
