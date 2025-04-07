import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DiscountZ } from "../../../entities/Settings/Product/Discount";


const c = initContract();
const basePath = "/api/discounts"; // Plural entity name

// Define Update Schema by picking fields from DiscountZ
// Exclude oid, entityType, tenantOID, createdAt, createdBy, updatedAt, updatedBy, deletedAt
const UpdateDiscountZ = DiscountZ.pick({ // Access inner ZodObject
  discountCode: true,
  discountName: true,
  description: true,
  validityStartDate: true,
  validityEndDate: true,
  status: true,
  bookingChannel: true,
  discountMechanics: true,
  discountType: true,
  basePrice: true,
  discountMode: true,
  applyWithTierDiscounts: true,
  applyWithOtherDiscounts: true,
  whichPax: true,
  paxType: true,
  minPax: true,
  minSpending: true,
  amountType: true,
  amountValue: true,
  amountRangeStart: true,
  amountRangeEnd: true,
  specialDatesType: true,
  specialDatesStart: true,
  specialDatesEnd: true,
  timeslotType: true,
  timeslotStart: true,
  timeslotEnd: true,
  discountValue: true,
  howToApply: true,
  useDiscountCode: true,
  sectorIds: true, // Include relationship IDs for update
  productIds: true,
  tourIds: true,
});

// Define Create Schema - Extend Update schema, make required fields non-optional
// tenantOID is inherited from EntityZ and required by default
const CreateDiscountZ = UpdateDiscountZ.extend({
  tenantOID: z.string(), // Required field
});

export type UpdateDiscount = z.infer<typeof UpdateDiscountZ>;
export type CreateDiscount = z.infer<typeof CreateDiscountZ>;

// Define Contract
export const discountContract = c.router({
  getDiscounts: {
    summary: "Get discounts",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(), // tenantOID is string in EntityZ
    }).passthrough(), // Allow other query params like filtering/sorting
    responses: {
      200: z.object({
        // Assuming response returns full entities or just OIDs
        // Let's return OIDs for now as per example
        oids: z.array(z.string()), // OIDs are strings
      }),
      // Add other potential responses (e.g., 401, 403, 500)
    },
  },

  createDiscount: {
    summary: "Create a new discount",
    method: "POST",
    path: basePath,
    body: CreateDiscountZ,
    responses: {
      201: z.string(), // Return OID of created discount
      // Add other potential responses (e.g., 400, 401, 403, 500)
    },
  },

  updateDiscount: {
    summary: "Update an existing discount",
    method: "PATCH",
    path: `${basePath}/:discountOID`, // Use discountOID as path param
    pathParams: z.object({ discountOID: z.string() }), // OID is string
    body: UpdateDiscountZ,
    responses: {
      200: z.string(), // Return OID of updated discount
      // Add other potential responses (e.g., 400, 401, 403, 404, 500)
    },
  },

  updateDiscounts: {
    summary: "Update multiple existing discounts",
    method: "POST", // Using POST for batch operations is common
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of discount to update"), // OID is string
      UpdateDiscountZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated discounts")), // OIDs are strings
      // Add other potential responses (e.g., 400, 401, 403, 500)
    },
  },

  deleteDiscount: {
    summary: "Delete a discount",
    method: "DELETE",
    path: `${basePath}/:discountOID`, // Use discountOID as path param
    pathParams: z.object({ discountOID: z.string() }), // OID is string
    body: z.object({}), // Empty body for DELETE
    responses: {
      200: z.boolean(), // Return true on success
      // Add other potential responses (e.g., 401, 403, 404, 500)
    },
  },

  deleteDiscounts: {
    summary: "Delete multiple discounts",
    method: "POST", // Using POST for batch operations
    path: `${basePath}/batch-delete`,
    body: z.object({
      discountOIDs: z.array(z.string().describe("OIDs of discounts to delete")), // OIDs are strings
    }),
    responses: {
      200: z.boolean(), // Return true on success
      // Add other potential responses (e.g., 400, 401, 403, 500)
    },
  },
});
