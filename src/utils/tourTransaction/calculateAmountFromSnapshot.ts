import type {
  TourTransactionAppliedAddonSnapshot,
  TourTransactionAppliedDiscountSnapshot,
  TourTransactionCostingSnapshot,
  TourTransactionPricingSnapshot,
  TourTransactionSnapshotData,
  TourTransactionTenantCurrencySnapshot,
} from "@firsttofly/content-delivery-share/src/types/FirstToFly/TourTransaction";

import { TourTransactionAddonType } from "../../entities/Sales/TourTransactionAddon";
import { TourTransactionDiscountType } from "../../entities/Sales/TourTransactionDiscount";
import { TourTransactionPaxType } from "../../entities/Sales/TourTransactionPax";
import { DiscountMode } from "../../entities/Settings/Product/Discount";
import { calculateDiscountedPayment, type PaymentDiscount } from "../discount/calculateDiscountedPayment";
import type { LineItemPrice, PaxConfiguration } from "../pricing/types";
import { startingPriceGivenRoomPaxConfigurations } from "../tourDeparture/startingPriceGivenRoomPaxConfigurations";


const EMPTY_PRICE_BREAKDOWN: PriceBreakdown = { // TODO: move to shared types
  total: 0,
  subtotal: 0,
  tourFare: [],
  miscellaneous: [],
  taxes: [],
  addons: [],
  discounts: [],
};


export interface PriceBreakdown {
  total: number;
  subtotal: number; // Total before discounts
  tourFare: (LineItemPrice & {
    paxType: TourTransactionPaxType;
  })[];
  miscellaneous: (LineItemPrice & {
    costingEntryOID: string;
    name: string;
  })[];
  taxes: (LineItemPrice & {
    name: string;
  })[];
  addons: (LineItemPrice & {
    oid: string;
    type: TourTransactionAddonType;
    name: string;
  })[];
  discounts: {
    discountOID: string;
    discountType: TourTransactionDiscountType;
    description?: string;
    appliedDiscountCode?: string;
    appliedAmount: number;
    discountMode: DiscountMode;
  }[];
}


/**
 * Calculate base pricing breakdown from snapshot data using the shared utility
 */
function calculateBasePricingFromSnapshot(
  pricing: TourTransactionPricingSnapshot,
  costing: TourTransactionCostingSnapshot,
  currencySnapshot: TourTransactionTenantCurrencySnapshot,
  paxConfigurations: PaxConfiguration[],
): {
    tourFare: PriceBreakdown["tourFare"];
    miscellaneous: PriceBreakdown["miscellaneous"];
    taxes: PriceBreakdown["taxes"];
    total: number;
  } {
  const { homeCurrency, supportedCurrencies } = currencySnapshot;

  // Use the shared utility function that's already tested and consistent
  // The snapshot interfaces are compatible with the live interfaces
  const breakdown = startingPriceGivenRoomPaxConfigurations({
    pricing: pricing,
    homeCurrency: homeCurrency,
    supportCurrencies: supportedCurrencies,
    costingEntries: costing.groupTourCostingEntries,
    paxConfigurations: paxConfigurations,
  });

  // Convert the result format to match our expected interface
  return {
    tourFare: breakdown.tourFare,
    miscellaneous: breakdown.miscellaneous.map((item) => ({
      ...item,
      name: costing.groupTourCostingEntries
        .find(
          (entry) => entry.oid === item.costingEntryOID,
        )?.name ||
        item.costingEntryOID,
    })),
    taxes: breakdown.taxes,
    total: breakdown.total,
  };
}


/**
 * Calculate add-ons breakdown from snapshot data
 */
function calculateAddonsFromSnapshot(
  addonsSnapshot: TourTransactionAppliedAddonSnapshot[],
  homeCurrency: string,
): { addons: PriceBreakdown["addons"]; total: number } {
  const addons: PriceBreakdown["addons"] = [];
  let total = 0;

  addonsSnapshot.forEach((addon) => {
    addons.push({
      quantity: addon.quantity,
      currency: homeCurrency,
      unitPrice: addon.unitPrice,
      subTotal: addon.totalPrice,
      oid: addon.oid,
      type: addon.type,
      name: addon.name,
    });
    total += addon.totalPrice;
  });

  return {
    addons: addons,
    total: total,
  };
}


/**
 * Calculate discounts breakdown from snapshot data using discount calculation utilities
 */
