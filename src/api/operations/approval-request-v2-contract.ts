import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ApprovalRequestV2Z } from "../../entities/Operations/ApprovalRequestV2";


const basePath = "/api/operations/approval-requests-v2";

const CreateApprovalRequestV2Z = ApprovalRequestV2Z.pick({
  tenantOID: true,
  approvalOID: true,
  targetEntityOid: true,
  submitterOID: true,
  departmentOID: true,
  metadata: true,
});

const UpdateApprovalRequestV2Z = CreateApprovalRequestV2Z.omit({
  tenantOID: true,
  approvalOID: true,
}).partial();


export type CreateApprovalRequestV2 = z.infer<typeof CreateApprovalRequestV2Z>;
export type UpdateApprovalRequestV2 = z.infer<typeof UpdateApprovalRequestV2Z>;

export const approvalRequestV2Contract = initContract().router({
  getApprovalRequestsV2: {
    summary: "Get approval requests",
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

  createApprovalRequestV2: {
    summary: "Create a new approval request",
    method: "POST",
    path: basePath,
    body: CreateApprovalRequestV2Z,
    responses: {
      200: z.string(),
    },
  },

  updateApprovalRequestsV2: {
    summary: "Update multiple existing approval requests",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of approval request to update"),
      UpdateApprovalRequestV2Z,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated approval requests")),
    },
  },

  deleteApprovalRequestsV2: {
    summary: "Delete multiple approval requests",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      approvalRequestOIDs: z.array(z.string().describe("OIDs of approval requests to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },


  getApprovalRequestV2: {
    summary: "Get a single approval request",
    method: "GET",
    path: `${basePath}/:requestId`,
    pathParams: z.object({
      requestId: z.string().describe("OID of approval request to get"),
    }),
    responses: {
      200: ApprovalRequestV2Z,
    },
  },

  getApprovalRequestsMe: {
    summary: "Get pending approval requests for current user",
    method: "GET",
    path: `${basePath}/me`,
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  approveRequest: {
    summary: "Approve a single approval request",
    method: "POST",
    path: `${basePath}/:approverId/approve`,
    pathParams: z.object({
      approverId: z.string().describe("ID of the approver"),
    }),
    body: z.object({
      comments: z.string().optional(),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  rejectRequest: {
    summary: "Reject a single approval request",
    method: "POST",
    path: `${basePath}/:approverId/reject`,
    pathParams: z.object({
      approverId: z.string().describe("ID of the approver"),
    }),
    body: z.object({
      comments: z.string().optional(),
      rejectionReason: z.string(),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
