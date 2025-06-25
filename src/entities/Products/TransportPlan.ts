import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum TransportPlanEvents {
  TRANSPORT_PLAN_UPDATED = "TRANSPORT_PLAN_UPDATED",
  TRANSPORT_PLAN_LIST_UPDATED = "TRANSPORT_PLAN_LIST_UPDATED",
}

export const TransportPlanZ = EntityZ.extend({
  entityType: z.literal(EntityType.TRANSPORT_PLAN),
  name: z.string(),
  description: z.string().optional(),

  transportSegmentOIDs: z.array(z.string()).optional(),
});

export type TransportPlan = z.infer<typeof TransportPlanZ>;
