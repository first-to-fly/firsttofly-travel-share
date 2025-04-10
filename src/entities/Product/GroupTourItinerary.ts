import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { EntityZ } from "../entity";


export const GroupTourItineraryZ = EntityZ.extend({
  groupTourProductOID: z.string(),
  name: z.string(),
  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,
  isActive: z.boolean(),
});

export type GroupTourItinerary = z.infer<typeof GroupTourItineraryZ>;
