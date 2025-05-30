import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { GroupTourPricingZ } from "../../entities/Products/GroupTourPricing";


const basePath = "/api/products/group-tour-pricings";

// Create/Update schemas
const CreateGroupTourPricingZ = GroupTourPricingZ.omit({
  oid: true,
  entityType: true,
  createdBy: true,
  updatedBy: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const UpdateGroupTourPricingZ = CreateGroupTourPricingZ.omit({
  tenantOID: true,
  groupTourProductOID: true,
}).partial();

export type UpdateGroupTourPricing = z.infer<typeof UpdateGroupTourPricingZ>;
export type CreateGroupTourPricing = z.infer<typeof CreateGroupTourPricingZ>;

export const groupTourPricingContract = initContract().router({
  getGroupTourPricings: {
    summary: "Get group tour pricings",
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

  createGroupTourPricing: {
    summary: "Create a new group tour pricing",
    method: "POST",
    path: `${basePath}`,
    body: CreateGroupTourPricingZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourPricings: {
    summary: "Update multiple existing group tour pricings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of group tour pricing to update"),
      UpdateGroupTourPricingZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated group tour pricings")),
    },
  },

  deleteGroupTourPricings: {
    summary: "Delete multiple group tour pricings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      pricingOIDs: z.array(z.string().describe("OIDs of group tour pricings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
