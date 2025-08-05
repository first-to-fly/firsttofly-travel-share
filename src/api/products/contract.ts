import { initContract } from "@ts-rest/core";

import { groupTourCostingContract } from "./group-tour-costing-contract";
import { groupTourItineraryContract } from "./group-tour-itinerary-contract";
import { groupTourPNLSimulationContract } from "./group-tour-pnl-simulation-contract";
import { groupTourPricingContract } from "./group-tour-pricing-contract";
import { groupTourProductContract } from "./group-tour-product-contract";
import { independentTourAccommodationCostingContract } from "./independent-tour-accommodation-costing-contract";
import { independentTourCostingContract } from "./independent-tour-costing-contract";
import { independentTourMiscellaneousCostingContract } from "./independent-tour-miscellaneous-costing-contract";
import { independentTourOptionalServiceCostingContract } from "./independent-tour-optional-service-costing-contract";
import { independentTourPricingContract } from "./independent-tour-pricing-contract";
import { independentTourProductContract } from "./independent-tour-product-contract";
import { transportPlanContract } from "./transport-plan-contract";


export const productsContract = initContract().router({

  groupTour: {
    product: groupTourProductContract,
    itinerary: groupTourItineraryContract,
    costing: groupTourCostingContract,
    pricing: groupTourPricingContract,
    pnlSimulation: groupTourPNLSimulationContract,
  },

  independentTour: {
    product: independentTourProductContract,
    costing: independentTourCostingContract,
    pricing: independentTourPricingContract,
    accommodationCosting: independentTourAccommodationCostingContract,
    miscellaneousCosting: independentTourMiscellaneousCostingContract,
    optionalServiceCosting: independentTourOptionalServiceCostingContract,
  },

  transportPlan: transportPlanContract,
});
