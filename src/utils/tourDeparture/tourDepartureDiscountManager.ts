import { EntityType } from "../../entities/entityType";
import { GroupTourPricingDiscount } from "../../entities/Products/GroupTourPricing";
import { GroupTourBookingDiscountType, TourDepartureDiscountMetadata } from "../../entities/Sales/GroupTourBookingDiscount";
import { GroupTourBookingPaxType } from "../../entities/Sales/GroupTourBookingPax";
import { DiscountMode } from "../../entities/Settings/Product/Discount";
import {
  isPaxTypeAdult,
  type PaxDiscountInput,
  type TourDepartureDiscountResult,
} from "../group-tour-booking/calculateTourDepartureDiscount";


export interface TourDepartureDiscountInput {
  discountConfig: GroupTourPricingDiscount;
  groupIndex: number;
  currentTransactionPax: PaxDiscountInput[];
  basePaxCount: number;
  tourDepartureOID: string;
  transactionOID: string;
}

export interface TourDepartureDiscountApplicationResult {
  shouldApplyDiscount: boolean;
  discountResult: TourDepartureDiscountResult;
  metadata?: TourDepartureDiscountMetadata;
  description: string;
  appliedAmount: number;
  discountMode: DiscountMode;
}

/**
 * Determines if discount should be applied and prepares application data
 */
export function prepareDiscountApplication(
  discountResult: TourDepartureDiscountResult,
  groupIndex: number = 0,
): TourDepartureDiscountApplicationResult {
  const shouldApplyDiscount = discountResult.totalDiscount > 0;

  if (!shouldApplyDiscount) {
    return {
      shouldApplyDiscount: false,
      discountResult: discountResult,
      description: "No discount applicable",
      appliedAmount: 0,
      discountMode: DiscountMode.FIXED_AMOUNT,
    };
  }

  const metadata: TourDepartureDiscountMetadata = {
    type: GroupTourBookingDiscountType.TOUR_DEPARTURE_DISCOUNT,
    groupIndex: groupIndex,
    discountBreakdown: discountResult,
  };

  return {
    shouldApplyDiscount: true,
    discountResult: discountResult,
    metadata: metadata,
    description: discountResult.groupName ?? "Tour departure discount",
    appliedAmount: discountResult.totalDiscount,
    discountMode: DiscountMode.FIXED_AMOUNT,
  };
}

/**
 * Creates discount input from tour departure and transaction data
 * Note: OIDs will be set to placeholder values and should be overridden by the caller
 */
export function createDiscountInput(
  discountConfig: GroupTourPricingDiscount,
  groupIndex: number,
  currentTransactionPax: PaxDiscountInput[],
  basePaxCount: number,
  tourDepartureId: string,
  transactionId: string,
): TourDepartureDiscountInput {
  return {
    discountConfig: discountConfig || {
      tierConfigs: [],
      groups: [],
    },
    groupIndex: groupIndex,
    currentTransactionPax: currentTransactionPax,
    basePaxCount: basePaxCount,
    tourDepartureOID: `${EntityType.TOUR_DEPARTURE}:${tourDepartureId}`,
    transactionOID: `${EntityType.GROUP_TOUR_BOOKING}:${transactionId}`,
  };
}

/**
 * Converts pax data to discount input format
 * Note: OIDs will be set to placeholder values and should be overridden by the caller if needed
 */
export function convertPaxToDiscountInput(paxData: Array<{
  paxId: string;
  type: GroupTourBookingPaxType;
}>): PaxDiscountInput[] {
  return paxData.map((pax) => ({
    paxOID: `${EntityType.GROUP_TOUR_BOOKING_PAX}:${pax.paxId}`,
    paxType: pax.type,
    isAdult: isPaxTypeAdult(pax.type),
  }));
}

/**
 * Determines the action needed based on current state and calculation result
 */
export function determineDiscountAction(
  discountResult: TourDepartureDiscountResult,
  existingDiscount?: { bookingDiscountId: string; appliedAmount: number },
): "apply" | "update" | "remove" | "none" {
  const hasExistingDiscount = !!existingDiscount;
  const shouldHaveDiscount = discountResult.totalDiscount > 0;

  if (!hasExistingDiscount && shouldHaveDiscount) {
    return "apply";
  }

  if (hasExistingDiscount && !shouldHaveDiscount) {
    return "remove";
  }

  if (hasExistingDiscount && shouldHaveDiscount) {
    // Check if amount changed
    const currentAmount = existingDiscount.appliedAmount ?? 0;
    if (Math.abs(currentAmount - discountResult.totalDiscount) > 0.001) {
      return "update";
    }
  }

  return "none";
}

/**
 * Creates update data for existing discount
 */
export function createDiscountUpdateData(
  discountResult: TourDepartureDiscountResult,
  existingDiscountId: string,
  userId: string,
  groupIndex: number = 0,
) {
  const metadata: TourDepartureDiscountMetadata = {
    type: GroupTourBookingDiscountType.TOUR_DEPARTURE_DISCOUNT,
    groupIndex: groupIndex,
    discountBreakdown: discountResult,
  };

  return {
    bookingDiscountId: existingDiscountId,
    description: discountResult.groupName ?? "Tour departure discount",
    appliedAmount: discountResult.totalDiscount,
    metadata: metadata,
    updatedBy: userId,
  };
}
