import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ReferenceCodeTemplateZ } from "../../../entities/Settings/General/ReferenceCodeTemplate";


const basePath = "/api/reference-code-templates";

const UpdateReferenceCodeTemplateZ = ReferenceCodeTemplateZ.pick({
  name: true,
  counterType: true,
  resetCounterType: true,
  counterWidth: true,
  template: true,
  remarks: true,
  offlineOperator: true,
  referenceCodeTreeOID: true,
});

const CreateReferenceCodeTemplateZ = UpdateReferenceCodeTemplateZ.extend({
  tenantOID: z.string(),
});

export type UpdateReferenceCodeTemplate = z.infer<typeof UpdateReferenceCodeTemplateZ>;
export type CreateReferenceCodeTemplate = z.infer<typeof CreateReferenceCodeTemplateZ>;

export const referenceCodeTemplateContract = initContract().router({
  getReferenceCodeTemplates: {
    summary: "Get reference code templates",
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

  createReferenceCodeTemplate: {
    summary: "Create a new reference code template",
    method: "POST",
    path: basePath,
    body: CreateReferenceCodeTemplateZ,
    responses: {
      200: z.string(),
    },
  },

  updateReferenceCodeTemplate: {
    summary: "Update an existing reference code template",
    method: "PATCH",
    path: `${basePath}/:referenceCodeTemplateOID`,
    body: UpdateReferenceCodeTemplateZ,
    responses: {
      200: z.string(),
    },
  },

  updateReferenceCodeTemplates: {
    summary: "Update multiple existing reference code templates",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of reference code template to update"),
      UpdateReferenceCodeTemplateZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated reference code templates")),
    },
  },

  deleteReferenceCodeTemplate: {
    summary: "Delete a reference code template",
    method: "DELETE",
    path: `${basePath}/:referenceCodeTemplateOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteReferenceCodeTemplates: {
    summary: "Delete multiple reference code templates",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      referenceCodeTemplateOIDs: z.array(z.string().describe("OIDs of reference code templates to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
