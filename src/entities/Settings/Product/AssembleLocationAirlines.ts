import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum AssembleLocationAirlinesEvents {
  ASSEMBLE_LOCATION_AIRLINES_UPDATED = "ASSEMBLE_LOCATION_AIRLINES_UPDATED",
  ASSEMBLE_LOCATION_AIRLINES_LIST_UPDATED = "ASSEMBLE_LOCATION_AIRLINES_LIST_UPDATED",
}

export const AssembleLocationAirlinesZ = EntityZ.extend({
  entityType: z.literal(EntityType.ASSEMBLE_LOCATION_AIRLINES),

  tenantOID: z.string(),

  airlineCode: z.string(),
  airportCode: z.string(),
  file: z.array(z.string().url()).nullable(),
  location: z.string().nullable(),
  status: z.boolean(),
  offlineOperator: z.string().nullable(),
});

export type AssembleLocationAirlines = z.infer<typeof AssembleLocationAirlinesZ>;
