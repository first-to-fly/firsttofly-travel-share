import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../../entities/entity";
import { RoleZ } from "../../../entities/Settings/User/Role";


const basePath = "/api/settings/roles";

const UpdateRoleZ = RoleZ.pick({
  name: true,
  description: true,
  permissions: true,
});

const CreateRoleZ = UpdateRoleZ.extend({
  tenantOID: EntityOIDZ,
});

export type UpdateRole = z.infer<typeof UpdateRoleZ>;
export type CreateRole = z.infer<typeof CreateRoleZ>;

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
    body: CreateRoleZ,
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
    body: UpdateRoleZ,

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
    body: z.record(EntityOIDZ, UpdateRoleZ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  assignUserRoles: {
    summary: "Assign roles to a user",
    method: "POST",
    path: `${basePath}/assign`,
    body: z.object({
      users: z.array(
        z.object({
          userOID: EntityOIDZ,
          roleOIDs: z.array(EntityOIDZ),
        }),
      ),
      tenantOID: EntityOIDZ,
    }),
    responses: {
      200: z.boolean(),
      404: z.object({
        message: z.string(),
      }),
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
