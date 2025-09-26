import { DiscountMode } from "../../entities/Settings/Product/Discount";
import type { BookingPaxType } from "../../enums/BookingTypes";


const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const DECIMAL_PLACES = 2;
const MIN_NIGHTS = 1;
const DEFAULT_NIGHTS = 1;

export interface IndependentTourBookingPax {
  type: BookingPaxType;
}

export interface IndependentTourBookingAddon {
  totalPrice?: number | string | null;
}

export interface IndependentTourBookingDiscount {
  appliedAmount?: number | string | null;
  discountMode?: DiscountMode | `${DiscountMode}` | null;
  discountValue?: number | string | null;
}

export interface IndependentTourOverwriteTax {
  rate?: number | null;
}

export interface PeakPeriod {
  startDate: string | Date;
  endDate: string | Date;
  name?: string;
}

export interface AccommodationPricingInfo {
  name?: string;
  priceValue?: {
    currency?: string;
    tax?: number | null;
    paxPricing?: Partial<Record<BookingPaxType, number>>;
    peakSurchargeFixedAmount?: number | null;
    extraNightPrice?: number | null;
  } | null;
  peakPeriods?: PeakPeriod[] | null;
}

export interface PriceCalculationResult {
  accommodationCost: number;
  optionalServicesCost: number;
  miscellaneousCost: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
}

export interface PaxPriceDetails {
  paxType: BookingPaxType;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}

export interface AccommodationPriceBreakdown {
  paxPrices: PaxPriceDetails[];
  totalAccommodationCost: number;
  totalTax: number;
  nights: number;
  peakSurcharge: number;
}

export interface AppliedDiscount {
  discountId?: string;
  amount: number;
}

export interface DiscountApplicationResult {
  discountAmount: number;
  totalAfterDiscount: number;
  appliedDiscounts: AppliedDiscount[];
}

export interface IndependentTourBookingPriceInput {
  travelStartDate?: string | Date | null;
  travelEndDate?: string | Date | null;
  paxList: IndependentTourBookingPax[];
  addons?: IndependentTourBookingAddon[];
  discounts?: IndependentTourBookingDiscount[];
  accommodation?: AccommodationPricingInfo | null;
  overwriteTax?: IndependentTourOverwriteTax | null;
}

function toFiniteNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined) {
    return 0;
  }

  const parsed = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeDiscountMode(mode: IndependentTourBookingDiscount["discountMode"]): DiscountMode | null {
  if (!mode) {
    return null;
  }

  if (typeof mode === "string") {
    const entries = Object.values(DiscountMode) as string[];
    if (entries.includes(mode)) {
      return mode as DiscountMode;
    }
    return null;
  }

  return mode;
}

function calculateDiscountTotals(
  baseAmount: number,
  discounts: IndependentTourBookingDiscount[],
): { totalDiscount: number } {
  if (discounts.length === 0) {
    return { totalDiscount: 0 };
  }

  let remainingAmount = baseAmount;
  let totalDiscount = 0;

  const safeSubtract = (current: number, deduction: number): number => {
    const result = current - deduction;
    return result < 0 ? 0 : result;
  };

  const round = (value: number): number => roundToDecimalPlaces(value);

  const fixedDiscounts = discounts.filter((discount) => {
    const mode = normalizeDiscountMode(discount.discountMode);
    return mode === DiscountMode.FIXED_AMOUNT ||
      mode === DiscountMode.FIXED_PRICE ||
      mode === DiscountMode.FREE_GIFT;
  });

  const percentageDiscounts = discounts
    .filter((discount) => normalizeDiscountMode(discount.discountMode) === DiscountMode.PERCENTAGE);
  const unspecifiedDiscounts = discounts.filter((discount) => !normalizeDiscountMode(discount.discountMode));

  const applyDiscountAmount = (amount: number) => {
    const bounded = Math.min(round(amount), remainingAmount);
    totalDiscount += bounded;
    remainingAmount = safeSubtract(remainingAmount, bounded);
  };

  for (const discount of fixedDiscounts) {
    const mode = normalizeDiscountMode(discount.discountMode);
    const value = toFiniteNumber(discount.discountValue ?? discount.appliedAmount);

    if (mode === DiscountMode.FREE_GIFT) {
      continue;
    }

    if (mode === DiscountMode.FIXED_PRICE) {
      if (value <= 0) {
        continue;
      }
      const amount = Math.max(0, remainingAmount - value);
      applyDiscountAmount(amount);
      continue;
    }

    applyDiscountAmount(value);
  }

  for (const discount of percentageDiscounts) {
    const value = toFiniteNumber(discount.discountValue ?? discount.appliedAmount);
    if (value <= 0 || remainingAmount <= 0) {
      continue;
    }

    if (value > 100) {
      applyDiscountAmount(value);
      continue;
    }

    const amount = remainingAmount * (value / 100);
    applyDiscountAmount(amount);
  }

  for (const discount of unspecifiedDiscounts) {
    const amount = toFiniteNumber(discount.appliedAmount);
    if (amount <= 0) {
      continue;
    }
    applyDiscountAmount(amount);
  }

  return {
    totalDiscount: round(totalDiscount),
  };
}

