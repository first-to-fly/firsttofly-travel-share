import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { UserZ } from "../../entities/Settings/User";
import { PageListIdsResponseZ } from "../../types/pageListIdsResponse";


const basePath = "/api/settings/users";

export const userContract = initContract().router({
  getUsers: {
    summary: "Get users with pagination and filtering",
    method: "GET",
    path: basePath,
    query: z.object({
      page: z.string().optional(),
      pageSize: z.string().optional(),
      email: z.string().optional(),
      displayName: z.string().optional(),
      departmentID: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
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
      departmentID: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateUser: {
    summary: "Update an existing user",
    method: "PATCH",
    path: `${basePath}/:userId`,
    body: UserZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteUser: {
    summary: "Delete a user",
    method: "DELETE",
    path: `${basePath}/:userId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
