import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { UsefulInfoZ } from "../../../entities/Settings/Product/UsefulInfo";


const basePath = "/api/useful-infos";

// Define the UsefulInfoRef schema
const UsefulInfoRefZ = z.object({
  refId: z.number(),
  name: z.string(),
});

export type UsefulInfoRef = z.infer<typeof UsefulInfoRefZ>;

const CreateUsefulInfoZ = UsefulInfoZ.pick({
  tenantOID: true,
  name: true,
  isActive: true,
  remarks: true,
  info: true,
  productTypes: true,
  applyToEntityOIDs: true,
}).extend({
  refs: z.array(UsefulInfoRefZ).optional(),
});

const UpdateUsefulInfoZ = CreateUsefulInfoZ.omit({
  tenantOID: true,
}).partial();

export type UpdateUsefulInfo = z.infer<typeof UpdateUsefulInfoZ>;
export type CreateUsefulInfo = z.infer<typeof CreateUsefulInfoZ>;

// Define the API contract
export const usefulInfoContract = initContract().router({
  getUsefulInfos: {
    summary: "Get useful infos",
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

  createUsefulInfo: {
    summary: "Create a new useful info",
    method: "POST",
    path: basePath,
    body: CreateUsefulInfoZ,
    responses: {
      200: z.string(),
    },
  },

  updateUsefulInfos: {
    summary: "Update multiple existing useful infos",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of useful info to update"),
      UpdateUsefulInfoZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated useful infos")),
    },
  },

  deleteUsefulInfos: {
    summary: "Delete multiple useful infos",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      usefulInfoOIDs: z.array(z.string().describe("OIDs of useful infos to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
