import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum ApprovalRequestV2Status {
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

export enum ApprovalAction {
  APPROVE = "APPROVE",
  REJECT = "REJECT",
}

export const ApprovalRequestV2Z = EntityZ.extend({
  entityType: z.literal(EntityType.APPROVAL_REQUEST_V2),
  approvalOID: EntityOIDZ,
  targetEntityOid: z.string(),
  submitterOID: EntityOIDZ,
  departmentOID: EntityOIDZ.optional(),
  status: z.nativeEnum(ApprovalRequestV2Status),
  rejectionReason: z.string().optional(),
  completedAt: z.string().datetime().optional(),
  metadata: z.unknown().optional(),
});

export type ApprovalRequestV2 = z.infer<typeof ApprovalRequestV2Z>;
