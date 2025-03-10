import { initContract } from "@ts-rest/core";
import { PageListIdsResponseZ } from "types/pageListIdsResponse";
import { z } from "zod";

import { BadgeZ } from "../../../entities/Settings/Product";


const basePath = "/api/settings/badges";

export const badgeContract = initContract().router({
  getBadges: {
    summary: "Get badges with pagination and filtering",
    method: "GET",
    path: basePath,
    query: z.object({
      page: z.string().optional(),
      pageSize: z.string().optional(),
      isActive: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
    },
  },

  createBadge: {
    summary: "Create a new badge",
    method: "POST",
    path: basePath,
    body: BadgeZ.pick({
      isActive: true,
      icon: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateBadge: {
    summary: "Update an existing badge",
    method: "PATCH",
    path: `${basePath}/:badgeId`,
    body: BadgeZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteBadge: {
    summary: "Delete a badge",
    method: "DELETE",
    path: `${basePath}/:badgeId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
