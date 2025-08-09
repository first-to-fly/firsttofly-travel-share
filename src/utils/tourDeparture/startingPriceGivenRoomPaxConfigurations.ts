import { GroupTourPricingEntry, GroupTourPricingFareStructure } from "../../entities/Products/GroupTourPricing";
import { BookingPaxType } from "../../enums/BookingTypes";
import { CalculationBasis, CostingItemCategory } from "../../entities/Settings/Product/CostingItem";
import { AirportTaxStructure, calculateAirportTax } from "../pricing/airportTaxCalculator";
import { convertPriceToHomeCurrency } from "../pricing/currencyConverter";
import { calculateTourFare } from "../pricing/tourFareCalculator";
import type { LineItemPrice, PaxConfiguration } from "../pricing/types";


export interface StartingPriceBreakdown {
  total: number;
  tourFare: (LineItemPrice & {
    paxType: BookingPaxType;
  })[];
  miscellaneous: (LineItemPrice & {
    costingEntryOID: string;
  })[];
  taxes: (LineItemPrice & {
    name: string;
  })[];
}


export function startingPriceGivenRoomPaxConfigurations(data: {
  pricing: {
    fullFare: GroupTourPricingFareStructure,
    landFare: GroupTourPricingFareStructure,
    groupTourPricingEntries: GroupTourPricingEntry[],
    airportTax: AirportTaxStructure,
  };
  homeCurrency: string;
  supportCurrencies: {
    currency: string;
    rate: number;
  }[];
  costingEntries: {
    oid: string;
    calculationBasis: CalculationBasis;
    quantity: number;
    category: CostingItemCategory;
  }[];
  paxConfigurations: PaxConfiguration[];
}): StartingPriceBreakdown {
  const {
    pricing,
    costingEntries,
    paxConfigurations,
    homeCurrency,
    supportCurrencies,
  } = data;

  // Initialize breakdown structure
  const breakdown: StartingPriceBreakdown = {
    total: 0,
    tourFare: [],
    miscellaneous: [],
    taxes: [],
  };

  // Calculate tour fare using shared utility
  const tourFareResult = calculateTourFare(
    paxConfigurations,
    pricing.fullFare,
    pricing.landFare,
    homeCurrency,
  );
  breakdown.tourFare = tourFareResult.tourFare;
  breakdown.total += tourFareResult.total;

  // Process costing entries
  const costingEntryMap = new Map<string, Parameters<typeof startingPriceGivenRoomPaxConfigurations>[0]["costingEntries"][number]>();
  costingEntries.forEach((entry) => {
    costingEntryMap.set(entry.oid, entry);
  });
  pricing.groupTourPricingEntries.forEach((entry) => {
    const costingEntry = costingEntryMap.get(entry.groupTourCostingEntryOID);
    if (!costingEntry) return;

    const convertedPrice = convertPriceToHomeCurrency(
      entry.priceValue,
      homeCurrency,
      supportCurrencies,
    );
    if (!convertedPrice) return;

    const unitPrice = convertedPrice.amount + convertedPrice.tax;
    const quantity = costingEntry.calculationBasis !== CalculationBasis.PER_PAX ?
      costingEntry.quantity :
      paxConfigurations.length;
    const subTotal = quantity * unitPrice;

    const lineItem: LineItemPrice & { costingEntryOID: string } = {
      quantity: quantity,
      currency: homeCurrency,
      unitPrice: unitPrice,
      subTotal: subTotal,
      costingEntryOID: costingEntry.oid,
    };

    // Categorize based on costing entry category
    switch (costingEntry.category) {

      case CostingItemCategory.MISCELLANEOUS:
        breakdown.miscellaneous.push(lineItem);
        breakdown.total += subTotal;
        break;
      default:
        break;

    }
  });

  // Add airport taxes using shared utility
  const airportTaxResult = calculateAirportTax(
    paxConfigurations,
    pricing.airportTax,
    homeCurrency,
  );
  breakdown.taxes = airportTaxResult.taxes;
  breakdown.total += airportTaxResult.total;

  return breakdown;
}
