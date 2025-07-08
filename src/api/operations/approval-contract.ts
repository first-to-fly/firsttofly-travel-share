import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ApprovalZ } from "../../entities/Operations/Approval";


const basePath = "/api/operations/approvals";

const CreateApprovalZ = ApprovalZ.pick({
  tenantOID: true,
  name: true,
  approvalType: true,
  targetEntityType: true,
  groups: true,
  sendEmail: true,
  notifySubmitterOnFinalOutcome: true,
  levels: true,
  isEnabled: true,
});


const UpdateApprovalZ = CreateApprovalZ.omit({
  tenantOID: true,
}).partial();


export type CreateApproval = z.infer<typeof CreateApprovalZ>;
export type UpdateApproval = z.infer<typeof UpdateApprovalZ>;

export const approvalContract = initContract().router({
  getApprovals: {
    summary: "Get approvals",
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

  getApprovalsByType: {
    summary: "Get approvals by approval type",
    method: "GET",
    path: `${basePath}/by-type/:approvalType`,
    pathParams: z.object({
      approvalType: z.string().describe("Approval type to filter by"),
    }),
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createApproval: {
    summary: "Create a new approval",
    method: "POST",
    path: basePath,
    body: CreateApprovalZ,
    responses: {
      200: z.string().describe("OID of created approval"),
    },
  },


  updateApprovals: {
    summary: "Update multiple existing approvals",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of approval to update"),
      UpdateApprovalZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated approvals")),
    },
  },


  getApproval: {
    summary: "Get a single approval",
    method: "GET",
    path: `${basePath}/:approvalId`,
    pathParams: z.object({
      approvalId: z.string().describe("OID of approval to get"),
    }),
    responses: {
      200: ApprovalZ,
    },
  },

  updateApproval: {
    summary: "Update a single approval",
    method: "PUT",
    path: `${basePath}/:approvalId`,
    pathParams: z.object({
      approvalId: z.string().describe("OID of approval to update"),
    }),
    body: UpdateApprovalZ,
    responses: {
      200: z.string().describe("OID of updated approval"),
    },
  },

  deleteApproval: {
    summary: "Delete a single approval",
    method: "DELETE",
    path: `${basePath}/:approvalId`,
    pathParams: z.object({
      approvalId: z.string().describe("OID of approval to delete"),
    }),
    body: z.null(),
    responses: {
      200: z.boolean(),
    },
  },

  deleteApprovals: {
    summary: "Delete multiple approvals",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      approvalOIDs: z.array(z.string().describe("OIDs of approvals to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
