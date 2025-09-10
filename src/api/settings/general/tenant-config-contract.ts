import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { PaginationZ, SearchZ } from "../../schema";


const c = initContract();

export const tenantConfigContract = c.router({
  get: {
    method: "GET",
    path: "/tenant-config/:tenantConfigId",
    responses: {
      200: z.object({
        oid: z.string(),
        tenantOID: z.string(),
        key: z.string(),
        configValue: z.unknown(),
        createdAt: z.string(),
        updatedAt: z.string(),
        createdBy: z.string(),
        updatedBy: z.string().nullable(),
      }),
    },
    summary: "Get tenant config by ID",
  },

  list: {
    method: "GET", 
    path: "/tenant-config",
    query: PaginationZ.merge(SearchZ).extend({
      tenantOID: z.string().optional(),
      key: z.string().optional(),
    }),
    responses: {
      200: z.object({
        data: z.array(z.object({
          oid: z.string(),
          tenantOID: z.string(),
          key: z.string(),
          configValue: z.unknown(),
          createdAt: z.string(),
          updatedAt: z.string(),
          createdBy: z.string(),
          updatedBy: z.string().nullable(),
        })),
        pagination: z.object({
          page: z.number(),
          limit: z.number(),
          totalCount: z.number(),
          totalPages: z.number(),
        }),
      }),
    },
    summary: "List tenant configs",
  },

  create: {
    method: "POST",
    path: "/tenant-config",
    body: z.object({
      tenantOID: z.string(),
      key: z.string(),
      configValue: z.unknown(),
    }),
    responses: {
      201: z.object({
        oid: z.string(),
        tenantOID: z.string(),
        key: z.string(),
        configValue: z.unknown(),
        createdAt: z.string(),
        updatedAt: z.string(),
        createdBy: z.string(),
        updatedBy: z.string().nullable(),
      }),
    },
    summary: "Create tenant config",
  },

  update: {
    method: "PUT",
    path: "/tenant-config/:tenantConfigId",
    body: z.object({
      configValue: z.unknown(),
    }),
    responses: {
      200: z.object({
        oid: z.string(),
        tenantOID: z.string(),
        key: z.string(),
        configValue: z.unknown(),
        createdAt: z.string(),
        updatedAt: z.string(),
        createdBy: z.string(),
        updatedBy: z.string().nullable(),
      }),
    },
    summary: "Update tenant config",
  },

  delete: {
    method: "DELETE",
    path: "/tenant-config/:tenantConfigId",
    body: null,
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
    summary: "Delete tenant config",
  },
});