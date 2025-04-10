import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { EntityZ } from "../entity";


export const GroupTourCostingZ = EntityZ.extend({
  groupTourProductOID: z.string(),
  templateOID: z.string(),
  name: z.string(),
  code: z.string(),
  remarks: z.string(),
  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,
  isActive: z.boolean(),
});

export type GroupTourCosting = z.infer<typeof GroupTourCostingZ>;
