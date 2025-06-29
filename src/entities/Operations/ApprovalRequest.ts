import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { BookingAddonTypeZ } from "../Sales/BookingAddon";
import { BookingPaxPersonalDetailsZ, BookingPaxType } from "../Sales/BookingPax";
import { DiscountMode } from "../Settings/Product/Discount";


export enum ApprovalRequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export enum ApprovalRequestType {
  EMPTY = "empty",
  BOOKING_SPECIAL_DISCOUNT = "booking_special_discount",
  BUDGET_APPROVAL = "budget_approval",
  BOOKING_TRANSFER = "booking_transfer",
  // Add more request types as needed
}

export const ApprovalRequestStatusZ = z.nativeEnum(ApprovalRequestStatus);
export const ApprovalRequestTypeZ = z.nativeEnum(ApprovalRequestType);

export const ApprovalRequestBookingSpecialDiscountPayloadZ = z.object({
  type: z.literal(ApprovalRequestType.BOOKING_SPECIAL_DISCOUNT),
  discountName: z.string(),
  discountValue: z.number(),
  discountMode: z.nativeEnum(DiscountMode),
  reason: z.string().optional(),
});

export type ApprovalRequestBookingSpecialDiscountPayload =
  z.infer<typeof ApprovalRequestBookingSpecialDiscountPayloadZ>;

export const ApprovalRequestBudgetApprovalPayloadZ = z.object({
  type: z.literal(ApprovalRequestType.BUDGET_APPROVAL),
  // empty payload
});

export type ApprovalRequestBudgetApprovalPayload = z.infer<typeof ApprovalRequestBudgetApprovalPayloadZ>;

export const ApprovalRequestBookingTransferPayloadZ = z.object({
  type: z.literal(ApprovalRequestType.BOOKING_TRANSFER),
  originalBookingOID: EntityOIDZ,
  transferItems: z.array(z.object({
    targetTourDepartureOID: EntityOIDZ,
    passengers: z.array(z.object({
      oid: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      paxType: z.nativeEnum(BookingPaxType),
      personalDetails: BookingPaxPersonalDetailsZ,
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
        paxType: z.nativeEnum(BookingPaxType),
      })),
    })),
    addons: z.array(z.object({
      oid: z.string().optional(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      tax: z.number().optional(),
      totalPrice: z.number(),
      type: BookingAddonTypeZ.optional(),
      groupTourPricingOID: EntityOIDZ.optional(),
      groupTourCostingEntryOID: EntityOIDZ.optional(),
      bookingAddonOID: EntityOIDZ.optional(),
      toBeRemoved: z.boolean().optional(),
    })),
    discounts: z.array(z.object({
      oid: z.string().optional(),
      name: z.string(),
      type: z.string().optional(), // BookingDiscountType as string
      amount: z.number(),
      discountMode: z.nativeEnum(DiscountMode),
      code: z.string().optional(),
      discountCodeOID: EntityOIDZ.optional(),
      reason: z.string().optional(),
      assigneeOID: EntityOIDZ.optional(),
      tourDepartureDiscountGroupIndex: z.number().optional(),
      bookingDiscountOID: EntityOIDZ.optional(),
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

export type ApprovalRequestBookingTransferPayload =
  z.infer<typeof ApprovalRequestBookingTransferPayloadZ>;

export const ApprovalRequestPayloadZ = z.discriminatedUnion("type", [
  ApprovalRequestBookingSpecialDiscountPayloadZ,
  ApprovalRequestBudgetApprovalPayloadZ,
  ApprovalRequestBookingTransferPayloadZ,
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
