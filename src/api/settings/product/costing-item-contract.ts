import { initContract } from "@ts-rest/core";
import { z } from "zod";

import {
  CalculationBasis,
  CostingItemCategory,
  CostingItemZ,
  OccupancyType,
  PackageType,
} from "../../../entities/Settings/Product/CostingItem";


const basePath = "/api/settings/costing-items";

const CreateCostingItemZ = CostingItemZ.pick({
  tenantOID: true,
  name: true,
  category: true,
  calculationBasis: true,
  applyToPackageType: true,
  applyToOccupancyType: true,
  remarks: true,
  isActive: true,
});

const UpdateCostingItemZ = CreateCostingItemZ.omit({
  tenantOID: true,
}).partial();

export type UpdateCostingItem = z.infer<typeof UpdateCostingItemZ>;
export type CreateCostingItem = z.infer<typeof CreateCostingItemZ>;

export const costingItemContract = initContract().router({
  getCostingItems: {
    summary: "Get costing items",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      category: z.nativeEnum(CostingItemCategory).optional(),
      calculationBasis: z.nativeEnum(CalculationBasis).optional(),
      applyToPackageType: z.nativeEnum(PackageType).optional(),
      applyToOccupancyType: z.nativeEnum(OccupancyType).optional(),
      isActive: z.boolean().optional(),
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
    body: CreateCostingItemZ,
    responses: {
      200: z.string(),
    },
  },

  updateCostingItem: {
    summary: "Update an existing costing item",
    method: "PATCH",
    path: `${basePath}/:costingItemOID`,
    body: UpdateCostingItemZ,
    responses: {
      200: z.string(),
    },
  },

  updateCostingItems: {
    summary: "Update multiple existing costing items",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of costing item to update"),
      UpdateCostingItemZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated costing items")),
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

  deleteCostingItems: {
    summary: "Delete multiple costing items",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      costingItemOIDs: z.array(z.string().describe("OIDs of costing items to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
