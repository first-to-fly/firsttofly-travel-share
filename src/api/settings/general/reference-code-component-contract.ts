import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ReferenceCodeComponentZ } from "../../../entities/Settings/General/ReferenceCodeComponent";


const basePath = "/api/settings/reference-code-components";

const CreateReferenceCodeComponentZ = ReferenceCodeComponentZ.pick({
  tenantOID: true,
  name: true,
  code: true,
  type: true,
  seq: true,
  description: true,
});

const UpdateReferenceCodeComponentZ = CreateReferenceCodeComponentZ.omit({
  tenantOID: true,
}).partial();

export type UpdateReferenceCodeComponent = z.infer<typeof UpdateReferenceCodeComponentZ>;
export type CreateReferenceCodeComponent = z.infer<typeof CreateReferenceCodeComponentZ>;

export const referenceCodeComponentContract = initContract().router({
  getReferenceCodeComponents: {
    summary: "Get reference code components",
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

  createReferenceCodeComponent: {
    summary: "Create a new reference code component",
    method: "POST",
    path: basePath,
    body: CreateReferenceCodeComponentZ,
    responses: {
      200: z.string(),
    },
  },

  updateReferenceCodeComponent: {
    summary: "Update an existing reference code component",
    method: "PATCH",
    path: `${basePath}/:referenceCodeComponentOID`,
    body: UpdateReferenceCodeComponentZ,
    responses: {
      200: z.string(),
    },
  },

  updateReferenceCodeComponents: {
    summary: "Update multiple existing reference code components",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of reference code component to update"),
      UpdateReferenceCodeComponentZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated reference code components")),
    },
  },

  deleteReferenceCodeComponent: {
    summary: "Delete a reference code component",
    method: "DELETE",
    path: `${basePath}/:referenceCodeComponentOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteReferenceCodeComponents: {
    summary: "Delete multiple reference code components",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      referenceCodeComponentOIDs: z.array(z.string().describe("OIDs of reference code components to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
