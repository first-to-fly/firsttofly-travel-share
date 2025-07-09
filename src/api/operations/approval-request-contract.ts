import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { ApprovalRequestStatus, ApprovalRequestZ } from "../../entities/Operations/ApprovalRequest";
import { ApprovalType } from "../../entities/Settings/General/Approval";


const basePath = "/api/operations/approval-requests";

const CreateApprovalRequestZ = ApprovalRequestZ.pick({
  tenantOID: true,
  approvalOID: true,
  targetEntityOID: true,
  submitterOID: true,
  departmentOID: true,
  metadata: true,
});

const UpdateApprovalRequestZ = CreateApprovalRequestZ.omit({
  tenantOID: true,
  approvalOID: true,
}).partial();


export type CreateApprovalRequest = z.infer<typeof CreateApprovalRequestZ>;
export type UpdateApprovalRequest = z.infer<typeof UpdateApprovalRequestZ>;

export const approvalRequestContract = initContract().router({
  getApprovalRequests: {
    summary: "Get approval requests",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      targetEntityOID: z.string().optional(),
      statuses: z.array(z.nativeEnum(ApprovalRequestStatus)).optional(),
      types: z.array(z.nativeEnum(ApprovalType)).optional(),
      assigneeOIDs: z.array(z.string()).optional(),
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

  deleteApprovalRequests: {
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
    path: `${basePath}/:requestOID/approve`,
    pathParams: z.object({
      requestOID: z.string().describe("OID of the request"),
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
    path: `${basePath}/:requestOID/reject`,
    pathParams: z.object({
      requestOID: z.string().describe("OID of the request"),
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
