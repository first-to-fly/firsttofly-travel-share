import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum AssembleLocationAirlinesEvents {
  ASSEMBLE_LOCATION_AIRLINE_UPDATED = "ASSEMBLE_LOCATION_AIRLINE_UPDATED",
  ASSEMBLE_LOCATION_AIRLINE_LIST_UPDATED = "ASSEMBLE_LOCATION_AIRLINE_LIST_UPDATED",
}

export const AssembleLocationAirlineZ = EntityZ.extend({
  entityType: z.literal(EntityType.ASSEMBLE_LOCATION_AIRLINES),

  tenantOID: z.string(),

  airlineCode: z.string(),
  airportCode: z.string(),
  file: z.array(z.string().url()).nullable(),
  location: z.string().nullable(),
  status: z.boolean(),
  offlineOperator: z.string().nullable(),
});

export type AssembleLocationAirline = z.infer<typeof AssembleLocationAirlineZ>;
