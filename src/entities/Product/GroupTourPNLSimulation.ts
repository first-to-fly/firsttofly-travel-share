import { z } from "zod";

import { EntityZ } from "../entity";


export const GroupTourPNLSimulationZ = EntityZ.extend({
  groupTourPricingOID: z.string(),
  groupVolume: z.string(),
  passengerCount: z.number(),
});

export type GroupTourPNLSimulation = z.infer<typeof GroupTourPNLSimulationZ>;
