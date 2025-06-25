import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/operations/supplier-persons";

export const supplierPersonContract = initContract().router({
  getSupplierPersons: {
    method: "GET",
    path: `${basePath}`,
    query: z.object({
      tenantOID: z.string(),
      supplierOID: z.string().optional(),
    }),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
    summary: "Get all supplier persons for a tenant",
  },

  createSupplierPerson: {
    method: "POST",
    path: `${basePath}`,
    body: z.object({
      tenantOID: z.string(),
      supplierOID: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      title: z.string().optional(),
      department: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      mobile: z.string().optional(),
      fax: z.string().optional(),
      position: z.string().optional(),
      isMainContact: z.boolean().optional(),
      isActive: z.boolean().optional(),
      contactInfo: z.any().optional(),
    }),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oid: z.string(),
        }),
      }),
    },
    summary: "Create a new supplier person",
  },

  updateSupplierPersons: {
    method: "PUT",
    path: `${basePath}`,
    body: z.array(z.object({
      oid: z.string(),
      supplierOID: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      title: z.string().optional(),
      department: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      mobile: z.string().optional(),
      fax: z.string().optional(),
      position: z.string().optional(),
      isMainContact: z.boolean().optional(),
      isActive: z.boolean().optional(),
      contactInfo: z.any().optional(),
    })),
    responses: {
      200: z.object({
        success: z.literal(true),
        data: z.object({
          oids: z.array(z.string()),
        }),
      }),
    },
    summary: "Update multiple supplier persons",
  },

  deleteSupplierPersons: {
    method: "DELETE",
    path: `${basePath}`,
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
    summary: "Delete multiple supplier persons",
  },
});