function calculateDiscountsFromSnapshot(
  discountsSnapshot: TourTransactionAppliedDiscountSnapshot[],
  subtotalBeforeDiscounts: number,
): { discounts: PriceBreakdown["discounts"]; total: number; calculatedTotal: number } {
  const discounts: PriceBreakdown["discounts"] = [];

  if (discountsSnapshot.length === 0) {
    return {
      discounts: [],
      total: 0,
      calculatedTotal: subtotalBeforeDiscounts,
    };
  }

  // Convert snapshot discounts to PaymentDiscount format using the applied amounts as fixed amounts
  // Since snapshot contains final applied amounts, we treat them as fixed discount amounts
  const paymentDiscounts: PaymentDiscount[] = discountsSnapshot.map((discount) => ({
    amount: discount.appliedAmount,
    discountMode: discount.discountMode,
    name: discount.description || `Discount ${discount.oid}`,
  }));

  // Use calculateDiscountedPayment to ensure proper discount application order and calculation
  const paymentResult = calculateDiscountedPayment({
    baseAmount: subtotalBeforeDiscounts,
    discounts: paymentDiscounts,
    taxRate: 0.1, // TODO: GST
  });

  // Map the snapshot data to our discount format
  discountsSnapshot.forEach((discount) => {
    discounts.push({
      discountOID: discount.oid,
      discountType: discount.discountType,
      description: discount.description,
      appliedDiscountCode: discount.appliedDiscountCode,
      appliedAmount: discount.appliedAmount,
      discountMode: discount.discountMode, // Keep the original discount mode from snapshot
    });
  });

  return {
    discounts: discounts,
    total: paymentResult.totalDiscount,
    calculatedTotal: paymentResult.total,
  };
}


/**
 * Calculate complete price breakdown from snapshot data
 *
 * This function reconstructs the complete pricing structure including:
 * - Tour fare breakdown by passenger type
 * - Miscellaneous costs from costing entries
 * - Airport taxes
 * - Add-ons with details
 * - Discounts with details
 * - Subtotal (before discounts) and final total
 */
export function calculatePriceBreakdownFromSnapshot(
  snapshot: TourTransactionSnapshotData,
): {
    success: boolean;
    breakdown: PriceBreakdown;
    message: string;
  } {
  try {
    if (!snapshot.productPricingSnapshot) {
      return {
        success: false,
        breakdown: EMPTY_PRICE_BREAKDOWN,
        message: "Pricing snapshot not found.",
      };
    }
    if (!snapshot.productCostingSnapshot) {
      return {
        success: false,
        breakdown: EMPTY_PRICE_BREAKDOWN,
        message: "Costing snapshot not found.",
      };
    }
    if (!snapshot.bookedRoomsSnapshot || snapshot.bookedRoomsSnapshot.length === 0) {
      return {
        success: false,
        breakdown: EMPTY_PRICE_BREAKDOWN,
        message: "Room snapshot not found or empty.",
      };
    }

    // Extract pax configurations from room snapshots
    const paxConfigurations: PaxConfiguration[] =
      snapshot.bookedRoomsSnapshot.flatMap((room) => room.paxes.map((pax) => ({
        type: pax.type,
        fareType: pax.isLandTourOnly ? "land" as const : "full" as const,
      })));

    if (paxConfigurations.length === 0) {
      return {
        success: false,
        breakdown: EMPTY_PRICE_BREAKDOWN,
        message: "No passengers found in snapshot.",
      };
    }

    const { homeCurrency } = snapshot.tenantCurrencySnapshot;

    // Calculate base pricing (tour fare, miscellaneous, taxes) using shared utility
    const basePricingResult = calculateBasePricingFromSnapshot(
      snapshot.productPricingSnapshot,
      snapshot.productCostingSnapshot,
      snapshot.tenantCurrencySnapshot,
      paxConfigurations,
    );

    const addonsResult = calculateAddonsFromSnapshot(
      snapshot.appliedAddonsSnapshot,
      homeCurrency,
    );

    // Calculate subtotal (before discounts)
    const subtotal = basePricingResult.total + addonsResult.total;

    const discountsResult = calculateDiscountsFromSnapshot(
      snapshot.appliedDiscountsSnapshot,
      subtotal,
    );

    // Use the calculated total from the discount utilities
    const total = discountsResult.calculatedTotal;

    const breakdown: PriceBreakdown = {
      total: Math.max(0, total), // Ensure non-negative
      subtotal: subtotal,
      tourFare: basePricingResult.tourFare,
      miscellaneous: basePricingResult.miscellaneous,
      taxes: basePricingResult.taxes,
      addons: addonsResult.addons,
      discounts: discountsResult.discounts,
    };

    return {
      success: true,
      breakdown: breakdown,
      message: "Complete price breakdown calculated successfully from snapshot.",
    };
  } catch (error) {
    return {
      success: false,
      breakdown: EMPTY_PRICE_BREAKDOWN,
      message: `Failed to calculate price breakdown: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}


/**
 * Calculate total amount from snapshot including all components
 *
 * This is a convenience function that returns just the final amount
 * when you don't need the detailed breakdown.
 *
 * @example
 * ```typescript
 * const result = calculateTotalAmountFromSnapshot(snapshot);
 * if (result.success) {
 *   console.log(`Total: ${result.amount}`);
 *   console.log(`Detailed breakdown available in: result.breakdown`);
 * }
 * ```
 */
export function calculateTotalAmountFromSnapshot(
  snapshot: TourTransactionSnapshotData,
): {
    success: boolean;
    amount: number;
    breakdown: PriceBreakdown;
    message: string;
  } {
  const result = calculatePriceBreakdownFromSnapshot(snapshot);

  return {
    success: result.success,
    amount: result.breakdown.total,
    breakdown: result.breakdown,
    message: result.message,
  };
}
