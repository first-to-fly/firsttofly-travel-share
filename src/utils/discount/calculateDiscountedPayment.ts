import { DiscountMode } from "../../entities/Settings/Product/Discount";
import { calculateDiscountAmount } from "./calculateDiscountAmount";


export interface PaymentDiscount {
  amount: number;
  discountMode: DiscountMode;
  name: string;
}

export interface PaymentInput {
  baseAmount: number;
  discounts: PaymentDiscount[];
  taxRate?: number;
}

export interface PaymentResult {
  totalDiscount: number;
  subtotalBeforeTaxes: number;
  taxes: number;
  total: number;
}

/**
 * Calculate discounted payment including discount application and tax calculation
 *
 * @param input - The payment calculation input
 * @returns Complete payment with breakdown
 */
export function calculateDiscountedPayment(input: PaymentInput): PaymentResult {
  const { baseAmount, discounts, taxRate = 0.0 } = input;

  // IMPORTANT: Discount application order
  // 1. Apply all fixed discounts (FIXED_AMOUNT, FIXED_PRICE, FREE_GIFT) to base amount first
  // 2. Apply percentage discounts to the remaining amount after fixed discounts
  // This ensures percentage discounts are calculated on the correct base amount

  // Step 1: Apply all non-percentage discounts first using calculateDiscountAmount
  let totalFixedDiscountAmount = 0;
  const fixedDiscounts = discounts.filter(
    (d) => d.discountMode === DiscountMode.FIXED_AMOUNT ||
      d.discountMode === DiscountMode.FIXED_PRICE ||
      d.discountMode === DiscountMode.FREE_GIFT,
  );

  for (const discount of fixedDiscounts) {
    try {
      const result = calculateDiscountAmount({
        cost: baseAmount,
        discountValue: discount.amount,
        discountMode: discount.discountMode,
      });
      totalFixedDiscountAmount += result.appliedAmount;
    } catch (error) {
      console.error(`Error calculating fixed discount for ${discount.name}:`, error);
      // Fallback to using the stored amount for fixed discounts
      if (discount.discountMode === DiscountMode.FIXED_AMOUNT || discount.discountMode === DiscountMode.FREE_GIFT) {
        totalFixedDiscountAmount += discount.amount;
      }
    }
  }

  // Step 2: Calculate subtotal after fixed discounts
  const subtotalAfterFixedDiscounts = baseAmount - totalFixedDiscountAmount;

  // Step 3: Apply percentage discounts to the subtotal (percentage discounts applied last)
  let totalPercentageDiscountAmount = 0;
  const percentageDiscounts = discounts.filter((d) => d.discountMode === DiscountMode.PERCENTAGE);

  for (const discount of percentageDiscounts) {
    try {
      const result = calculateDiscountAmount({
        cost: subtotalAfterFixedDiscounts,
        discountValue: discount.amount, // This should be the percentage rate
        discountMode: DiscountMode.PERCENTAGE,
      });
      totalPercentageDiscountAmount += result.appliedAmount;
    } catch (error) {
      console.error(`Error calculating percentage discount for ${discount.name}:`, error);
      // Fallback to manual percentage calculation
      totalPercentageDiscountAmount += (subtotalAfterFixedDiscounts * discount.amount) / 100;
    }
  }

  // Step 4: Calculate final totals
  const totalDiscount = totalFixedDiscountAmount + totalPercentageDiscountAmount;
  const subtotalAfterAllDiscounts = subtotalAfterFixedDiscounts - totalPercentageDiscountAmount;
  const taxes = subtotalAfterAllDiscounts * taxRate;
  const finalTotal = subtotalAfterAllDiscounts + taxes;

  return {
    totalDiscount: totalDiscount,
    subtotalBeforeTaxes: subtotalAfterAllDiscounts,
    taxes: taxes,
    total: finalTotal,
  };
}
