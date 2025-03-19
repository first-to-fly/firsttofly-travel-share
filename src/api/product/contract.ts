import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ProductZ } from "../../entities/Product";


const basePath = "/api/projects";


export const productContract = initContract().router({
  getProducts: {
    summary: "Get products",
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

  createProduct: {
    summary: "Create a new product",
    method: "POST",
    path: basePath,
    body: ProductZ.pick({
      tenantOID: true,
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
      sectorGroupOID: true,
      departmentOID: true,
      groupOID: true,
      // Add other required fields as needed
    }).extend({
      sectorOIDs: z.array(z.number()),
      displaySectorOIDs: z.array(z.number()),
    }),
    responses: {
      200: z.string(),
    },
  },

  updateProduct: {
    summary: "Update an existing product",
    method: "PATCH",
    path: `${basePath}/:productOID`,
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
      sectorGroupOID: true,
      departmentOID: true,
    }).extend({
      sectorOIDs: z.array(z.number()).optional(),
      displaySectorOIDs: z.array(z.number()).optional(),
    }),
    responses: {
      200: z.string(),
    },
  },

  deleteProduct: {
    summary: "Delete a product",
    method: "DELETE",
    path: `${basePath}/:productOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

});
