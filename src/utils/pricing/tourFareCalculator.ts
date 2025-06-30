import { GroupTourPricingFareStructure } from "../../entities/Products/GroupTourPricing";
import { GroupTourBookingPaxType } from "../../entities/Sales/GroupTourBookingPax";
import type { LineItemPrice, PaxConfiguration } from "./types";


/**
 * Calculate tour fare based on passenger configurations and fare structure
 */
export function calculateTourFare(
  paxConfigurations: PaxConfiguration[],
  fullFare: GroupTourPricingFareStructure,
  landFare: GroupTourPricingFareStructure,
  homeCurrency: string,
): { tourFare: (LineItemPrice & { paxType: GroupTourBookingPaxType })[], total: number } {
  const tourFare: (LineItemPrice & { paxType: GroupTourBookingPaxType })[] = [];
  let total = 0;

  // Group passengers by type and fare type for efficiency
  const tourFareMap = new Map<string, { quantity: number; unitPrice: number; paxType: GroupTourBookingPaxType }>();

  paxConfigurations.forEach(({ type, fareType }) => {
    const key = `${type}-${fareType}`;
    const existing = tourFareMap.get(key);

    if (existing) {
      existing.quantity += 1;
    } else {
      // Get unit price based on pax type and fare type
      const fareStructure = fareType === "full" ? fullFare : landFare;
      const unitPrice = getPaxTypeFare(type, fareStructure);

      tourFareMap.set(key, {
        quantity: 1,
        unitPrice: unitPrice,
        paxType: type,
      });
    }
  });

  // Convert to breakdown format
  tourFareMap.forEach(({ quantity, unitPrice, paxType }) => {
    const subTotal = quantity * unitPrice;
    tourFare.push({
      quantity: quantity,
      currency: homeCurrency,
      unitPrice: unitPrice,
      subTotal: subTotal,
      paxType: paxType,
    });
    total += subTotal;
  });

  return {
    tourFare: tourFare,
    total: total,
  };
}


/**
 * Get fare price for a specific passenger type from fare structure
 */
function getPaxTypeFare(paxType: GroupTourBookingPaxType, fareStructure: GroupTourPricingFareStructure): number {
  switch (paxType) {

    case GroupTourBookingPaxType.TWIN:
      return fareStructure.twin;
    case GroupTourBookingPaxType.SINGLE:
      return fareStructure.single;
    case GroupTourBookingPaxType.TRIPLE:
      return fareStructure.triple;
    case GroupTourBookingPaxType.QUAD:
      return fareStructure.quad;
    case GroupTourBookingPaxType.CHILD_TWIN:
      return fareStructure.childTwin;
    case GroupTourBookingPaxType.CHILD_WITH_BED:
      return fareStructure.childWithBed;
    case GroupTourBookingPaxType.CHILD_NO_BED:
      return fareStructure.childNoBed;
    case GroupTourBookingPaxType.INFANT:
      return fareStructure.infant;
    default:
      return 0;

  }
}
