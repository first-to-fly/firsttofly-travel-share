import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SupplierPersonZ } from "../../entities/Operations/SupplierPerson";


const basePath = "/api/operations/supplier-persons";

const CreateSupplierPersonZ = SupplierPersonZ.pick({
  tenantOID: true,
  supplierOID: true,
  firstName: true,
  lastName: true,
  department: true,
  position: true,
  contactInfo: true,
}).extend({
  isMainContact: z.boolean().optional(),
});

const UpdateSupplierPersonZ = CreateSupplierPersonZ.omit({
  tenantOID: true,
}).partial().extend({
  oid: z.string(),
});

export type CreateSupplierPerson = z.infer<typeof CreateSupplierPersonZ>;
export type UpdateSupplierPerson = z.infer<typeof UpdateSupplierPersonZ>;

export const supplierPersonContract = initContract().router({
  getSupplierPersons: {
    summary: "Get all supplier persons for a tenant",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      supplierOID: z.string().optional(),
    }),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createSupplierPerson: {
    summary: "Create a new supplier person",
    method: "POST",
    path: basePath,
    body: CreateSupplierPersonZ,
    responses: {
      200: z.string(),
    },
  },

  updateSupplierPersons: {
    summary: "Update multiple supplier persons",
    method: "PUT",
    path: basePath,
    body: z.record(
      z.string().describe("OID of supplier person to update"),
      UpdateSupplierPersonZ,
    ),
    responses: {
      200: z.array(z.string()),
    },
  },

  deleteSupplierPersons: {
    summary: "Delete multiple supplier persons",
    method: "DELETE",
    path: basePath,
    body: z.object({
      oids: z.array(z.string()),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
