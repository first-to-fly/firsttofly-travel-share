// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { NamedURLZ } from "../../types/url";


const basePath = "/api/customer-booking-links";

const SecureTokenBodyZ = z.object({
  secureToken: z.string().min(1, "secureToken is required"),
});

const NamedURLArrayZ = z.array(NamedURLZ).min(1, "At least one document is required");

const PaxParamZ = z.object({
  paxOID: z.string().min(1, "paxOID is required"),
});

const UploadDocumentsBodyZ = SecureTokenBodyZ.extend({
  documents: NamedURLArrayZ,
});

const UpdateRemarksBodyZ = SecureTokenBodyZ.extend({
  remarks: z.string().nullable(),
});

const RemoveDocumentsBodyZ = SecureTokenBodyZ.extend({
  documentIds: z.array(z.string().min(1, "documentId is required")).min(1, "At least one documentId is required"),
});

export type CustomerPaxSecureTokenBody = z.infer<typeof SecureTokenBodyZ>;
export type CustomerPaxUploadDocumentsBody = z.infer<typeof UploadDocumentsBodyZ>;
export type CustomerPaxUpdateRemarksBody = z.infer<typeof UpdateRemarksBodyZ>;
export type CustomerPaxRemoveDocumentsBody = z.infer<typeof RemoveDocumentsBodyZ>;
export type CustomerPaxParams = z.infer<typeof PaxParamZ>;


export const customerPaxContract = initContract().router({
  uploadDocuments: {
    summary: "Attach uploaded documents to a passenger",
    method: "POST",
    path: `${basePath}/pax/:paxOID/documents`,
    pathParams: PaxParamZ,
    body: UploadDocumentsBodyZ,
    responses: {
      200: z.boolean(),
    },
  },

  updateRemarks: {
    summary: "Update passenger remarks",
    method: "PATCH",
    path: `${basePath}/pax/:paxOID/remarks`,
    pathParams: PaxParamZ,
    body: UpdateRemarksBodyZ,
    responses: {
      200: z.boolean(),
    },
  },

  removeDocuments: {
    summary: "Remove passenger documents",
    method: "POST",
    path: `${basePath}/pax/:paxOID/documents/remove`,
    pathParams: PaxParamZ,
    body: RemoveDocumentsBodyZ,
    responses: {
      200: z.boolean(),
    },
  },

  confirmPaxInfo: {
    summary: "Confirm passenger information",
    method: "POST",
    path: `${basePath}/pax/:paxOID/confirm-info`,
    pathParams: PaxParamZ,
    body: SecureTokenBodyZ,
    responses: {
      200: z.boolean(),
    },
  },

});

export type CustomerPaxContract = typeof customerPaxContract;
