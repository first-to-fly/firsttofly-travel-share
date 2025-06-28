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
  groupVolumes: z.array(z.number()),
});

export type GroupTourPNLSimulation = z.infer<typeof GroupTourPNLSimulationZ>;
