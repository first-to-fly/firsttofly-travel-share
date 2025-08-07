import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum GroupTourPNLEvents {
  GROUP_TOUR_PNL_UPDATED = "GROUP_TOUR_PNL_UPDATED",
  GROUP_TOUR_PNL_LIST_UPDATED = "GROUP_TOUR_PNL_LIST_UPDATED",
}


export const GroupTourPNLSimulationZ = EntityZ.omit({
  tenantOID: true,
}).extend({
  groupTourPricingOID: EntityOIDZ,
  name: z.string(),
  excelJSON: z.unknown(),
});

export type GroupTourPNLSimulation = z.infer<typeof GroupTourPNLSimulationZ>;
