import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { DiscountMode } from "../Settings/Product/Discount";


export enum ApprovalRequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export enum ApprovalRequestType {
  EMPTY = "empty",
  TOUR_TRANSACTION_SPECIAL_DISCOUNT = "tour_transaction_special_discount",
  BUDGET_APPROVAL = "budget_approval",
  // Add more request types as needed
}

export const ApprovalRequestStatusZ = z.nativeEnum(ApprovalRequestStatus);
export const ApprovalRequestTypeZ = z.nativeEnum(ApprovalRequestType);

export const ApprovalRequestTourTransactionSpecialDiscountPayloadZ = z.object({
  type: z.literal(ApprovalRequestType.TOUR_TRANSACTION_SPECIAL_DISCOUNT),
  discountName: z.string(),
  discountValue: z.number(),
  discountMode: z.nativeEnum(DiscountMode),
  reason: z.string().optional(),
});

export type ApprovalRequestTourTransactionSpecialDiscountPayload =
  z.infer<typeof ApprovalRequestTourTransactionSpecialDiscountPayloadZ>;

export const ApprovalRequestBudgetApprovalPayloadZ = z.object({
  type: z.literal(ApprovalRequestType.BUDGET_APPROVAL),
  // empty payload
});

export type ApprovalRequestBudgetApprovalPayload = z.infer<typeof ApprovalRequestBudgetApprovalPayloadZ>;

export const ApprovalRequestPayloadZ = z.discriminatedUnion("type", [
  ApprovalRequestTourTransactionSpecialDiscountPayloadZ,
  ApprovalRequestBudgetApprovalPayloadZ,
]);

export type ApprovalRequestPayload = z.infer<typeof ApprovalRequestPayloadZ>;

// Socket Events
export enum ApprovalRequestEvents {
  APPROVAL_REQUEST_LIST_UPDATED = "APPROVAL_REQUEST_LIST_UPDATED",
  APPROVAL_REQUEST_UPDATED = "APPROVAL_REQUEST_UPDATED",
}

export const ApprovalRequestZ = EntityZ.extend({
  entityType: z.literal(EntityType.APPROVAL_REQUEST),

  type: z.nativeEnum(ApprovalRequestType),
  status: z.nativeEnum(ApprovalRequestStatus),

  entityOID: z.string(),
  payload: ApprovalRequestPayloadZ,
  remarks: z.string().optional(),

  assigneeOID: z.string(),
  assigneeNote: z.string().optional(),
});

export type ApprovalRequest = z.infer<typeof ApprovalRequestZ>;
