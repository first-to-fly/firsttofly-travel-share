import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ProductZ } from "../../entities/Product";


const basePath = "/api/projects";


export const productContract = initContract().router({
  getProducts: {
    summary: "Get products with pagination and filtering",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOid: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createProduct: {
    summary: "Create a new product",
    method: "POST",
    path: basePath,
    body: ProductZ.pick({
      tenantOid: true,
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
      sectorGroupOid: true,
      departmentOid: true,
      // Add other required fields as needed
    }).extend({
      sectorOids: z.array(z.number()),
      displaySectorOids: z.array(z.number()),
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
      sectorGroupOid: true,
      departmentOid: true,
    }).extend({
      sectorOids: z.array(z.number()).optional(),
      displaySectorOids: z.array(z.number()).optional(),
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
