import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DiscountTemplateZ } from "../../../entities/Settings/Product/DiscountTemplate";


const c = initContract();
const basePath = "/api/discount-templates"; // Plural entity name


const UpdateDiscountTemplateZ = DiscountTemplateZ.pick({
  templateName: true,
  description: true,
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
});

// Define Create Schema - Extend Update schema, make required fields non-optional
const CreateDiscountTemplateZ = UpdateDiscountTemplateZ.extend({
  // Need tenantOID for creation context
  tenantOID: z.string(),
});

export type UpdateDiscountTemplate = z.infer<typeof UpdateDiscountTemplateZ>;
export type CreateDiscountTemplate = z.infer<typeof CreateDiscountTemplateZ>;

// Define Contract
export const discountTemplateContract = c.router({
  getDiscountTemplates: {
    summary: "Get discount templates",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()), // OIDs are strings
      }),
    },
  },
  createDiscountTemplate: {
    summary: "Create a new discount template",
    method: "POST",
    path: basePath,
    body: CreateDiscountTemplateZ,
    responses: {
      201: z.string(), // Return OID of created template
    },
  },
  updateDiscountTemplate: {
    summary: "Update an existing discount template",
    method: "PATCH",
    path: `${basePath}/:templateOID`,
    pathParams: z.object({ templateOID: z.string() }),
    body: UpdateDiscountTemplateZ,
    responses: {
      200: z.string(), // Return OID of updated template
      404: z.object({ message: z.string() }), // Example error
    },
  },
  deleteDiscountTemplate: {
    summary: "Delete a discount template",
    method: "DELETE",
    path: `${basePath}/:templateOID`,
    pathParams: z.object({ templateOID: z.string() }),
    body: z.object({}), // Empty body
    responses: {
      200: z.boolean(),
      404: z.object({ message: z.string() }), // Example error
    },
  },
  updateDiscountTemplates: {
    summary: "Update multiple existing discount templates",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of template to update"),
      UpdateDiscountTemplateZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated templates")),
    },
  },
  deleteDiscountTemplates: {
    summary: "Delete multiple discount templates",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      templateOIDs: z.array(z.string().describe("OIDs of templates to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
