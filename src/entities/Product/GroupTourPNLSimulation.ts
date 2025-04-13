import { z } from "zod";

import { EntityZ } from "../entity";


export const GroupTourPNLSimulationZ = EntityZ.extend({
  groupTourPricingOID: z.string(),
  groupVolumes: z.array(z.number()),
});

export type GroupTourPNLSimulation = z.infer<typeof GroupTourPNLSimulationZ>;
