import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { GroupTourCostingEntryZ, GroupTourCostingZ } from "../../entities/Product/GroupTourCosting";


const basePath = "/api/group-tour";

// Create/Update schemas
const UpdateGroupTourCostingZ = GroupTourCostingZ.pick({
  templateOID: true,
  name: true,
  code: true,
  remarks: true,
  validityStartDate: true,
  validityEndDate: true,
  landTourGroupSizeTiers: true,
  freeOfChargeTiers: true,
  leadManagerCountTiers: true,
  isActive: true,
  airlineOIDs: true,
}).extend({
  groupTourCostingEntries: z.array(GroupTourCostingEntryZ.pick({
    category: true,
    calculationBasis: true,
    applyToPackageType: true,
    applyToOccupancyType: true,
    remarks: true,
    quantity: true,
    isTieredPrice: true,
    currency: true,
    prices: true,
  }).extend({
    oid: z.string().optional(),
  })),
});

const CreateGroupTourCostingZ = UpdateGroupTourCostingZ.extend({
  groupTourProductOID: z.string(),
  tenantOID: z.string(),
});

export type UpdateGroupTourCosting = z.infer<typeof UpdateGroupTourCostingZ>;
export type CreateGroupTourCosting = z.infer<typeof CreateGroupTourCostingZ>;

export const groupTourCostingContract = initContract().router({
  getGroupTourCostings: {
    summary: "Get group tour costings",
    method: "GET",
    path: `${basePath}/products/:productOID/costings`,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createGroupTourCosting: {
    summary: "Create a new group tour costing",
    method: "POST",
    path: `${basePath}/products/:productOID/costings`,
    body: CreateGroupTourCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourCosting: {
    summary: "Update an existing group tour costing",
    method: "PATCH",
    path: `${basePath}/products/:productOID/costings/:costingOID`,
    body: UpdateGroupTourCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourCostings: {
    summary: "Update multiple existing group tour costings",
    method: "POST",
    path: `${basePath}/products/:productOID/costings/batch-update`,
    body: z.record(
      z.string().describe("OID of group tour costing to update"),
      UpdateGroupTourCostingZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated group tour costings")),
    },
  },

  deleteGroupTourCosting: {
    summary: "Delete a group tour costing",
    method: "DELETE",
    path: `${basePath}/products/:productOID/costings/:costingOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteGroupTourCostings: {
    summary: "Delete multiple group tour costings",
    method: "POST",
    path: `${basePath}/products/:productOID/costings/batch-delete`,
    body: z.object({
      costingOIDs: z.array(z.string().describe("OIDs of group tour costings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
