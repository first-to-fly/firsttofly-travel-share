import { initContract } from "@ts-rest/core";

import { groupTourCostingContract } from "./group-tour-costing-contract";
import { groupTourItineraryContract } from "./group-tour-itinerary-contract";
import { groupTourPNLSimulationContract } from "./group-tour-pnl-simulation-contract";
import { groupTourPricingContract } from "./group-tour-pricing-contract";
import { groupTourProductContract } from "./group-tour-product-contract";


export const productsContract = initContract().router({

  groupTour: {
    product: groupTourProductContract,
    itinerary: groupTourItineraryContract,
    costing: groupTourCostingContract,
    pricing: groupTourPricingContract,
    pnlSimulation: groupTourPNLSimulationContract,
  },
});
