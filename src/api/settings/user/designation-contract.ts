import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DesignationZ } from "../../../entities/Settings/User/Designation";


const basePath = "/api/settings/designations";

const CreateDesignationZ = DesignationZ.pick({
  tenantOID: true,
  name: true,
  abbreviation: true,
}).extend({
  userOIDs: z.array(z.string()).optional(),
});

const UpdateDesignationZ = CreateDesignationZ.omit({
  tenantOID: true,
}).partial();

export type UpdateDesignation = z.infer<typeof UpdateDesignationZ>;
export type CreateDesignation = z.infer<typeof CreateDesignationZ>;

const c = initContract();

export const designationContract = c.router({

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

  createDesignation: {
    summary: "Create a new designation",
    method: "POST",
    path: basePath,
    body: CreateDesignationZ,
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
