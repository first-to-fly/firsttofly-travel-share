import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TransportPlanZ } from "../../entities/Products/TransportPlan";


const basePath = "/api/pr/transport-plans";

const CreateTransportPlanZ = TransportPlanZ.pick({
  name: true,
  description: true,
  isActive: true,
  groupTourProductOID: true,
  transportSegmentOIDs: true,
}).extend({
  tenantOID: z.string(),
});

const UpdateTransportPlanZ = CreateTransportPlanZ.omit({
  tenantOID: true,
  groupTourProductOID: true,
}).partial();

export type CreateTransportPlan = z.infer<typeof CreateTransportPlanZ>;
export type UpdateTransportPlan = z.infer<typeof UpdateTransportPlanZ>;

export const transportPlanContract = initContract().router({
  getTransportPlans: {
    summary: "Get transport plans",
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

  createTransportPlan: {
    summary: "Create a new transport plan",
    method: "POST",
    path: basePath,
    body: CreateTransportPlanZ,
    responses: {
      200: z.string(),
    },
  },

  updateTransportPlans: {
    summary: "Update multiple existing transport plans",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of transport plan to update"),
      UpdateTransportPlanZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated transport plans")),
    },
  },

  deleteTransportPlans: {
    summary: "Delete multiple transport plans",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      transportPlanOIDs: z.array(z.string().describe("OIDs of transport plans to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },

});
