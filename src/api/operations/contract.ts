import { initContract } from "@ts-rest/core";

import { tourDepartureContract } from "./tour-departure-contract";
import { tourTransactionContract } from "./tour-transaction-contract";
import { transportGroupContract } from "./transport-group-contract";
import { transportSegmentContract } from "./transport-segment-contract";


export const operationsContract = initContract().router({
  tourDeparture: tourDepartureContract,
  transportGroup: transportGroupContract,
  transportSegment: transportSegmentContract,
  tourTransaction: tourTransactionContract,
});
