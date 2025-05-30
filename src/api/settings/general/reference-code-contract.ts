import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ReferenceCodeZ } from "../../../entities/Settings/General/ReferenceCode";


const basePath = "/api/settings/reference-codes";

const CreateReferenceCodeZ = ReferenceCodeZ.pick({
  tenantOID: true,
  name: true,
  moduleId: true,
  counterType: true,
  resetCounterType: true,
  counterWidth: true,
  template: true,
  componentIds: true,
});

const UpdateReferenceCodeZ = CreateReferenceCodeZ.omit({
  tenantOID: true,
}).partial();

export type UpdateReferenceCodeTemplate = z.infer<typeof UpdateReferenceCodeZ>;
export type CreateReferenceCodeTemplate = z.infer<typeof CreateReferenceCodeZ>;

export const referenceCodeContract = initContract().router({
  getReferenceCodes: {
    summary: "Get reference codes",
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

  // createReferenceCodeTemplate: {
  //   summary: "Create a new reference code template",
  //   method: "POST",
  //   path: basePath,
  //   body: CreateReferenceCodeZ,
  //   responses: {
  //     200: z.string(),
  //   },
  // },

  updateReferenceCode: {
    summary: "Update an existing reference code",
    method: "PATCH",
    path: `${basePath}/:referenceCodeOID`,
    body: UpdateReferenceCodeZ,
    responses: {
      200: z.string(),
    },
  },

  updateReferenceCodes: {
    summary: "Update multiple existing reference codes",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of reference code to update"),
      UpdateReferenceCodeZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated reference codes")),
    },
  },

  deleteReferenceCode: {
    summary: "Delete a reference code",
    method: "DELETE",
    path: `${basePath}/:referenceCodeOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteReferenceCodes: {
    summary: "Delete multiple reference codes",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      referenceCodeOIDs: z.array(z.string().describe("OIDs of reference codes to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
