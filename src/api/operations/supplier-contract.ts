import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SupplierCategory, SupplierStatus, SupplierType, SupplierZ } from "../../entities/Operations/Supplier";


const basePath = "/api/operations/suppliers";

const CreateSupplierZ = SupplierZ.pick({
  tenantOID: true,
  name: true,
  code: true,
  shortName: true,
  type: true,
  category: true,
  status: true,
  partnerType: true,
  countries: true,
  supplierInfo: true,
  personInChargeOID: true,
  parentOID: true,
  newOID: true,
  remarks: true,
  inactiveRemarks: true,
  mainSupplierPaymentOID: true,
  mainSupplierAddressOID: true,
  paymentTerms: true,
  paymentCreditLimit: true,
}).extend({
  relatedSupplierIds: z.array(z.string()).optional(),
});

const UpdateSupplierZ = CreateSupplierZ.omit({
  tenantOID: true,
}).partial().extend({
  oid: z.string(),
  // Override status to only allow Active or Inactive for updates
  status: z.enum([SupplierStatus.ACTIVE, SupplierStatus.INACTIVE]).optional(),
});

export type CreateSupplier = z.infer<typeof CreateSupplierZ>;
export type UpdateSupplier = z.infer<typeof UpdateSupplierZ>;

export const supplierContract = initContract().router({
  getSuppliers: {
    summary: "Get all suppliers for a tenant with optional filters",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      types: z.array(z.nativeEnum(SupplierType)).optional(),
      categories: z.array(z.nativeEnum(SupplierCategory)).optional(),
      status: z.array(z.nativeEnum(SupplierStatus)).optional(),
    }),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
  },

  createSupplier: {
    summary: "Create a new supplier",
    method: "POST",
    path: basePath,
    body: CreateSupplierZ,
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oid: z.string(),
        }),
      }),
    },
  },

  updateSuppliers: {
    summary: "Update multiple suppliers",
    method: "PUT",
    path: basePath,
    body: z.array(UpdateSupplierZ),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
  },

  deleteSuppliers: {
    summary: "Delete multiple suppliers",
    method: "DELETE",
    path: basePath,
    body: z.object({
      oids: z.array(z.string()),
    }),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
  },
});

