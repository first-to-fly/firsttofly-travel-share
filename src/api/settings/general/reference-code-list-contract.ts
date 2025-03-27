import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ReferenceCodeListZ } from "../../../entities/Settings/General/ReferenceCodeList";


const baseReferenceCodeListPath = "/api/settings/reference-code-lists";

// ReferenceCodeList contracts
const UpdateReferenceCodeListZ = ReferenceCodeListZ.pick({
  moduleId: true,
  name: true,
  counterType: true,
  resetCounterType: true,
  counterWidth: true,
  template: true,
  remarks: true,
  offlineOperator: true,
});

const CreateReferenceCodeListZ = UpdateReferenceCodeListZ.extend({
  tenantOID: z.string(),
});

export type UpdateReferenceCodeList = z.infer<typeof UpdateReferenceCodeListZ>;
export type CreateReferenceCodeList = z.infer<typeof CreateReferenceCodeListZ>;

export const referenceCodeListContract = initContract().router({
  // ReferenceCodeList endpoints
  getReferenceCodeLists: {
    summary: "Get reference code lists",
    method: "GET",
    path: baseReferenceCodeListPath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createReferenceCodeList: {
    summary: "Create a new reference code list",
    method: "POST",
    path: baseReferenceCodeListPath,
    body: CreateReferenceCodeListZ,
    responses: {
      200: z.string(),
    },
  },

  updateReferenceCodeList: {
    summary: "Update an existing reference code list",
    method: "PATCH",
    path: `${baseReferenceCodeListPath}/:referenceCodeListOID`,
    body: UpdateReferenceCodeListZ,
    responses: {
      200: z.string(),
    },
  },

  deleteReferenceCodeList: {
    summary: "Delete a reference code list",
    method: "DELETE",
    path: `${baseReferenceCodeListPath}/:referenceCodeListOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  updateReferenceCodeLists: {
    summary: "Update multiple existing reference code lists",
    method: "POST",
    path: `${baseReferenceCodeListPath}/batch-update`,
    body: z.record(
      z.string().describe("OID of reference code list to update"),
      UpdateReferenceCodeListZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated reference code lists")),
    },
  },

  deleteReferenceCodeLists: {
    summary: "Delete multiple reference code lists",
    method: "POST",
    path: `${baseReferenceCodeListPath}/batch-delete`,
    body: z.object({
      referenceCodeListOIDs: z.array(z.string().describe("OIDs of reference code lists to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
