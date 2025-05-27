import { GroupTourCostingEntry } from "../../entities/Products/GroupTourCosting";
import { GroupTourPricing } from "../../entities/Products/GroupTourPricing";
import { TourTransactionPaxType } from "../../entities/Sales/TourTransactionPax";
import { CalculationBasis, CostingItemCategory } from "../../entities/Settings/Product/CostingItem";


export interface LineItemPrice {
  quantity: number;
  currency: string;
  unitPrice: number;
  subTotal: number;
}


export interface StartingPriceBreakdown {
  total: number;
  tourFare: (LineItemPrice & {
    paxType: TourTransactionPaxType;
  })[];
  optionalServices: (LineItemPrice & {
    costingEntryOID: string;
  })[];
  miscellaneous: (LineItemPrice & {
    costingEntryOID: string;
  })[];
  taxes: (LineItemPrice & {
    name: string;
  })[];
}


export function startingPriceGivenRoomPaxConfigurations(data: {
  pricing: GroupTourPricing;
  homeCurrency: string;
  supportCurrencies: {
    currency: string;
    rate: number;
  }[];
  costingEntries: GroupTourCostingEntry[];
  paxConfigurations: {
    type: TourTransactionPaxType;
    fareType: "full" | "land";
  }[];
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
    optionalServices: [],
    miscellaneous: [],
    taxes: [],
  };

  // Calculate tour fare based on pax configurations
  const tourFareMap = new Map<string, { quantity: number; unitPrice: number; paxType: TourTransactionPaxType; fareType: "full" | "land" }>();

  paxConfigurations.forEach(({ type, fareType }) => {
    const key = `${type}-${fareType}`;
    const existing = tourFareMap.get(key);

    if (existing) {
      existing.quantity += 1;
    } else {
      // Get unit price based on pax type and fare type
      const fareStructure = fareType === "full" ? pricing.fullFare : pricing.landFare;
      let unitPrice = 0;

      switch (type) {

        case TourTransactionPaxType.TWIN:
          unitPrice = fareStructure.twin;
          break;
        case TourTransactionPaxType.SINGLE:
          unitPrice = fareStructure.single;
          break;
        case TourTransactionPaxType.TRIPLE:
          unitPrice = fareStructure.triple;
          break;
        case TourTransactionPaxType.QUAD:
          unitPrice = fareStructure.quad;
          break;
        case TourTransactionPaxType.CHILD_TWIN:
          unitPrice = fareStructure.childTwin;
          break;
        case TourTransactionPaxType.CHILD_WITH_BED:
          unitPrice = fareStructure.childWithBed;
          break;
        case TourTransactionPaxType.CHILD_NO_BED:
          unitPrice = fareStructure.childNoBed;
          break;
        case TourTransactionPaxType.INFANT:
          unitPrice = fareStructure.infant;
          break;
        default:
          unitPrice = 0;

      }

      tourFareMap.set(key, {
        quantity: 1,
        unitPrice: unitPrice,
        paxType: type,
        fareType: fareType,
      });
    }
  });

  // Convert tour fare map to breakdown format
  tourFareMap.forEach(({ quantity, unitPrice, paxType }) => {
    const subTotal = quantity * unitPrice;
    breakdown.tourFare.push({
      quantity: quantity,
      currency: homeCurrency,
      unitPrice: unitPrice,
      subTotal: subTotal,
      paxType: paxType,
    });
    breakdown.total += subTotal;
  });

  // Process costing entries
  const costingEntryMap = new Map<string, GroupTourCostingEntry>();
  costingEntries.forEach((entry) => {
    costingEntryMap.set(entry.oid, entry);
  });

  pricing.groupTourPricingEntries.forEach((entry) => {
    const costingEntry = costingEntryMap.get(entry.groupTourCostingEntryOID);
    if (!costingEntry) return;

    const supportCurrency = supportCurrencies.find((currency) => currency.currency === entry.priceValue.currency);
    if (!supportCurrency) return;

    const priceInHomeCurrency = {
      amount: entry.priceValue.amount * supportCurrency.rate,
      tax: entry.priceValue.tax * supportCurrency.rate,
    };

    const unitPrice = priceInHomeCurrency.amount + priceInHomeCurrency.tax;
    const subTotal = costingEntry.quantity * unitPrice;

    const lineItem: LineItemPrice & { costingEntryOID: string } = {
      quantity: costingEntry.calculationBasis !== CalculationBasis.PER_PAX ?
        costingEntry.quantity :
        paxConfigurations.length,
      currency: homeCurrency,
      unitPrice: unitPrice,
      subTotal: subTotal,
      costingEntryOID: costingEntry.oid,
    };

    // Categorize based on costing entry category
    switch (costingEntry.category) {

      case CostingItemCategory.OPTIONAL_SERVICE:
        breakdown.optionalServices.push(lineItem);
        breakdown.total += subTotal;
        break;
      case CostingItemCategory.MISCELLANEOUS:
        breakdown.miscellaneous.push(lineItem);
        breakdown.total += subTotal;
        break;
      default:
        break;

    }
  });

  // Add airport taxes if applicable
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

  if (adultCount > 0 && pricing.airportTax.adult > 0) {
    const adultTaxTotal = adultCount * pricing.airportTax.adult;
    breakdown.taxes.push({
      quantity: adultCount,
      currency: homeCurrency,
      unitPrice: pricing.airportTax.adult,
      subTotal: adultTaxTotal,
      name: "Airport Tax (Adult)",
    });
    breakdown.total += adultTaxTotal;
  }

  if (childCount > 0 && pricing.airportTax.child > 0) {
    const childTaxTotal = childCount * pricing.airportTax.child;
    breakdown.taxes.push({
      quantity: childCount,
      currency: homeCurrency,
      unitPrice: pricing.airportTax.child,
      subTotal: childTaxTotal,
      name: "Airport Tax (Child)",
    });
    breakdown.total += childTaxTotal;
  }

  return breakdown;
}
