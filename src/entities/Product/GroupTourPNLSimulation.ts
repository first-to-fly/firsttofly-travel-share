import { EntityZ } from "entities/entity";
import { z } from "zod";


export const GroupTourPNLSimulationZ = EntityZ.extend({
  groupTourPricingOID: z.string(),
  groupVolume: z.string(),
  passengerCount: z.number(),
});

export type GroupTourPNLSimulation = z.infer<typeof GroupTourPNLSimulationZ>;
