import { initContract } from "@ts-rest/core";
import { ProductZ } from "entities/Product";
import { z } from "zod";


const basePath = "/api/projects";


const ProductListResponseZ = z.object({
  data: z.array(z.string()), // array of product IDs
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

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
      200: ProductListResponseZ,
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
    path: `${basePath}/:productId`,
    body: ProductZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteProduct: {
    summary: "Delete a product",
    method: "DELETE",
    path: `${basePath}/:productId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

});
