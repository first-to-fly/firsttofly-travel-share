import { initContract } from "@ts-rest/core";

import { groupTourCostingContract } from "./group-tour-costing-contract";
import { groupTourItineraryContract } from "./group-tour-itinerary-contract";
import { groupTourPNLSimulationContract } from "./group-tour-pnl-simulation-contract";
import { groupTourPricingContract } from "./group-tour-pricing-contract";
import { groupTourProductContract } from "./group-tour-product-contract";
import { independentTourAccommodationContract } from "./independent-tour-accommodation-contract";
import { independentTourMiscellaneousContract } from "./independent-tour-miscellaneous-contract";
import { independentTourOptionalServiceContract } from "./independent-tour-optional-service-contract";
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
    accommodation: independentTourAccommodationContract,
    miscellaneous: independentTourMiscellaneousContract,
    optionalService: independentTourOptionalServiceContract,
  },

  transportPlan: transportPlanContract,
});
