import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ApprovalRequestStatusZ, ApprovalRequestTypeZ, ApprovalRequestZ } from "../../entities/Operations/ApprovalRequest";


const basePath = "/api/operations/approval-requests";

const CreateApprovalRequestZ = ApprovalRequestZ.pick({
  tenantOID: true,
  type: true,
  entityOid: true,
  payload: true,
  remarks: true,
  assigneeOID: true,
});

const UpdateApprovalRequestZ = z.object({
  assigneeOID: z.string().optional(),
  assigneeNote: z.string().optional(),
});

export type CreateApprovalRequest = z.infer<typeof CreateApprovalRequestZ>;
export type UpdateApprovalRequest = z.infer<typeof UpdateApprovalRequestZ>;

export const approvalRequestContract = initContract().router({
  getApprovalRequests: {
    summary: "Get approval requests",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      status: ApprovalRequestStatusZ.optional(),
      type: ApprovalRequestTypeZ.optional(),
      assigneeOID: z.string().optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createApprovalRequest: {
    summary: "Create a new approval request",
    method: "POST",
    path: basePath,
    body: CreateApprovalRequestZ,
    responses: {
      200: z.string(),
    },
  },

  updateApprovalRequests: {
    summary: "Update multiple existing approval requests",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of approval request to update"),
      UpdateApprovalRequestZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated approval requests")),
    },
  },

  batchApproveApprovalRequests: {
    summary: "Approve multiple pending approval requests",
    method: "POST",
    path: `${basePath}/batch-approve`,
    body: z.object({
      approvalRequestOIDs: z.array(z.string().describe("OIDs of approval requests to approve")),
      assigneeNote: z.string().optional().describe("Approver's comments"),
    }),
    responses: {
      200: z.array(z.string().describe("OIDs of approved approval requests")),
    },
  },

  batchRejectApprovalRequests: {
    summary: "Reject multiple pending approval requests",
    method: "POST",
    path: `${basePath}/batch-reject`,
    body: z.object({
      approvalRequestOIDs: z.array(z.string().describe("OIDs of approval requests to reject")),
      assigneeNote: z.string().optional().describe("Rejection reason"),
    }),
    responses: {
      200: z.array(z.string().describe("OIDs of rejected approval requests")),
    },
  },

  batchCancelApprovalRequests: {
    summary: "Cancel multiple approval requests",
    method: "POST",
    path: `${basePath}/batch-cancel`,
    body: z.object({
      approvalRequestOIDs: z.array(z.string().describe("OIDs of approval requests to cancel")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
