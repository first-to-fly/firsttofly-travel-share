import { z } from "zod";

import { GroupTourPricingDiscount } from "../../entities/Products/GroupTourPricing";
import { BookingPaxType, BookingPaxTypeZ } from "../../enums/BookingTypes";


/**
 * Determines if a pax type represents an adult passenger
 */
export function isPaxTypeAdult(paxType: BookingPaxType): boolean {
  const childTypes = [
    BookingPaxType.CHILD_TWIN,
    BookingPaxType.CHILD_WITH_BED,
    BookingPaxType.CHILD_NO_BED,
    BookingPaxType.INFANT,
  ];
  return !childTypes.includes(paxType);
}

// Types for tour departure discount calculation
export interface PaxDiscountInput {
  paxOID: string;
  paxType: BookingPaxType;
  isAdult: boolean;
}

export const PaxDiscountBreakdownZ = z.object({
  paxOID: z.string(),
  paxType: BookingPaxTypeZ,
  isAdult: z.boolean(),
  positionInSequence: z.number(),
  tierIndex: z.number(),
  tierRange: z.object({
    from: z.number(),
    to: z.number(),
  }),
  discountAmount: z.number(),
});

export type PaxDiscountBreakdown = z.infer<typeof PaxDiscountBreakdownZ>;

export const TourDepartureDiscountResultZ = z.object({
  totalDiscount: z.number(),
  groupIndex: z.number(),
  groupName: z.string(),
  paxBreakdown: z.array(PaxDiscountBreakdownZ),
  tourDepartureOID: z.string(),
  bookingOID: z.string(),
  basePaxCount: z.number(),
  calculatedAt: z.string(),
});

export type TourDepartureDiscountResult = z.infer<typeof TourDepartureDiscountResultZ>;


/**
 * Calculates tour departure discount for a group tour booking based on group tier configuration
 * This is a stateless function that can be used on both client and server
 */
export function calculateTourDepartureDiscount(data: {
  discountConfig: GroupTourPricingDiscount;
  groupIndex: number;
  currentBookingPax: PaxDiscountInput[];
  basePaxCount: number; // total pax count excluding current booking
  tourDepartureOID: string;
  bookingOID: string;
}): TourDepartureDiscountResult {
  const {
    discountConfig,
    groupIndex,
    currentBookingPax,
    basePaxCount,
    tourDepartureOID,
    bookingOID,
  } = data;

  // 1. Validate group index
  if (groupIndex < 0 || groupIndex >= discountConfig.groups.length) {
    // Invalid group index - return empty result
    return {
      totalDiscount: 0,
      groupIndex: groupIndex,
      groupName: "",
      paxBreakdown: [],
      tourDepartureOID: tourDepartureOID,
      bookingOID: bookingOID,
      basePaxCount: basePaxCount,
      calculatedAt: new Date().toISOString(),
    };
  }

  const discountGroup = discountConfig.groups[groupIndex];

  // 2. Handle empty pax list
  if (currentBookingPax.length === 0) {
    // No pax in current booking - return empty result
    return {
      totalDiscount: 0,
      groupIndex: groupIndex,
      groupName: discountGroup.name,
      paxBreakdown: [],
      tourDepartureOID: tourDepartureOID,
      bookingOID: bookingOID,
      basePaxCount: basePaxCount,
      calculatedAt: new Date().toISOString(),
    };
  }

  // 3. Calculate discount for each individual pax and build detailed breakdown
  let totalDiscount = 0;
  const paxBreakdown: PaxDiscountBreakdown[] = [];

  for (let i = 0; i < currentBookingPax.length; i++) {
    const pax = currentBookingPax[i];

    // Each pax's position in the overall booking sequence (1-based for tier comparison)
    const paxPositionInSequence = basePaxCount + i + 1;

    // 4. Determine which tier this specific pax falls into
    let tierIndex = -1;
    let tierRange: { from: number; to: number } | null = null;

    for (let j = 0; j < discountConfig.tierConfigs.length; j++) {
      const tier = discountConfig.tierConfigs[j];
      if (paxPositionInSequence >= tier.from && paxPositionInSequence <= tier.to) {
        tierIndex = j;
        tierRange = {
          from: tier.from,
          to: tier.to,
        };
        break;
      }
    }

    // Initialize pax breakdown entry
    const paxBreakdownEntry: PaxDiscountBreakdown = {
      paxOID: pax.paxOID,
      paxType: pax.paxType,
      isAdult: pax.isAdult,
      positionInSequence: paxPositionInSequence,
      tierIndex: tierIndex,
      tierRange: tierRange || {
        from: 0,
        to: 0,
      },
      discountAmount: 0,
    };

    if (tierIndex !== -1) {
      // 5. Get the discount data for this tier in this group
      const tierIndexStr = tierIndex.toString();
      if (discountGroup.tierData[tierIndexStr]) {
        const tierDiscount = discountGroup.tierData[tierIndexStr];

        // 6. Apply the appropriate discount based on pax type (adult vs child)
        const discountAmount = pax.isAdult ? tierDiscount.adult : tierDiscount.child;

        paxBreakdownEntry.discountAmount = discountAmount;
        totalDiscount += discountAmount;
      }
    }

    paxBreakdown.push(paxBreakdownEntry);
  }

  return {
    totalDiscount: totalDiscount,
    groupIndex: groupIndex,
    groupName: discountGroup.name,
    paxBreakdown: paxBreakdown,
    tourDepartureOID: tourDepartureOID,
    bookingOID: bookingOID,
    basePaxCount: basePaxCount,
    calculatedAt: new Date().toISOString(),
  };
}
