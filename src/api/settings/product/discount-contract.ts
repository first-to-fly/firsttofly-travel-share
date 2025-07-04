import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DiscountZ } from "../../../entities/Settings/Product/Discount";


const c = initContract();
const basePath = "/api/discounts"; // Plural entity name

const CreateDiscountZ = DiscountZ.pick({
  tenantOID: true,
  discountCode: true,
  discountName: true,
  description: true,
  validityStartDate: true,
  validityEndDate: true,
  isActive: true,
  bookingChannels: true,
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
  sectorOIDs: true,
  groupTourProductOIDs: true,
  tourDepartureOIDs: true,
});

const UpdateDiscountZ = CreateDiscountZ.omit({
  tenantOID: true,
}).partial();

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
        oids: z.array(z.string()),
      }),
    },
  },

  createDiscount: {
    summary: "Create a new discount",
    method: "POST",
    path: basePath,
    body: CreateDiscountZ,
    responses: {
      201: z.string(),
    },
  },

  updateDiscounts: {
    summary: "Update multiple existing discounts",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of discount to update"), // OID is string
      UpdateDiscountZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated discounts")),
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
      200: z.boolean(),
    },
  },

  validateDiscountCode: {
    summary: "Validate a discount code for group tour booking",
    method: "POST",
    path: `${basePath}/validate-code`,
    body: z.object({
      tenantOID: z.string(),
      discountCode: z.string(),
      tourDepartureOID: z.string(),
    }),
    responses: {
      200: z.object({
        valid: z.boolean(),
        discountOID: z.string().optional(),
        discountName: z.string().optional(),
        discountValue: z.number().optional(),
      }),
    },
  },
});
