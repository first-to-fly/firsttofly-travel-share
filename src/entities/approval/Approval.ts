import { z } from "zod";

import { EntityType } from "../entityType";
import { EntityZ, EntityOIDZ } from "../entity";


export enum ApprovalRequestStatus {
  IN_PROGRESS = "IN_PROGRESS",
  APPROVED = "APPROVED", 
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export enum ApprovalRequestApproverStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED", 
  SKIPPED = "SKIPPED",
}

export enum ApprovalLevelApproverType {
  DEPARTMENT = "DEPARTMENT",
  USER = "USER",
}

export enum ApprovalAction {
  APPROVE = "APPROVE",
  REJECT = "REJECT",
}

export const ApprovalLevelApproverZ = z.object({
  type: z.nativeEnum(ApprovalLevelApproverType),
  id: z.string().uuid(),
});

export const ApprovalLevelZ = z.object({
  minApprovers: z.number().int().positive(),
  allowSelfApproval: z.boolean(),
  approvers: z.array(ApprovalLevelApproverZ),
  levelTimeout: z.number().int().positive().default(604800000), // 7 days in milliseconds
});

export const TemporalWorkflowContextZ = z.object({
  workflowId: z.string(),
  runId: z.string(),
  startedAt: z.string(),
  taskQueue: z.string().optional(),
});


export const ApprovalZ = EntityZ.extend({
  entityType: z.literal(EntityType.APPROVAL),
  name: z.string().min(1).max(255),
  key: z.string().min(1).max(100),
  targetEntityType: z.string(),
  groups: z.array(z.string()).optional(),
  sendEmail: z.boolean().default(true),
  notifySubmitterOnFinalOutcome: z.boolean().default(true),
  levels: z.array(ApprovalLevelZ),
  isEnabled: z.boolean().default(true),
});

export const ApprovalRequestV2Z = EntityZ.extend({
  entityType: z.literal(EntityType.APPROVAL_REQUEST_V2),
  approvalOID: EntityOIDZ,
  targetEntityOid: z.string(),
  submitterOID: EntityOIDZ,
  departmentOID: EntityOIDZ.optional(),
  status: z.nativeEnum(ApprovalRequestStatus),
  rejectionReason: z.string().optional(),
  completedAt: z.string().datetime().optional(),
});



export type Approval = z.infer<typeof ApprovalZ>;
export type ApprovalRequestV2 = z.infer<typeof ApprovalRequestV2Z>;
export type ApprovalLevel = z.infer<typeof ApprovalLevelZ>;
export type ApprovalLevelApprover = z.infer<typeof ApprovalLevelApproverZ>;
export type TemporalWorkflowContext = z.infer<typeof TemporalWorkflowContextZ>;