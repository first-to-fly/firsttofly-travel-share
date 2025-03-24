import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { BadgeZ } from "../../../entities/Settings/Product/Badge";


const basePath = "/api/settings/badges";

const UpdateBadgeZ = BadgeZ.pick({
  image: true,
  isActive: true,
  icon: true,
});

const CreateBadgeZ = UpdateBadgeZ.extend({
  tenantOID: z.string(),
});

export type UpdateBadge = z.infer<typeof UpdateBadgeZ>;
export type CreateBadge = z.infer<typeof CreateBadgeZ>;

export const badgeContract = initContract().router({
  getBadges: {
    summary: "Get badges",
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

  createBadge: {
    summary: "Create a new badge",
    method: "POST",
    path: basePath,
    body: CreateBadgeZ,
    responses: {
      200: z.string(),
    },
  },

  updateBadge: {
    summary: "Update an existing badge",
    method: "PATCH",
    path: `${basePath}/:badgeOID`,
    body: UpdateBadgeZ,
    responses: {
      200: z.string(),
    },
  },

  updateBadges: {
    summary: "Update multiple existing badges",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of badge to update"),
      UpdateBadgeZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated badges")),
    },
  },

  deleteBadge: {
    summary: "Delete a badge",
    method: "DELETE",
    path: `${basePath}/:badgeOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteBadges: {
    summary: "Delete multiple badges",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      badgeOIDs: z.array(z.string().describe("OIDs of badges to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
