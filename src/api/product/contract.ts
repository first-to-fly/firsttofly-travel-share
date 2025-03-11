import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ProductZ } from "../../entities/Product";
import { PageListIdsResponseZ } from "../../types/pageListIdsResponse";


const basePath = "/api/projects";


export const productContract = initContract().router({
  getProducts: {
    summary: "Get products with pagination and filtering",
    method: "GET",
    path: basePath,
    query: z.object({
      page: z.string().optional(),
      pageSize: z.string().optional(),
      keyword: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
    },
  },

  createProduct: {
    summary: "Create a new product",
    method: "POST",
    path: basePath,
    body: ProductZ.pick({
      code: true,
      validityStartDate: true,
      validityEndDate: true,
      salesStartDate: true,
      salesEndDate: true,
      durationDays: true,
      durationNights: true,
      isActive: true,
      isPublished: true,
      status: true,
      sectorGroupId: true,
      departmentId: true,
      // Add other required fields as needed
    }).extend({
      sectorIds: z.array(z.number()),
      displaySectorIds: z.array(z.number()),
    }),
    responses: {
      200: z.string(),
    },
  },

  updateProduct: {
    summary: "Update an existing product",
    method: "PATCH",
    path: `${basePath}/:productOid`,
    body: ProductZ.pick({
      validityStartDate: true,
      validityEndDate: true,
      salesStartDate: true,
      salesEndDate: true,
      durationDays: true,
      durationNights: true,
      isActive: true,
      isPublished: true,
      status: true,
      sectorGroupId: true,
      departmentId: true,
    }).extend({
      sectorIds: z.array(z.number()).optional(),
      displaySectorIds: z.array(z.number()).optional(),
    }),
    responses: {
      200: z.string(),
    },
  },

  deleteProduct: {
    summary: "Delete a product",
    method: "DELETE",
    path: `${basePath}/:productOid`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

});
