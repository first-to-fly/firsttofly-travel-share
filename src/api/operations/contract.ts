import { initContract } from "@ts-rest/core";

import { budgetContract } from "./budget-contract";
import { budgetCostingEntryContract } from "./budget-costing-entry-contract";
import { tourDepartureContract } from "./tour-departure-contract";
import { transportGroupContract } from "./transport-group-contract";
import { transportSegmentContract } from "./transport-segment-contract";


export const operationsContract = initContract().router({
  budget: budgetContract,
  budgetCostingEntry: budgetCostingEntryContract,
  tourDeparture: tourDepartureContract,
  transportGroup: transportGroupContract,
  transportSegment: transportSegmentContract,
});
