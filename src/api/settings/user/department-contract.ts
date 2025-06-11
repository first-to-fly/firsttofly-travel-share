import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DepartmentZ } from "../../../entities/Settings/User/Department";


const basePath = "/api/settings/departments";

const CreateDepartmentZ = DepartmentZ.pick({
  tenantOID: true,
  name: true,
  locationOID: true,
  parentDepartmentOID: true,
  code: true,
  isActive: true,
}).extend({
  userOIDs: z.array(z.string()).optional(),
});

const UpdateDepartmentZ = CreateDepartmentZ.omit({
  tenantOID: true,
  parentDepartmentOID: true,
}).extend({
  parentDepartmentOID: z.string().nullable(),
}).partial();

export type UpdateDepartment = z.infer<typeof UpdateDepartmentZ>;
export type CreateDepartment = z.infer<typeof CreateDepartmentZ>;

export const departmentContract = initContract().router({
  createDepartment: {
    summary: "Create a new department",
    method: "POST",
    path: basePath,
    body: CreateDepartmentZ,
    responses: {
      200: z.string(),
    },
  },

  updateDepartments: {
    summary: "Update an existing department",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of department to update"),
      UpdateDepartmentZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated locations")),
    },
  },

  getDepartments: {
    summary: "Get departments",
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

  deleteDepartments: {
    summary: "Delete a department",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      oids: z.array(z.string().describe("OID of department to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
