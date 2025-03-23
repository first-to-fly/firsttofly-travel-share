import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DesignationZ } from "../../../entities/Settings/User/Designation";


const basePath = "/api/settings/designations";

const UpdateDesignationZ = DesignationZ.pick({
  name: true,
  abbreviation: true,
}).extend({
  userOIDs: z.array(z.string()).optional(),
});

export type UpdateDesignation = z.infer<typeof UpdateDesignationZ>;

const c = initContract();

export const designationContract = c.router({
  createDesignation: {
    summary: "Create a new designation",
    method: "POST",
    path: basePath,
    body: DesignationZ.pick({
      tenantOID: true,
      name: true,
      abbreviation: true,
    }).extend({
      userOIDs: z.array(z.string()).optional(),
    }),
    responses: {
      200: z.string(),
    },
  },

  updateDesignation: {
    summary: "Update an existing designation",
    method: "PATCH",
    path: `${basePath}/:designationOID`,
    body: UpdateDesignationZ,
    responses: {
      200: z.string(),
    },
  },

  updateDesignations: {
    summary: "Update multiple designations",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of designation to update"),
      UpdateDesignationZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated designations")),
    },
  },

  getDesignations: {
    summary: "Get designations",
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

  deleteDesignation: {
    summary: "Delete a designation",
    method: "DELETE",
    path: `${basePath}/:designationOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteDesignations: {
    summary: "Delete multiple designations",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      oids: z.array(z.string().describe("OID of designation to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
