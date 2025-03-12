import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { BadgeZ } from "../../../entities/Settings/Product";


const basePath = "/api/settings/badges";

export const badgeContract = initContract().router({
  getBadges: {
    summary: "Get badges with pagination and filtering",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOid: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createBadge: {
    summary: "Create a new badge",
    method: "POST",
    path: basePath,
    body: BadgeZ.pick({
      tenantOid: true,
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
