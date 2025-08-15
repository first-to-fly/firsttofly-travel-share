import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { ApprovalRequestMetadataZ } from "./ApprovalRequestMetadata";


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

export enum ApprovalAction {
  APPROVE = "APPROVE",
  REJECT = "REJECT",
}

export const ApprovalRequestZ = EntityZ.extend({
  entityType: z.literal(EntityType.APPROVAL_REQUEST),
  approvalOID: EntityOIDZ,
  targetEntityOID: EntityOIDZ,
  submitterOID: EntityOIDZ,
  departmentOID: EntityOIDZ.optional(),
  status: z.nativeEnum(ApprovalRequestStatus),
  rejectionReason: z.string().optional(),
  completedAt: DateISOStringZ.optional(),
  metadata: ApprovalRequestMetadataZ,
  code: z.string(),
});

export type ApprovalRequest = z.infer<typeof ApprovalRequestZ>;
