import { initContract } from "@ts-rest/core";

import { approvalRequestContract } from "./approval-request-contract";
import { budgetContract } from "./budget-contract";
import { budgetEntryContract } from "./budget-entry-contract";
import { supplierContract } from "./supplier-contract";
import { tourDepartureContract } from "./tour-departure-contract";
import { transportGroupContract } from "./transport-group-contract";
import { transportSegmentContract } from "./transport-segment-contract";


export const operationsContract = initContract().router({
  approvalRequest: approvalRequestContract,
  budget: budgetContract,
  budgetEntry: budgetEntryContract,
  supplier: supplierContract,
  tourDeparture: tourDepartureContract,
  transportGroup: transportGroupContract,
  transportSegment: transportSegmentContract,
});
