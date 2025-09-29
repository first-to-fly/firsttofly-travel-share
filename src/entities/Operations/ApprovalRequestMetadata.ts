import type { EnumLike } from "zod";
import { z } from "zod";

import { BookingDiscountTypeZ, BookingPaxPersonalDetailsZ, BookingPaxType } from "../../enums/BookingTypes";
import { EntityOIDZ } from "../entity";
import { BillStatus } from "../Finance/Bill";
import { MatchDocStatus } from "../Finance/MatchDoc";
import { GroupTourPricingFareStructureZ } from "../Products/GroupTourPricing";
import { GroupTourBookingAddonTypeZ } from "../Sales/GroupTourBookingAddon";
import { IndependentTourBookingAddonTypeZ } from "../Sales/IndependentTourBookingAddon";
import { ApprovalType } from "../Settings/General/Approval";
import { DiscountMode } from "../Settings/Product/Discount";
import { ExchangeOrderStatus } from "./ExchangeOrder";


/**
 * Metadata types for approval requests - migrated from legacy ApprovalRequest module
 * These are used in the metadata field of ApprovalRequest to preserve type safety
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

export const ApprovalRequestIndependentTourBookingSpecialDiscountMetadataZ = z.object({
  type: z.literal(ApprovalType.INDEPENDENT_TOUR_BOOKING_SPECIAL_DISCOUNT),
  discountName: z.string(),
  discountValue: z.number(),
  discountMode: z.nativeEnum(DiscountMode),
  reason: z.string().optional(),
});

export type ApprovalRequestIndependentTourBookingSpecialDiscountMetadata =
  z.infer<typeof ApprovalRequestIndependentTourBookingSpecialDiscountMetadataZ>;

export const ApprovalRequestBudgetApprovalMetadataZ = z.object({
  type: z.literal(ApprovalType.BUDGET_APPROVAL),
  // empty metadata
});

export type ApprovalRequestBudgetApprovalMetadata = z.infer<typeof ApprovalRequestBudgetApprovalMetadataZ>;

// Legacy GTB transfer metadata removed in favor of unified BookingTransfer schema

// Common booking breakdown schema used for both original and amended breakdowns
const BookingBreakdownZ = z.object({
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
});

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
    overridePricing: z.object({
      fullFare: GroupTourPricingFareStructureZ.partial().optional(),
      landFare: GroupTourPricingFareStructureZ.partial().optional(),
    }).optional(),
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

  // Calculated breakdown for original booking (before amendment)
  originalBookingBreakdown: BookingBreakdownZ,

  // Calculated breakdown for amended booking (for comparison UI)
  amendedBreakdown: BookingBreakdownZ,

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

// Independent Tour Booking Amendment metadata (parallel to group tour, adapted for independent tour forms)
export const ApprovalRequestIndependentTourBookingAmendmentMetadataZ = z.object({
  type: z.literal(ApprovalType.INDEPENDENT_TOUR_BOOKING_AMENDMENT),
  originalBookingOID: EntityOIDZ,

  // Amended form values (typed to match Independent Tour amend form)
  amendedFormValues: z.object({
    rooms: z.array(z.object({
      roomNumber: z.number(),
      accommodationOID: z.string().optional(),
      roomTypeOID: z.string().optional(),
      checkInDate: z.string().optional(),
      checkOutDate: z.string().optional(),
      selectedRuleOID: z.string().optional(),
      passengers: z.array(z.object({
        oid: z.string().optional(),
        bookingPaxOID: z.string().optional(),
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
      adultSelections: z.array(z.object({ paxIndex: z.number() })),
      childWithBedSelections: z.array(z.object({ paxIndex: z.number() })),
      childNoBedSelections: z.array(z.object({ paxIndex: z.number() })),
      infantSelections: z.array(z.object({ paxIndex: z.number() })),
      bookingRoomOID: z.string().optional(),
      toBeRemoved: z.boolean().optional(),
    })),
    addOns: z.array(z.object({
      oid: z.string().optional(),
      independentTourOptionalServiceOID: z.string().optional(),
      independentTourBookingAddonOID: z.string().optional(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      tax: z.number().optional(),
      totalPrice: z.number(),
      type: IndependentTourBookingAddonTypeZ.optional(),
      passengerOIDs: z.array(z.string()).optional(),
      toBeRemoved: z.boolean().optional(),
    })).optional(),
    discounts: z.array(z.object({
      oid: z.string().optional(),
      independentTourBookingDiscountOID: z.string().optional(),
      type: BookingDiscountTypeZ,
      amount: z.number(),
      percentage: z.number().optional(),
      discountMode: z.nativeEnum(DiscountMode),
      name: z.string(),
      description: z.string().optional(),
      code: z.string().optional(),
      discountCodeOID: z.string().optional(),
      reason: z.string().optional(),
      approvalRequestOID: z.string().optional(),
      toBeRemoved: z.boolean().optional(),
    })).optional(),
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
    }).optional(),
    specialInstructions: z.string().optional(),
    overwriteTax: z.object({
      scheme: z.string(),
      rate: z.number(),
    }).optional(),
    totalAmount: z.number(),
  }),

  // Calculated breakdowns (reuse common schema)
  originalBookingBreakdown: BookingBreakdownZ,
  amendedBreakdown: BookingBreakdownZ,

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

  amendmentReason: z.string(),
  changedFields: z.array(z.string()),
  requestedBy: EntityOIDZ,
  requestedDate: z.string(),
});

export type ApprovalRequestIndependentTourBookingAmendmentMetadata =
  z.infer<typeof ApprovalRequestIndependentTourBookingAmendmentMetadataZ>;

export const CommonSubmitDraftMetadataZ = <T extends EnumLike>(statusEnum: T) => z.object({
  fromStatus: z.nativeEnum(statusEnum),
  toStatus: z.nativeEnum(statusEnum),
  requestedBy: EntityOIDZ,
  requestedAt: z.string(),
  businessJustification: z.string().optional(),
});

export const ApprovalRequestExchangeOrderDraftToWfaMetadataZ = CommonSubmitDraftMetadataZ(ExchangeOrderStatus)
  .extend({
    type: z.literal(ApprovalType.EXCHANGE_ORDER_DRAFT_TO_WFA),
    exchangeOrderOID: EntityOIDZ,
  });

export type ApprovalRequestExchangeOrderDraftToWfaMetadata =
  z.infer<typeof ApprovalRequestExchangeOrderDraftToWfaMetadataZ>;

export const ApprovalRequestMatchDocPaymentMadeDraftToSubmittedMetadataZ = CommonSubmitDraftMetadataZ(MatchDocStatus)
  .extend({
    type: z.literal(ApprovalType.MATCH_DOC_PAYMENT_MADE_DRAFT_TO_SUBMITTED),
    matchDocOID: EntityOIDZ,
  });

export type ApprovalRequestMatchDocPaymentMadeDraftToSubmittedMetadata =
  z.infer<typeof ApprovalRequestMatchDocPaymentMadeDraftToSubmittedMetadataZ>;

export const ApprovalRequestMatchDocPaymentReceivedDraftToSubmittedMetadataZ =
  CommonSubmitDraftMetadataZ(MatchDocStatus)
    .extend({
      type: z.literal(ApprovalType.MATCH_DOC_PAYMENT_RECEIVED_DRAFT_TO_SUBMITTED),
      matchDocOID: EntityOIDZ,
    });

export type ApprovalRequestMatchDocPaymentReceivedDraftToSubmittedMetadata =
  z.infer<typeof ApprovalRequestMatchDocPaymentReceivedDraftToSubmittedMetadataZ>;

export const ApprovalRequestBillDraftToSubmittedMetadataZ = CommonSubmitDraftMetadataZ(BillStatus)
  .extend({
    type: z.literal(ApprovalType.BILL_DRAFT_TO_SUBMITTED),
    billOID: EntityOIDZ,
  });

export type ApprovalRequestBillDraftToSubmittedMetadata =
  z.infer<typeof ApprovalRequestBillDraftToSubmittedMetadataZ>;

export const ApprovalRequestCustomerRefundMetadataZ = z.object({
  type: z.literal(ApprovalType.CUSTOMER_REFUND_REQUEST),
  amount: z.number(),
  paymentOrderOID: EntityOIDZ,
  bookingOID: EntityOIDZ,
  tenantOID: EntityOIDZ,
  currencyCode: z.string().optional(),
  notes: z.string().optional(),
});

export type ApprovalRequestCustomerRefundMetadata =
  z.infer<typeof ApprovalRequestCustomerRefundMetadataZ>;

export const ApprovalRequestCustomerCancellationFeeMetadataZ = z.object({
  type: z.literal(ApprovalType.CUSTOMER_CANCELLATION_FEE_REQUEST),
  amount: z.number(),
  paymentOrderOID: EntityOIDZ,
  bookingOID: EntityOIDZ,
  tenantOID: EntityOIDZ,
  currencyCode: z.string().optional(),
  notes: z.string().optional(),
});

export type ApprovalRequestCustomerCancellationFeeMetadata =
  z.infer<typeof ApprovalRequestCustomerCancellationFeeMetadataZ>;

export const ApprovalRequestBookingExtensionMetadataZ = z.object({
  type: z.literal(ApprovalType.BOOKING_EXTENSION),
  extensionRequestID: z.string(),
  remarks: z.string().optional(),
});

export type ApprovalRequestBookingExtensionMetadata =
  z.infer<typeof ApprovalRequestBookingExtensionMetadataZ>;

// Unified Booking Transfer (GTB↔ITB, ITB↔ITB, GTB↔GTB)
const BookingTransferTargetGTBZ = z.object({
  targetBookingType: z.literal("GTB"),
  targetTourDepartureOID: EntityOIDZ,
  passengers: z.array(z.object({
    oid: z.string().optional(),
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
    type: GroupTourBookingAddonTypeZ.optional(),
    groupTourPricingOID: EntityOIDZ.optional(),
    groupTourCostingEntryOID: EntityOIDZ.optional(),
    bookingAddonOID: EntityOIDZ.optional(),
    toBeRemoved: z.boolean().optional(),
  })).optional(),
  discounts: z.array(z.object({
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
    bookingDiscountOID: z.string().optional(),
    approvalRequestOID: z.string().optional(),
    toBeRemoved: z.boolean().optional(),
  })).optional(),
  specialInstructions: z.array(z.string()).optional(),
});

const BookingTransferTargetITBZ = z.object({
  targetBookingType: z.literal("ITB"),
  targetIndependentTourProductOID: EntityOIDZ,
  targetIndependentTourAccommodationOID: EntityOIDZ.optional(),
  rooms: z.array(z.object({
    roomNumber: z.number(),
    passengers: BookingPaxPersonalDetailsZ.extend({ oid: z.string().optional() }).array(),
    adultSelections: z.array(z.object({ paxIndex: z.number() })),
    childWithBedSelections: z.array(z.object({ paxIndex: z.number() })),
    childNoBedSelections: z.array(z.object({ paxIndex: z.number() })),
    infantSelections: z.array(z.object({ paxIndex: z.number() })),
    selectedRuleOID: z.string().optional(),
  })),
  addons: z.array(z.object({
    oid: z.string().optional(),
    independentTourOptionalServiceOID: z.string().optional(),
    independentTourBookingAddonOID: z.string().optional(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    tax: z.number().optional(),
    totalPrice: z.number(),
    type: IndependentTourBookingAddonTypeZ.optional(),
    passengerOIDs: z.array(z.string()).optional(),
    toBeRemoved: z.boolean().optional(),
  })).optional(),
  discounts: z.array(z.object({
    oid: z.string().optional(),
    independentTourBookingDiscountOID: z.string().optional(),
    type: BookingDiscountTypeZ,
    amount: z.number(),
    percentage: z.number().optional(),
    discountMode: z.nativeEnum(DiscountMode),
    name: z.string(),
    description: z.string().optional(),
    code: z.string().optional(),
    discountCodeOID: z.string().optional(),
    reason: z.string().optional(),
    approvalRequestOID: z.string().optional(),
    toBeRemoved: z.boolean().optional(),
  })).optional(),
  specialInstructions: z.array(z.string()).optional(),
});

export const ApprovalRequestBookingTransferMetadataZ = z.object({
  type: z.literal(ApprovalType.BOOKING_TRANSFER),
  sourceBookingType: z.enum(["GTB", "ITB"]),
  originalBookingOID: EntityOIDZ,
  transferItems: z.array(z.union([BookingTransferTargetGTBZ, BookingTransferTargetITBZ])),
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
  idempotencyKey: z.string(),
  // Created by workflow: list of destination booking OIDs for correlation
  createdBookingOIDs: z.array(z.string()).optional(),
});

export type ApprovalRequestBookingTransferMetadata =
  z.infer<typeof ApprovalRequestBookingTransferMetadataZ>;

// Union type for all metadata
export const ApprovalRequestMetadataZ = z.union([
  ApprovalRequestGroupTourBookingSpecialDiscountMetadataZ,
  ApprovalRequestIndependentTourBookingSpecialDiscountMetadataZ,
  ApprovalRequestBudgetApprovalMetadataZ,
  ApprovalRequestGroupTourBookingAmendmentMetadataZ,
  ApprovalRequestIndependentTourBookingAmendmentMetadataZ,
  ApprovalRequestExchangeOrderDraftToWfaMetadataZ,
  ApprovalRequestMatchDocPaymentMadeDraftToSubmittedMetadataZ,
  ApprovalRequestMatchDocPaymentReceivedDraftToSubmittedMetadataZ,
  ApprovalRequestBillDraftToSubmittedMetadataZ,
  ApprovalRequestCustomerRefundMetadataZ,
  ApprovalRequestCustomerCancellationFeeMetadataZ,
  ApprovalRequestBookingExtensionMetadataZ,
  ApprovalRequestBookingTransferMetadataZ,
]);

export type ApprovalRequestMetadata = z.infer<typeof ApprovalRequestMetadataZ>;
