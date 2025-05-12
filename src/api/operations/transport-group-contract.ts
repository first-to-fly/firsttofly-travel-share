import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TransportGroupZ } from "../../entities/Operations/TransportGroup";


const basePath = "/api/operations/transport-groups";

const CreateTransportGroupZ = TransportGroupZ.pick({
  tenantOID: true,
  name: true,
  mainType: true,
  description: true,
});

const UpdateTransportGroupZ = CreateTransportGroupZ.omit({
  tenantOID: true,
}).partial();

export type UpdateTransportGroup = z.infer<typeof UpdateTransportGroupZ>;
export type CreateTransportGroup = z.infer<typeof CreateTransportGroupZ>;

export const transportGroupContract = initContract().router({
  getTransportGroups: {
    summary: "Get transport groups",
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

  createTransportGroup: {
    summary: "Create a new transport group",
    method: "POST",
    path: basePath,
    body: CreateTransportGroupZ,
    responses: {
      200: z.string(),
    },
  },

  updateTransportGroups: {
    summary: "Update multiple existing transport groups",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of transport group to update"),
      UpdateTransportGroupZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated transport groups")),
    },
  },

  deleteTransportGroups: {
    summary: "Delete multiple transport groups",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      transportGroupOIDs: z.array(z.string().describe("OIDs of transport groups to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
