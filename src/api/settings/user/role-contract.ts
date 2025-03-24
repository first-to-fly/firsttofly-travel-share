import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../../entities/entity";


const basePath = "/api/roles";


export const roleContract = initContract().router({
  getRoles: {
    summary: "Get all roles for a tenant",
    method: "GET",
    path: `${basePath}`,
    query: z.object({
      tenantOID: EntityOIDZ,
    }),
    responses: {
      200: z.object({
        oids: z.array(EntityOIDZ),
      }),
    },
  },
  createRole: {
    summary: "Create a new role",
    method: "POST",
    path: `${basePath}`,
    body: z.object({
      tenantOID: EntityOIDZ,
      permissions: z.array(z.string()),
    }),
    responses: {
      200: EntityOIDZ,
    },
  },
  updateRole: {
    summary: "Update a role",
    method: "PUT",
    path: `${basePath}/:roleOID`,
    pathParams: z.object({
      roleOID: EntityOIDZ,
    }),
    body: z.object({
      permissions: z.array(z.string()),
    }),
    responses: {
      200: EntityOIDZ,
      404: z.object({
        message: z.string(),
      }),
    },
  },
  updateRoles: {
    summary: "Update multiple roles at once",
    method: "PUT",
    path: `${basePath}`,
    body: z.record(EntityOIDZ, z.object({
      permissions: z.array(z.string()),
    })),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  deleteRole: {
    summary: "Delete a role",
    method: "DELETE",
    path: `${basePath}/:roleOID`,
    pathParams: z.object({
      roleOID: EntityOIDZ,
    }),
    body: undefined,
    responses: {
      200: z.boolean(),
      404: z.object({
        message: z.string(),
      }),
    },
  },
  deleteRoles: {
    summary: "Delete multiple roles at once",
    method: "DELETE",
    path: `${basePath}/batch`,
    body: z.object({
      roleOIDs: z.array(EntityOIDZ),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
