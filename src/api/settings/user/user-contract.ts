import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { UserZ } from "../../../entities/Settings/User";


const basePath = "/api/settings/users";

const UpdateUserZ = UserZ.pick({
  email: true,
  emailVerified: true,
  displayName: true,
  photoURL: true,
  phoneNumber: true,
  departmentOID: true,
  tourLeadingSkills: true,
});

export type UpdateUser = z.infer<typeof UpdateUserZ>;

export const basicUserContract = initContract().router({
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

  createUser: {
    summary: "Create a new user",
    method: "POST",
    path: basePath,
    body: UserZ.pick({
      email: true,
      emailVerified: true,
      displayName: true,
      photoURL: true,
      phoneNumber: true,
      departmentOID: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateUser: {
    summary: "Update an existing user",
    method: "PATCH",
    path: `${basePath}/:userOID`,
    body: UpdateUserZ,
    responses: {
      200: z.string(),
    },
  },

  deleteUser: {
    summary: "Delete a user",
    method: "DELETE",
    path: `${basePath}/:userOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
