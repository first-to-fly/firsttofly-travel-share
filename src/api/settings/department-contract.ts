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
      name: true,
      locationId: true,
      parentDepartmentId: true,
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
    path: `${basePath}/:departmentId`,
    body: DepartmentZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  getDepartments: {
    summary: "Get departments with pagination and filtering",
    method: "GET",
    path: basePath,
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  deleteDepartment: {
    summary: "Delete a department",
    method: "DELETE",
    path: `${basePath}/:departmentId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
