import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum AssembleLocationAirlinesEvents {
  ASSEMBLE_LOCATION_AIRLINES_UPDATED = "ASSEMBLE_LOCATION_AIRLINES_UPDATED",
  ASSEMBLE_LOCATION_AIRLINES_LIST_UPDATED = "ASSEMBLE_LOCATION_AIRLINES_LIST_UPDATED",
}

export const AssembleLocationAirlinesZ = EntityZ.extend({
  entityType: z.literal(EntityType.ASSEMBLE_LOCATION_AIRLINES),

  tenantOID: EntityOIDZ,

  airlineCode: z.string(),
  airportCode: z.string(),
  files: z.array(z.string().url()).nullable(),
  location: z.string().nullable(),
  isActive: z.boolean(),
});

export type AssembleLocationAirlines = z.infer<typeof AssembleLocationAirlinesZ>;
