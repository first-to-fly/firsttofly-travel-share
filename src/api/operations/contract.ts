import { initContract } from "@ts-rest/core";

import { transportGroupContract } from "./transport-group-contract";
import { transportSegmentContract } from "./transport-segment-contract";


export const operationsContract = initContract().router({
  transportGroup: transportGroupContract,
  transportSegment: transportSegmentContract,
});
