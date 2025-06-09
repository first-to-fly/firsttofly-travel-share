import type { CurrencyConversion } from "./types";


export interface PriceValue {
  amount: number;
  tax: number;
  currency: string;
}


export interface ConvertedPrice {
  amount: number;
  tax: number;
}


/**
 * Convert price to home currency using supported currency rates
 */
export function convertPriceToHomeCurrency(
  priceValue: PriceValue,
  homeCurrency: string,
  supportedCurrencies: CurrencyConversion[],
): ConvertedPrice | null {
  // If already in home currency, return as-is with rate 1
  if (priceValue.currency === homeCurrency) {
    return {
      amount: priceValue.amount,
      tax: priceValue.tax,
    };
  }

  // Find the currency conversion rate
  const supportCurrency = supportedCurrencies.find(
    (currencyItem) => currencyItem.currency === priceValue.currency,
  );

  if (!supportCurrency) {
    return null; // Currency not supported
  }

  // Convert to home currency
  return {
    amount: priceValue.amount * supportCurrency.rate,
    tax: priceValue.tax * supportCurrency.rate,
  };
}
