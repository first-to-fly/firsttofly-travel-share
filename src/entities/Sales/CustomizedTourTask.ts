// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";

export enum CustomizedTourTaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export enum CustomizedTourTaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}


export const CustomizedTourTaskZ = EntityZ.extend({
  customizedTourBookingOID: EntityOIDZ,
  customizedTourItineraryItemOID: EntityOIDZ.nullish(),
  supplierOID: EntityOIDZ.nullish(),
  assignedTo: z.string().nullish(),
  title: z.string(),
  description: z.string().nullish(),
  status: z.nativeEnum(CustomizedTourTaskStatus),
  priority: z.nativeEnum(CustomizedTourTaskPriority),
  startDate: z.string().datetime().nullish(),
  endDate: z.string().datetime().nullish(),
  paxCount: z.number().int().nullish(),
  amount: z.number().nullish(),
  category: z.string().nullish(),
});

export type CustomizedTourTask = z.infer<typeof CustomizedTourTaskZ>;

export enum CustomizedTourTaskEvents {
  CUSTOMIZED_TOUR_TASK_UPDATED = "CUSTOMIZED_TOUR_TASK_UPDATED",
  CUSTOMIZED_TOUR_TASK_LIST_UPDATED = "CUSTOMIZED_TOUR_TASK_LIST_UPDATED",
}
