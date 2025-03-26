import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ReferenceCodeTreeZ } from "../entities/Settings/General/ReferenceCodeTree";


const basePath = "/api/reference-code-trees";

const UpdateReferenceCodeTreeZ = ReferenceCodeTreeZ.pick({
  name: true,
  moduleId: true,
  parentId: true,
  seq: true,
  offlineOperator: true,
});

const CreateReferenceCodeTreeZ = UpdateReferenceCodeTreeZ.extend({
  tenantOID: z.string(),
});

export type UpdateReferenceCodeTree = z.infer<typeof UpdateReferenceCodeTreeZ>;
export type CreateReferenceCodeTree = z.infer<typeof CreateReferenceCodeTreeZ>;

export const referenceCodeTreeContract = initContract().router({
  getReferenceCodeTrees: {
    summary: "Get reference code trees",
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

  createReferenceCodeTree: {
    summary: "Create a new reference code tree",
    method: "POST",
    path: basePath,
    body: CreateReferenceCodeTreeZ,
    responses: {
      200: z.string(),
    },
  },

  updateReferenceCodeTree: {
    summary: "Update an existing reference code tree",
    method: "PATCH",
    path: `${basePath}/:referenceCodeTreeOID`,
    body: UpdateReferenceCodeTreeZ,
    responses: {
      200: z.string(),
    },
  },

  updateReferenceCodeTrees: {
    summary: "Update multiple existing reference code trees",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of reference code tree to update"),
      UpdateReferenceCodeTreeZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated reference code trees")),
    },
  },

  deleteReferenceCodeTree: {
    summary: "Delete a reference code tree",
    method: "DELETE",
    path: `${basePath}/:referenceCodeTreeOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteReferenceCodeTrees: {
    summary: "Delete multiple reference code trees",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      referenceCodeTreeOIDs: z.array(z.string().describe("OIDs of reference code trees to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