function roundToDecimalPlaces(value: number, decimalPlaces: number = DECIMAL_PLACES): number {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(value * multiplier) / multiplier;
}

function normalizeDate(date: string | Date): Date {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
}

function calculateNights(startDate?: string | Date | null, endDate?: string | Date | null): number {
  if (!startDate || !endDate) {
    return DEFAULT_NIGHTS;
  }

  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / MILLISECONDS_PER_DAY);

  return Math.max(MIN_NIGHTS, diffDays);
}

function groupPaxByType(paxList: IndependentTourBookingPax[]): Map<BookingPaxType, number> {
  const paxByType = new Map<BookingPaxType, number>();

  for (const pax of paxList) {
    const currentCount = paxByType.get(pax.type) || 0;
    paxByType.set(pax.type, currentCount + 1);
  }

  return paxByType;
}

function getPaxPrice(
  paxPricing: Partial<Record<BookingPaxType, number>> | undefined,
  paxType: BookingPaxType,
): number {
  if (!paxPricing) {
    return 0;
  }

  return paxPricing[paxType] ?? 0;
}

function calculatePeakNights(
  travelStartDate: string | Date,
  travelEndDate: string | Date,
  peakPeriods: PeakPeriod[],
): number {
  if (peakPeriods.length === 0) {
    return 0;
  }

  const travelStart = normalizeDate(travelStartDate);
  const travelEnd = normalizeDate(travelEndDate);

  let totalPeakNights = 0;

  for (const period of peakPeriods) {
    const periodStart = normalizeDate(period.startDate);
    const periodEnd = normalizeDate(period.endDate);

    const overlapStart = new Date(Math.max(travelStart.getTime(), periodStart.getTime()));
    const overlapEnd = new Date(Math.min(travelEnd.getTime(), periodEnd.getTime()));

    if (overlapStart <= overlapEnd) {
      const overlapNights = Math.ceil(
        (overlapEnd.getTime() - overlapStart.getTime()) / MILLISECONDS_PER_DAY,
      );
      totalPeakNights += Math.max(0, overlapNights);
    }
  }

  const totalNights = calculateNights(travelStartDate, travelEndDate);
  return Math.min(totalPeakNights, totalNights);
}

function calculatePaxTypePrice(
  quantity: number,
  basePricePerNight: number,
  regularNights: number,
  peakNights: number,
  peakSurchargeFixedAmount?: number | null,
): { unitPrice: number; subTotal: number; peakSurcharge: number } {
  const regularNightsCost = basePricePerNight * regularNights;
  let peakNightsCost = 0;
  let peakSurcharge = 0;

  if (peakNights > 0 && peakSurchargeFixedAmount) {
    peakNightsCost = (basePricePerNight + peakSurchargeFixedAmount) * peakNights;
    peakSurcharge = peakSurchargeFixedAmount * peakNights * quantity;
  } else if (peakNights > 0) {
    peakNightsCost = basePricePerNight * peakNights;
  }

  const unitPrice = regularNightsCost + peakNightsCost;
  const subTotal = unitPrice * quantity;

  return {
    unitPrice: unitPrice,
    subTotal: subTotal,
    peakSurcharge: peakSurcharge,
  };
}

export function calculateAccommodationPrice(
  accommodation: AccommodationPricingInfo,
  paxList: IndependentTourBookingPax[],
  travelStartDate: string | Date,
  travelEndDate: string | Date,
): AccommodationPriceBreakdown {
  const totalNights = calculateNights(travelStartDate, travelEndDate);
  const peakNights = calculatePeakNights(
    travelStartDate,
    travelEndDate,
    accommodation.peakPeriods || [],
  );
  const regularNights = totalNights - peakNights;

  const paxByType = groupPaxByType(paxList);
  const paxPrices: PaxPriceDetails[] = [];
  let totalAccommodationCost = 0;
  let totalPeakSurcharge = 0;

  paxByType.forEach((quantity, paxType) => {
    const basePricePerNight = getPaxPrice(accommodation.priceValue?.paxPricing, paxType);
    const { unitPrice, subTotal, peakSurcharge } = calculatePaxTypePrice(
      quantity,
      basePricePerNight,
      regularNights,
      peakNights,
      accommodation.priceValue?.peakSurchargeFixedAmount ?? null,
    );

    paxPrices.push({
      paxType: paxType,
      quantity: quantity,
      unitPrice: unitPrice,
      subTotal: subTotal,
    });

    totalAccommodationCost += subTotal;
    totalPeakSurcharge += peakSurcharge;
  });

  const taxRate = accommodation.priceValue?.tax ?? 0;
  const totalTax = taxRate ? totalAccommodationCost * (toFiniteNumber(taxRate) / 100) : 0;

  return {
    paxPrices: paxPrices,
    totalAccommodationCost: totalAccommodationCost,
    totalTax: totalTax,
    nights: totalNights,
    peakSurcharge: totalPeakSurcharge,
  };
}

