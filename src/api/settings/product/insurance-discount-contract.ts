import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { InsuranceDiscountZ } from "../../../entities/Settings/Product/InsuranceDiscount";


const basePath = "/api/settings/insurance-discounts";

const UpdateInsuranceDiscountZ = InsuranceDiscountZ.pick({
  code: true,
  name: true,
  startDate: true,
  endDate: true,
  type: true,
  valuePercentage: true,
  valueFixed: true,
  remarks: true,
});

const CreateInsuranceDiscountZ = UpdateInsuranceDiscountZ.extend({
  tenantOID: z.string(),
});

export type UpdateInsuranceDiscount = z.infer<typeof UpdateInsuranceDiscountZ>;
export type CreateInsuranceDiscount = z.infer<typeof CreateInsuranceDiscountZ>;

export const insuranceDiscountContract = initContract().router({
  getInsuranceDiscounts: {
    summary: "Get insurance discounts",
    method: "GET",
    path: basePath,
    query: z
      .object({
        tenantOID: z.string(),
      })
      .passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createInsuranceDiscount: {
    summary: "Create a new insurance discount",
    method: "POST",
    path: basePath,
    body: CreateInsuranceDiscountZ,
    responses: {
      200: z.string(),
    },
  },

  updateInsuranceDiscount: {
    summary: "Update an existing insurance discount",
    method: "PATCH",
    path: `${basePath}/:insuranceDiscountOID`,
    body: UpdateInsuranceDiscountZ,
    responses: {
      200: z.string(),
    },
  },

  updateInsuranceDiscounts: {
    summary: "Update multiple existing insurance discounts",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string().describe("OID of insurance discount to update"), UpdateInsuranceDiscountZ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated insurance discounts")),
    },
  },

  deleteInsuranceDiscount: {
    summary: "Delete an insurance discount",
    method: "DELETE",
    path: `${basePath}/:insuranceDiscountOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteInsuranceDiscounts: {
    summary: "Delete multiple insurance discounts",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      insuranceDiscountOIDs: z.array(z.string().describe("OIDs of insurance discounts to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
