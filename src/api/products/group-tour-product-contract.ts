import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { GroupTourProductZ } from "../../entities/Products/GroupTourProduct";


const basePath = "/api/products/group-tours";

// Create/Update schemas
const UpdateGroupTourProductZ = GroupTourProductZ.pick({
  code: true,

  name: true,
  description: true,

  departmentOID: true,
  sectorOIDs: true,
  displaySectorOIDs: true,

  sectorGroupOID: true,
  itineraryOIDs: true,
  costingOIDs: true,

  shoutout: true,
  writeup: true,
  highlights: true,
  importantNotes: true,
  inclusions: true,
  exclusions: true,

  durationDays: true,
  durationNights: true,

  validityStartDate: true,
  validityEndDate: true,

  salesPeriodStartDate: true,
  salesPeriodEndDate: true,

  isActive: true,
  published: true,
});

const CreateGroupTourProductZ = UpdateGroupTourProductZ.extend({
  tenantOID: z.string(),
});

export type UpdateGroupTourProduct = z.infer<typeof UpdateGroupTourProductZ>;
export type CreateGroupTourProduct = z.infer<typeof CreateGroupTourProductZ>;

export const groupTourProductContract = initContract().router({
  getGroupTourProducts: {
    summary: "Get group tour products",
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

  createGroupTourProduct: {
    summary: "Create a new group tour product",
    method: "POST",
    path: `${basePath}`,
    body: CreateGroupTourProductZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourProducts: {
    summary: "Update multiple existing group tour products",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of group tour product to update"),
      UpdateGroupTourProductZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated group tour products")),
    },
  },

  deleteGroupTourProducts: {
    summary: "Delete multiple group tour products",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      productOIDs: z.array(z.string().describe("OIDs of group tour products to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
