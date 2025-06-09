import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DocumentZ } from "../../entities/Document/Document";


const basePath = "/api/documents";

const UpdateDocumentZ = DocumentZ.pick({
  type: true,
  name: true,
  entityOID: true,
  docIdentification: true,
  issueDate: true,
  expiryDate: true,
  files: true,
});

const CreateDocumentZ = UpdateDocumentZ.extend({
  entityOID: z.string(),
  tenantOID: z.string(),
});

export type UpdateDocument = z.infer<typeof UpdateDocumentZ>;
export type CreateDocument = z.infer<typeof CreateDocumentZ>;

export const documentContract = initContract().router({

  createDocument: {
    summary: "Create a new document",
    method: "POST",
    path: basePath,
    body: CreateDocumentZ,
    responses: {
      200: z.string(),
    },
  },

  createDocuments: {
    summary: "Create multiple documents",
    method: "POST",
    path: `${basePath}/batch-create`,
    body: z.array(CreateDocumentZ),
    responses: {
      200: z.array(z.object({
        oid: z.string(),
        entityOID: z.string(),
      })),
    },
  },

  updateDocument: {
    summary: "Update an existing document",
    method: "PATCH",
    path: `${basePath}/:documentOID`,
    body: UpdateDocumentZ,
    responses: {
      200: z.string(),
    },
  },

  updateDocuments: {
    summary: "Update multiple existing documents",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of document to update"),
      UpdateDocumentZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated documents")),
    },
  },

  deleteDocument: {
    summary: "Delete a document",
    method: "DELETE",
    path: `${basePath}/:documentOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteDocuments: {
    summary: "Delete multiple documents",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      documentOIDs: z.array(z.string().describe("OIDs of documents to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
