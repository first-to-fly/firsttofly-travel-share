import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { CostingItemGroupZ, CostingItemZ } from "../../../entities/Settings/Product";


const basePath = "/api/settings/costing-items";
const costingItemGroupBasePath = "/api/settings/costing-item-groups";


export const costingItemContract = initContract().router({
  getCostingItems: {
    summary: "Get costing items with pagination and filtering",
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

  createCostingItem: {
    summary: "Create a new costing item",
    method: "POST",
    path: basePath,
    body: CostingItemZ.pick({
      tenantOID: true,
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
    path: `${basePath}/:costingItemOID`,
    body: CostingItemZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteCostingItem: {
    summary: "Delete a costing item",
    method: "DELETE",
    path: `${basePath}/:costingItemOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  // CostingItemGroup methods
  getCostingItemDepartments: {
    summary: "Get costing item groups with pagination and filtering",
    method: "GET",
    path: costingItemGroupBasePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createCostingItemGroup: {
    summary: "Create a new costing item group",
    method: "POST",
    path: costingItemGroupBasePath,
    body: CostingItemGroupZ.pick({
      tenantOID: true,
      name: true,
      remarks: true,
      isActive: true,
      costingItemOIDs: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateCostingItemGroup: {
    summary: "Update an existing costing item group",
    method: "PATCH",
    path: `${costingItemGroupBasePath}/:costingItemGroupOID`,
    body: CostingItemGroupZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteCostingItemGroup: {
    summary: "Delete a costing item group",
    method: "DELETE",
    path: `${costingItemGroupBasePath}/:costingItemGroupOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
