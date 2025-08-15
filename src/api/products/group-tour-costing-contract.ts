import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { GroupTourCostingEntryZ, GroupTourCostingZ } from "../../entities/Products/GroupTourCosting";


const basePath = "/api/products/group-tour-costings";

// Create/Update schemas
export const CreateGroupTourCostingEntryZ = GroupTourCostingEntryZ.pick({
  name: true,
  category: true,
  calculationBasis: true,
  applyToPackageType: true,
  applyToOccupancyType: true,
  supplierOID: true,
  remarks: true,
  quantity: true,
  isTieredPrice: true,
  currency: true,
  prices: true,
});

const UpdateGroupTourCostingEntryZ = CreateGroupTourCostingEntryZ.extend({
  oid: z.string().optional(), // update costing, but create new entry
}).partial();

const CreateGroupTourCostingZ = GroupTourCostingZ.pick({

  groupTourProductOID: true,
  tenantOID: true,

  templateOID: true,
  name: true,
  remarks: true,
  validityStartDate: true,
  validityEndDate: true,
  landTourGroupSizeTiers: true,
  freeOfChargeTiers: true,
  leadManagerCountTiers: true,
  isActive: true,
  airlineOIDs: true,
}).extend({
  code: GroupTourCostingZ.shape.code.optional(),
  groupTourCostingEntries: z.array(CreateGroupTourCostingEntryZ),
});

const UpdateGroupTourCostingZ = CreateGroupTourCostingZ.omit({
  groupTourProductOID: true,
  tenantOID: true,
}).extend({
  groupTourCostingEntries: z.array(UpdateGroupTourCostingEntryZ),
}).partial();

export type UpdateGroupTourCosting = z.infer<typeof UpdateGroupTourCostingZ>;
export type CreateGroupTourCosting = z.infer<typeof CreateGroupTourCostingZ>;

export const groupTourCostingContract = initContract().router({
  getGroupTourCostings: {
    summary: "Get group tour costings",
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

  createGroupTourCosting: {
    summary: "Create a new group tour costing",
    method: "POST",
    path: `${basePath}`,
    body: CreateGroupTourCostingZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourCostings: {
    summary: "Update multiple existing group tour costings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of group tour costing to update"),
      UpdateGroupTourCostingZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated group tour costings")),
    },
  },

  deleteGroupTourCostings: {
    summary: "Delete multiple group tour costings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      costingOIDs: z.array(z.string().describe("OIDs of group tour costings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
