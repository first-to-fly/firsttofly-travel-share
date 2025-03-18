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

  updateDepartments: {
    summary: "Update an existing department",
    method: "PATCH",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of department to update"),
      DepartmentZ.pick({
        name: true,
        locationOID: true,
        parentDepartmentOID: true,
        code: true,
        isActive: true,
      }),
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated locations")),
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

  deleteDepartments: {
    summary: "Delete a department",
    method: "DELETE",
    path: `${basePath}/batch-update`,
    body: z.array(
      z.array(z.string().describe("OID of department to delete")),
    ),
    responses: {
      200: z.boolean(),
    },
  },
});
