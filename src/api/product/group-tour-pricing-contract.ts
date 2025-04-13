import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { GroupTourPricingZ } from "../../entities/Product/GroupTourPricing";


const basePath = "/api/products/group-tours-pricings";

// Create/Update schemas
const UpdateGroupTourPricingZ = GroupTourPricingZ.pick({
  groupTourCostingOID: true,
  name: true,
  code: true,

  remarks: true,
  targetYieldPercentage: true,

  validityStartDate: true,
  validityEndDate: true,

  isActive: true,

  fullFare: true,
  landFare: true,
  airportTax: true,

  groupTourPricingEntries: true,
});

const CreateGroupTourPricingZ = UpdateGroupTourPricingZ.extend({
  groupTourProductOID: z.string(),
  tenantOID: z.string(),
});

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