export function calculateDiscountAmount(
  subtotal: number,
  discount: { discountValue?: number; discountMode?: "percentage" | "amount" } & Partial<AppliedDiscount>,
): number {
  const discountValue = toFiniteNumber(discount.discountValue ?? null);

  if (discountValue <= 0) {
    return 0;
  }

  let discountAmount = 0;

  if (discount.discountMode === "percentage") {
    discountAmount = (subtotal * discountValue) / 100;
  } else {
    discountAmount = Math.min(discountValue, subtotal);
  }

  return roundToDecimalPlaces(discountAmount);
}

export function applyDiscounts(
  subtotal: number,
  discounts: Array<{ id?: string } & {
    discountValue?: number;
    discountMode?: "percentage" | "amount";
  }>,
): DiscountApplicationResult {
  let remainingAmount = subtotal;
  const appliedDiscounts: AppliedDiscount[] = [];
  let totalDiscountAmount = 0;

  const sortedDiscounts = [...discounts].sort((a, b) => {
    const aValue = toFiniteNumber(a.discountValue ?? null);
    const bValue = toFiniteNumber(b.discountValue ?? null);
    return bValue - aValue;
  });

  for (const discount of sortedDiscounts) {
    const discountAmount = calculateDiscountAmount(remainingAmount, discount);

    if (discountAmount > 0) {
      appliedDiscounts.push({
        discountId: discount.id,
        amount: discountAmount,
      });

      totalDiscountAmount += discountAmount;
      remainingAmount -= discountAmount;
    }
  }

  return {
    discountAmount: totalDiscountAmount,
    totalAfterDiscount: subtotal - totalDiscountAmount,
    appliedDiscounts: appliedDiscounts,
  };
}

export function calculateTax(
  subtotal: number,
  taxPercentage: number,
  discountAmount: number = 0,
): number {
  if (taxPercentage <= 0) {
    return 0;
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxableAmount * (taxPercentage / 100);

  return roundToDecimalPlaces(taxAmount);
}

export function calculateIndependentTourBookingPrice(
  input: IndependentTourBookingPriceInput,
): PriceCalculationResult {
  const {
    accommodation,
    paxList,
    travelStartDate,
    travelEndDate,
    addons = [],
    discounts = [],
    overwriteTax,
  } = input;

  let accommodationCost = 0;
  let accommodationTax = 0;

  if (accommodation && paxList.length > 0 && travelStartDate && travelEndDate) {
    const accommodationBreakdown = calculateAccommodationPrice(
      accommodation,
      paxList,
      travelStartDate,
      travelEndDate,
    );
    accommodationCost = accommodationBreakdown.totalAccommodationCost;
    accommodationTax = accommodationBreakdown.totalTax;
  }

  const optionalServicesCost = addons.reduce(
    (total, addon) => total + toFiniteNumber(addon.totalPrice),
    0,
  );

  const miscellaneousCost = 0;

  const discountTotals = calculateDiscountTotals(
    accommodationCost + optionalServicesCost + miscellaneousCost,
    discounts,
  );
  const discountAmount = discountTotals.totalDiscount;

  const subtotal = accommodationCost + optionalServicesCost + miscellaneousCost;
  const taxRate = overwriteTax?.rate ? toFiniteNumber(overwriteTax.rate) : 0;
  const additionalTax = (subtotal - discountAmount) * (taxRate / 100);
  const taxAmount = accommodationTax + additionalTax;
  const totalAmount = subtotal + taxAmount - discountAmount;

  return {
    accommodationCost: accommodationCost,
    optionalServicesCost: optionalServicesCost,
    miscellaneousCost: miscellaneousCost,
    discountAmount: discountAmount,
    taxAmount: roundToDecimalPlaces(taxAmount),
    totalAmount: roundToDecimalPlaces(totalAmount),
  };
}
