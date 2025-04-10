import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { GroupTourProductZ } from "../../entities/Product/GroupTourProduct";


const basePath = "/api/group-tour";

// Create/Update schemas
const UpdateGroupTourProductZ = GroupTourProductZ.pick({
  productCode: true,
  name: true,
  description: true,
  departmentOID: true,
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
    path: `${basePath}/products`,
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
    path: `${basePath}/products`,
    body: CreateGroupTourProductZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourProduct: {
    summary: "Update an existing group tour product",
    method: "PATCH",
    path: `${basePath}/products/:productOID`,
    body: UpdateGroupTourProductZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourProducts: {
    summary: "Update multiple existing group tour products",
    method: "POST",
    path: `${basePath}/products/batch-update`,
    body: z.record(
      z.string().describe("OID of group tour product to update"),
      UpdateGroupTourProductZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated group tour products")),
    },
  },

  deleteGroupTourProduct: {
    summary: "Delete a group tour product",
    method: "DELETE",
    path: `${basePath}/products/:productOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteGroupTourProducts: {
    summary: "Delete multiple group tour products",
    method: "POST",
    path: `${basePath}/products/batch-delete`,
    body: z.object({
      productOIDs: z.array(z.string().describe("OIDs of group tour products to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
