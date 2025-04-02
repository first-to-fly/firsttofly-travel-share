import { initContract } from "@ts-rest/core";
import { EntityOIDZ } from "entities/entity";
import { z } from "zod";

import { UserZ } from "../../../entities/Settings/User/User";


const basePath = "/api/settings/users";

const UpdateUserZ = UserZ.pick({
  tenantOID: true,

  firstName: true,
  lastName: true,
  preferredName: true,
  dob: true,
  otherNames: true,
  mobile: true,
  altMobile: true,
  personalEmail: true,
  images: true,
  avatar: true,
  emergencyContact: true,
  description: true,
  salutation: true,
  departmentOIDs: true,
  designationOIDs: true,
  roleOIDs: true,

  isActive: true,
  staffType: true,
  buddyOID: true,

  tourLeadingSkills: true,
  languageSkills: true,

  documentOIDs: true,
});

const CreateUserZ = UpdateUserZ.extend({
  email: z.string(),
});

export type UpdateUser = z.infer<typeof UpdateUserZ>;
export type CreateUser = z.infer<typeof CreateUserZ>;

export const userContract = initContract().router({
  getUsers: {
    summary: "Get users",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  getAccessibleTenants: {
    summary: "Get accessible tenants for a user",
    method: "GET",
    path: `${basePath}/accessible-tenants`,
    responses: {
      200: z.object({
        tenantOIDs: z.array(z.string()),
      }),
    },
  },

  createUser: {
    summary: "Create a new user",
    method: "POST",
    path: basePath,
    body: CreateUserZ,
    responses: {
      200: z.string(),
    },
  },

  updateUsers: {
    summary: "Update multiple users",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("oid of user"),
      UpdateUserZ,
    ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },

  deleteUsers: {
    summary: "Delete users",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.array(z.object({
      userOID: z.string(),
      tenantOID: z.string(),
    })),
    responses: {
      200: z.boolean(),
    },
  },
});
