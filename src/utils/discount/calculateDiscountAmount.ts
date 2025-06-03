import { DiscountMode } from "../../entities/Settings/Product/Discount";


export interface DiscountCalculationInput {
  cost: number;
  discountValue: number;
  discountMode: DiscountMode;
}

export interface DiscountCalculationResult {
  appliedAmount: number;
  giftDescription?: string;
}

/**
 * Calculate discount amount based on discount mode and cost
 *
 * @param input - The calculation input containing cost, discount value, and mode
 * @returns The calculated discount result
 */
export function calculateDiscountAmount(input: DiscountCalculationInput): DiscountCalculationResult {
  const { cost, discountValue, discountMode } = input;

  switch (discountMode) {

    case DiscountMode.PERCENTAGE:
      // Mode 0: discount = cost × (value / 100)
      return {
        appliedAmount: Math.round((cost * (discountValue / 100)) * 100) / 100, // Round to 2 decimal places
      };

    case DiscountMode.FIXED_AMOUNT:
      // Mode 1: discount = value
      return {
        appliedAmount: discountValue,
      };

    case DiscountMode.FIXED_PRICE:
      // Mode 3: discount = cost – value (setting new price "value")
      return {
        appliedAmount: Math.max(0, cost - discountValue), // Ensure non-negative
      };

    case DiscountMode.FREE_GIFT:
      // Mode 2: no money-off; discount = 0
      return {
        appliedAmount: 0,
        giftDescription: `Gift: ${discountValue}`, // Convert value to gift description
      };

    default:
      throw new Error(`Unsupported discount mode: ${discountMode}`);

  }
}

/**
 * Simple version that only returns the calculated amount
 */
export function calculateDiscountAmountSimple(cost: number, discountValue: number, discountMode: DiscountMode): number {
  return calculateDiscountAmount({
    cost: cost,
    discountValue: discountValue,
    discountMode: discountMode,
  }).appliedAmount;
}
