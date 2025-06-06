import { TourTransactionPaxType } from "../../entities/Sales/TourTransactionPax";
import type { LineItemPrice, PaxConfiguration } from "./types";


export interface AirportTaxStructure {
  adult: number;
  child: number;
}


/**
 * Calculate airport taxes based on passenger configurations
 */
export function calculateAirportTax(
  paxConfigurations: PaxConfiguration[],
  airportTax: AirportTaxStructure,
  homeCurrency: string,
): { taxes: (LineItemPrice & { name: string })[], total: number } {
  const taxes: (LineItemPrice & { name: string })[] = [];
  let total = 0;

  // Count adults and children
  const adultCount = paxConfigurations
    .filter((config) => [
      TourTransactionPaxType.TWIN,
      TourTransactionPaxType.SINGLE,
      TourTransactionPaxType.TRIPLE,
      TourTransactionPaxType.QUAD,
    ].includes(config.type)).length;

  const childCount = paxConfigurations
    .filter((config) => [
      TourTransactionPaxType.CHILD_TWIN,
      TourTransactionPaxType.CHILD_WITH_BED,
      TourTransactionPaxType.CHILD_NO_BED,
      TourTransactionPaxType.INFANT,
    ].includes(config.type)).length;

  // Add adult airport tax
  if (adultCount > 0 && airportTax.adult > 0) {
    const adultTaxTotal = adultCount * airportTax.adult;
    taxes.push({
      quantity: adultCount,
      currency: homeCurrency,
      unitPrice: airportTax.adult,
      subTotal: adultTaxTotal,
      name: "Airport Tax (Adult)",
    });
    total += adultTaxTotal;
  }

  // Add child airport tax
  if (childCount > 0 && airportTax.child > 0) {
    const childTaxTotal = childCount * airportTax.child;
    taxes.push({
      quantity: childCount,
      currency: homeCurrency,
      unitPrice: airportTax.child,
      subTotal: childTaxTotal,
      name: "Airport Tax (Child)",
    });
    total += childTaxTotal;
  }

  return {
    taxes: taxes,
    total: total,
  };
}
