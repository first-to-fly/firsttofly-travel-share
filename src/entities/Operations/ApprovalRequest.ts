import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { TourTransactionPaxPersonalDetailsZ, TourTransactionPaxType } from "../Sales/TourTransactionPax";
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
  TOUR_TRANSACTION_BOOKING_TRANSFER = "tour_transaction_booking_transfer",
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

export const ApprovalRequestTourTransactionBookingTransferPayloadZ = z.object({
  type: z.literal(ApprovalRequestType.TOUR_TRANSACTION_BOOKING_TRANSFER),
  originalTourTransactionOID: EntityOIDZ,
  transferItems: z.array(z.object({
    targetTourDepartureOID: EntityOIDZ,
    passengers: z.array(z.object({
      oid: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      paxType: z.nativeEnum(TourTransactionPaxType),
      personalDetails: TourTransactionPaxPersonalDetailsZ,
    })),
    rooms: z.array(z.object({
      roomType: z.string(),
      roomCategory: z.string(),
      adultsCount: z.number(),
      childrenWithBedCount: z.number(),
      childrenNoBedCount: z.number(),
      infantsCount: z.number(),
      passengerAssignments: z.array(z.object({
        passengerOID: EntityOIDZ,
        paxType: z.nativeEnum(TourTransactionPaxType),
      })),
    })),
    addons: z.array(z.object({
      oid: z.string().optional(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      tax: z.number().optional(),
      totalPrice: z.number(),
      type: z.string().optional(), // TourTransactionAddonType as string
      groupTourPricingOID: EntityOIDZ.optional(),
      groupTourCostingEntryOID: EntityOIDZ.optional(),
      tourTransactionAddonOID: EntityOIDZ.optional(),
      toBeRemoved: z.boolean().optional(),
    })),
    discounts: z.array(z.object({
      oid: z.string().optional(),
      name: z.string(),
      type: z.string(), // TourTransactionDiscountType as string
      amount: z.number(),
      discountMode: z.nativeEnum(DiscountMode),
      code: z.string().optional(),
      discountCodeOID: EntityOIDZ.optional(),
      reason: z.string().optional(),
      assigneeOID: EntityOIDZ.optional(),
      tourDepartureDiscountGroupIndex: z.number().optional(),
      tourTransactionDiscountOID: EntityOIDZ.optional(),
      approvalRequestOID: EntityOIDZ.optional(),
      toBeRemoved: z.boolean().optional(),
    })),
    specialInstructions: z.array(z.string()).optional(),
  })),
  transferReason: z.string(),
  financialSummary: z.object({
    originalBookingPaidAmount: z.number(),
    transferAllocation: z.array(z.object({
      targetIndex: z.number(),
      allocatedAmount: z.number(),
      newBookingTotal: z.number(),
      balanceDue: z.number(),
    })),
  }),
});

export type ApprovalRequestTourTransactionBookingTransferPayload =
  z.infer<typeof ApprovalRequestTourTransactionBookingTransferPayloadZ>;

export const ApprovalRequestPayloadZ = z.discriminatedUnion("type", [
  ApprovalRequestTourTransactionSpecialDiscountPayloadZ,
  ApprovalRequestBudgetApprovalPayloadZ,
  ApprovalRequestTourTransactionBookingTransferPayloadZ,
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

  entityOID: EntityOIDZ,
  payload: ApprovalRequestPayloadZ,
  remarks: z.string().optional(),

  assigneeOID: EntityOIDZ,
  assigneeNote: z.string().optional(),
});

export type ApprovalRequest = z.infer<typeof ApprovalRequestZ>;
