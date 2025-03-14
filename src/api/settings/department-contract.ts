import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DepartmentZ } from "../../entities/Settings/Department";


const basePath = "/api/settings/departments";

export const departmentContract = initContract().router({
  createDepartment: {
    summary: "Create a new department",
    method: "POST",
    path: basePath,
    body: DepartmentZ.pick({
      tenantOID: true,
      name: true,
      locationOID: true,
      parentDepartmentOID: true,
      code: true,
      isActive: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateDepartment: {
    summary: "Update an existing department",
    method: "PATCH",
    path: `${basePath}/:departmentOID`,
    body: DepartmentZ.pick({
      name: true,
      locationOID: true,
      parentDepartmentOID: true,
      code: true,
      isActive: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  getDepartments: {
    summary: "Get departments with pagination and filtering",
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

  deleteDepartment: {
    summary: "Delete a department",
    method: "DELETE",
    path: `${basePath}/:departmentOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
