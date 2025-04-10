import { EntityZ } from "entities/entity";
import { z } from "zod";


export const GroupTourItineraryZ = EntityZ.extend({
  groupTourProductOID: z.string(),
  name: z.string(),
  validityStartDate: z.date(),
  validityEndDate: z.date(),
  isActive: z.boolean(),
});

export type GroupTourItinerary = z.infer<typeof GroupTourItineraryZ>;
