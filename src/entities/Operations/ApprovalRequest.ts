import { z } from "zod";


export enum ApprovalRequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export enum ApprovalRequestType {
  TOUR_TRANSACTION_SPECIAL_DISCOUNT = "tour_transaction_special_discount",
  BUDGET_APPROVAL = "budget_approval",
  // Add more request types as needed
}

export const ApprovalRequestStatusZ = z.nativeEnum(ApprovalRequestStatus);
export const ApprovalRequestTypeZ = z.nativeEnum(ApprovalRequestType);

export const TourTransactionSpecialDiscountPayloadZ = z.object({
  type: z.literal(ApprovalRequestType.TOUR_TRANSACTION_SPECIAL_DISCOUNT),
  discountName: z.string(),
  discountAmount: z.number(),
  isPercentage: z.boolean(),
  reason: z.string().optional(),
});

export type TourTransactionSpecialDiscountPayload = z.infer<typeof TourTransactionSpecialDiscountPayloadZ>;

export const BudgetApprovalPayloadZ = z.object({
  type: z.literal(ApprovalRequestType.BUDGET_APPROVAL),
  // empty payload
});

export type BudgetApprovalPayload = z.infer<typeof BudgetApprovalPayloadZ>;

export const ApprovalRequestPayloadZ = z.discriminatedUnion("type", [
  TourTransactionSpecialDiscountPayloadZ,
  BudgetApprovalPayloadZ,
]);

export type ApprovalRequestPayload = z.infer<typeof ApprovalRequestPayloadZ>;


export const ApprovalRequestZ = z.object({
  requestId: z.string(),
  tenantOID: z.string(),
  type: ApprovalRequestTypeZ,
  entityOID: z.string(),
  payload: ApprovalRequestPayloadZ,
  status: ApprovalRequestStatusZ,
  remarks: z.string().optional(),
  assigneeOID: z.string(),
  assigneeNote: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
  deletedAt: z.string().optional(),
});

export type ApprovalRequest = z.infer<typeof ApprovalRequestZ>;
