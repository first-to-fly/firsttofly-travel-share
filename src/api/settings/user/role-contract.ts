import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../../entities/entity";
import { RoleZ } from "../../../entities/Settings/User/Role";


const basePath = "/api/settings/roles";

const CreateRoleZ = RoleZ.pick({
  tenantOID: true,
  name: true,
  description: true,
  permissions: true,
});

const UpdateRoleZ = CreateRoleZ.omit({
  tenantOID: true,
}).partial();

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

  updateRoles: {
    summary: "Update multiple roles at once",
    method: "POST",
    path: `${basePath}/batch-update`,
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

  deleteRoles: {
    summary: "Delete multiple roles at once",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      roleOIDs: z.array(EntityOIDZ),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
