import { z } from "zod";

import { EntityOIDZ } from "../entity";
import { GroupTourBookingAddonTypeZ } from "../Sales/GroupTourBookingAddon";
import { GroupTourBookingPaxPersonalDetailsZ, GroupTourBookingPaxType } from "../Sales/GroupTourBookingPax";
import { DiscountMode } from "../Settings/Product/Discount";
import { ApprovalType } from "./Approval";


/**
 * Metadata types for approval requests - migrated from legacy ApprovalRequest module
 * These are used in the metadata field of ApprovalRequestV2 to preserve type safety
 */

export const ApprovalRequestGroupTourBookingSpecialDiscountMetadataZ = z.object({
  type: z.literal(ApprovalType.GROUP_TOUR_BOOKING_SPECIAL_DISCOUNT),
  discountName: z.string(),
  discountValue: z.number(),
  discountMode: z.nativeEnum(DiscountMode),
  reason: z.string().optional(),
});

export type ApprovalRequestGroupTourBookingSpecialDiscountMetadata =
  z.infer<typeof ApprovalRequestGroupTourBookingSpecialDiscountMetadataZ>;

export const ApprovalRequestBudgetApprovalMetadataZ = z.object({
  type: z.literal(ApprovalType.BUDGET_APPROVAL),
  // empty metadata
});

export type ApprovalRequestBudgetApprovalMetadata = z.infer<typeof ApprovalRequestBudgetApprovalMetadataZ>;

export const ApprovalRequestGroupTourBookingTransferMetadataZ = z.object({
  type: z.literal(ApprovalType.GROUP_TOUR_BOOKING_TRANSFER),
  originalBookingOID: EntityOIDZ,
  transferItems: z.array(z.object({
    targetBookingOID: EntityOIDZ,
    passengers: z.array(z.object({
      oid: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      paxType: z.nativeEnum(GroupTourBookingPaxType),
      personalDetails: GroupTourBookingPaxPersonalDetailsZ,
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
        paxType: z.nativeEnum(GroupTourBookingPaxType),
      })),
    })),
    addons: z.array(z.object({
      oid: z.string().optional(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      tax: z.number().optional(),
      totalPrice: z.number(),
      type: GroupTourBookingAddonTypeZ.optional(),
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

export type ApprovalRequestGroupTourBookingTransferMetadata =
  z.infer<typeof ApprovalRequestGroupTourBookingTransferMetadataZ>;

export const ApprovalRequestGroupTourBookingAmendmentMetadataZ = z.object({
  type: z.literal(ApprovalType.GROUP_TOUR_BOOKING_AMENDMENT),
  originalBookingOID: EntityOIDZ,

  // Complete amended form values for execution
  amendedFormValues: z.object({
    groupTourBookingOID: z.string().optional(),
    tourDepartureOID: z.string(),
    rooms: z.array(z.object({
      roomNumber: z.number(),
      passengers: z.array(z.object({
        oid: z.string().optional(),
        title: z.string(),
        gender: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        dateOfBirth: z.string().optional(),
        nationality: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        alternativeMobile: z.string().optional(),
        address: z.string().optional(),
        postalCode: z.string().optional(),
        isLeadPassenger: z.boolean().optional(),
      })),
      adultSelections: z.array(z.object({
        paxIndex: z.number(),
        tourType: z.enum(["full-tour", "land-only"]),
        groupTourBookingPaxOID: z.string().optional(),
      })),
      childWithBedSelections: z.array(z.object({
        paxIndex: z.number(),
        tourType: z.enum(["full-tour", "land-only"]),
        groupTourBookingPaxOID: z.string().optional(),
      })),
      childNoBedSelections: z.array(z.object({
        paxIndex: z.number(),
        tourType: z.enum(["full-tour", "land-only"]),
        groupTourBookingPaxOID: z.string().optional(),
      })),
      infantSelections: z.array(z.object({
        paxIndex: z.number(),
        tourType: z.enum(["full-tour", "land-only"]),
        groupTourBookingPaxOID: z.string().optional(),
      })),
      selectedRuleOID: z.string().optional(),
      bookingRoomOID: z.string().optional(),
      toBeRemoved: z.boolean().optional(),
    })),
    bookingAddOns: z.array(z.object({
      oid: z.string().optional(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      tax: z.number().optional(),
      totalPrice: z.number(),
      type: GroupTourBookingAddonTypeZ.optional(),
      groupTourPricingOID: z.string().optional(),
      groupTourCostingEntryOID: z.string().optional(),
      groupTourBookingAddonOID: z.string().optional(),
      toBeRemoved: z.boolean().optional(),
    })),
    bookingDiscounts: z.array(z.object({
      oid: z.string().optional(),
      name: z.string(),
      type: z.string().optional(),
      amount: z.number(),
      discountMode: z.nativeEnum(DiscountMode),
      code: z.string().optional(),
      discountCodeOID: z.string().optional(),
      reason: z.string().optional(),
      assigneeOID: z.string().optional(),
      tourDepartureDiscountGroupIndex: z.number().optional(),
      groupTourBookingDiscountOID: z.string().optional(),
      approvalRequestOID: z.string().optional(),
      toBeRemoved: z.boolean().optional(),
    })),
    specialInstructions: z.array(z.string()).optional(),
    overwriteTax: z.object({
      scheme: z.string(),
      rate: z.number(),
    }).optional(),
    totalAmount: z.number(),
    primaryContact: z.object({
      oid: z.string().optional(),
      title: z.string(),
      gender: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      dateOfBirth: z.string().optional(),
      nationality: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      alternativeMobile: z.string().optional(),
      address: z.string().optional(),
      postalCode: z.string().optional(),
      isLeadPassenger: z.boolean().optional(),
    }),
  }),

  // Calculated breakdown for amended booking (for comparison UI)
  amendedBreakdown: z.object({
    tourFare: z.array(z.object({
      paxType: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      subTotal: z.number(),
    })),
    miscellaneous: z.array(z.object({
      name: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      subTotal: z.number(),
    })),
    addons: z.array(z.object({
      name: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      subTotal: z.number(),
    })),
    discounts: z.array(z.object({
      discountOID: z.string(),
      description: z.string().optional(),
      appliedAmount: z.number(),
    })),
    taxes: z.array(z.object({
      name: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      subTotal: z.number(),
    })),
    total: z.number(),
  }),

  // Financial summary for the amended booking
  financialSummary: z.object({
    amendedTotal: z.number(),
    totalDifference: z.number(),
    originalOutstanding: z.number(),
    amendedOutstanding: z.number(),
    receivedAmount: z.number(),
    refundRequired: z.boolean(),
    refundAmount: z.number(),
    additionalPaymentRequired: z.boolean(),
    additionalPaymentAmount: z.number(),
  }),

  // Amendment metadata
  amendmentReason: z.string(),
  changedFields: z.array(z.string()),
  requestedBy: EntityOIDZ,
  requestedDate: z.string(),
});

export type ApprovalRequestGroupTourBookingAmendmentMetadata =
  z.infer<typeof ApprovalRequestGroupTourBookingAmendmentMetadataZ>;

// Union type for all metadata
export const ApprovalRequestMetadataZ = z.union([
  ApprovalRequestGroupTourBookingSpecialDiscountMetadataZ,
  ApprovalRequestBudgetApprovalMetadataZ,
  ApprovalRequestGroupTourBookingTransferMetadataZ,
  ApprovalRequestGroupTourBookingAmendmentMetadataZ,
]);

export type ApprovalRequestMetadata = z.infer<typeof ApprovalRequestMetadataZ>;
