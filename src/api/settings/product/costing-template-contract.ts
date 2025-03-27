import { initContract } from "@ts-rest/core";
import { z } from "zod";

import {
  CostingTemplateZ,
} from "../../../entities/Settings/Product/CostingTemplate";


const basePath = "/api/settings/costing-templates";

const UpdateCostingTemplateZ = CostingTemplateZ.pick({
  name: true,
  remarks: true,
  isActive: true,
  costingItemOIDs: true,
});

const CreateCostingTemplateZ = UpdateCostingTemplateZ.extend({
  tenantOID: z.string(),
});

export type UpdateCostingTemplate = z.infer<typeof UpdateCostingTemplateZ>;
export type CreateCostingTemplate = z.infer<typeof CreateCostingTemplateZ>;

export const costingTemplateContract = initContract().router({
  getCostingTemplates: {
    summary: "Get costing templates",
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

  createCostingTemplate: {
    summary: "Create a new costing template",
    method: "POST",
    path: basePath,
    body: CreateCostingTemplateZ,
    responses: {
      200: z.string(),
    },
  },

  updateCostingTemplate: {
    summary: "Update an existing costing template",
    method: "PATCH",
    path: `${basePath}/:costingTemplateOID`,
    body: UpdateCostingTemplateZ,
    responses: {
      200: z.string(),
    },
  },

  updateCostingTemplates: {
    summary: "Update multiple existing costing templates",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of costing template to update"),
      UpdateCostingTemplateZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated costing templates")),
    },
  },

  deleteCostingTemplate: {
    summary: "Delete a costing template",
    method: "DELETE",
    path: `${basePath}/:costingTemplateOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteCostingTemplates: {
    summary: "Delete multiple costing templates",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      costingTemplateOIDs: z.array(z.string().describe("OIDs of costing templates to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },


});
