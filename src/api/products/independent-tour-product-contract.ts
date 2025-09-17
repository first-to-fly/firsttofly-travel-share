import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { IndependentTourProductZ } from "../../entities/Products/IndependentTourProduct";


const basePath = "/api/independent-tour-products";

const CreateIndependentTourProductZ = IndependentTourProductZ.pick({
  tenantOID: true,
  departmentOID: true,
  sectorGroupOID: true,
  sectorOIDs: true,
  code: true, // Required - must be manually provided
  name: true,
  description: true,
  remarks: true,
  shoutout: true,
  highlights: true,
  writeup: true,
  importantNotes: true,
  inclusions: true,
  exclusions: true,
  durationDays: true,
  durationNights: true,
  validityStartDate: true,
  validityEndDate: true,
  targetYieldPercentage: true,
  defaultFullPaymentDueDays: true,
  pricingPlaceholder: true,
  isActive: true,
  published: true,
  isUmrahHaj: true,
  coverPicture: true,
  productBannerDesktop: true,
  productBannerMobile: true,
  videos: true,
  documentations: true,
  platforms: true,
  hardpush: true,
});

const UpdateIndependentTourProductZ = CreateIndependentTourProductZ.omit({
  tenantOID: true,
}).partial();

export type UpdateIndependentTourProduct = z.infer<typeof UpdateIndependentTourProductZ>;
export type CreateIndependentTourProduct = z.infer<typeof CreateIndependentTourProductZ>;

export const independentTourProductContract = initContract().router({
  getIndependentTourProducts: {
    summary: "Get independent tour products",
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

  createIndependentTourProduct: {
    summary: "Create a new independent tour product",
    method: "POST",
    path: basePath,
    body: CreateIndependentTourProductZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourProduct: {
    summary: "Update an existing independent tour product",
    method: "PATCH",
    path: `${basePath}/:independentTourProductOID`,
    body: UpdateIndependentTourProductZ,
    responses: {
      200: z.string(),
    },
  },

  updateIndependentTourProducts: {
    summary: "Update multiple existing independent tour products",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of independent tour product to update"),
      UpdateIndependentTourProductZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated independent tour products")),
    },
  },

  deleteIndependentTourProduct: {
    summary: "Delete an independent tour product",
    method: "DELETE",
    path: `${basePath}/:independentTourProductOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteIndependentTourProducts: {
    summary: "Delete multiple independent tour products",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      independentTourProductOIDs: z.array(z.string().describe("OIDs of independent tour products to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
