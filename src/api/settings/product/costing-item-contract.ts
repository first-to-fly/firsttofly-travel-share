import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { CostingItemGroupZ, CostingItemZ } from "../../../entities/Settings/Product";
import { PageListIdsResponseZ } from "../../../types/pageListIdsResponse";


const basePath = "/api/settings/costing-items";
const costingItemGroupBasePath = "/api/settings/costing-item-groups";


export const costingItemContract = initContract().router({
  getCostingItems: {
    summary: "Get costing items with pagination and filtering",
    method: "GET",
    path: basePath,
    query: z.object({
      page: z.string().optional(),
      pageSize: z.string().optional(),
      category: z.string().optional(),
      calculationBasis: z.string().optional(),
      packageType: z.string().optional(),
      isActive: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
    },
  },

  createCostingItem: {
    summary: "Create a new costing item",
    method: "POST",
    path: basePath,
    body: CostingItemZ.pick({
      name: true,
      category: true,
      calculationBasis: true,
      packageType: true,
      isActive: true,
      description: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateCostingItem: {
    summary: "Update an existing costing item",
    method: "PATCH",
    path: `${basePath}/:costingItemId`,
    body: CostingItemZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteCostingItem: {
    summary: "Delete a costing item",
    method: "DELETE",
    path: `${basePath}/:costingItemId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  // CostingItemGroup methods
  getCostingItemGroups: {
    summary: "Get costing item groups with pagination and filtering",
    method: "GET",
    path: costingItemGroupBasePath,
    query: z.object({
      page: z.string().optional(),
      pageSize: z.string().optional(),
      name: z.string().optional(),
      isActive: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
    },
  },

  createCostingItemGroup: {
    summary: "Create a new costing item group",
    method: "POST",
    path: costingItemGroupBasePath,
    body: CostingItemGroupZ.pick({
      name: true,
      remarks: true,
      isActive: true,
      costingItemIds: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateCostingItemGroup: {
    summary: "Update an existing costing item group",
    method: "PATCH",
    path: `${costingItemGroupBasePath}/:costingItemGroupId`,
    body: CostingItemGroupZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteCostingItemGroup: {
    summary: "Delete a costing item group",
    method: "DELETE",
    path: `${costingItemGroupBasePath}/:costingItemGroupId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
