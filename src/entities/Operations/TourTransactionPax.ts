// simple-import-sort
import { z } from "zod";

import { NamedURLZ } from "../../types/url";
import { EntityZ } from "../entity";


export enum TourTransactionPaxType {
  TWIN = "twin",
  SINGLE = "single",
  TRIPLE = "triple",
  QUAD = "quad",
  CHILD_TWIN = "child_twin",
  CHILD_WITH_BED = "child_with_bed",
  CHILD_NO_BED = "child_no_bed",
  INFANT = "infant",
}

export const TourTransactionPaxTypeZ = z.nativeEnum(TourTransactionPaxType);

export const TourTransactionPaxZ = EntityZ.extend({
  tourTransactionRoomOID: z.string(),
  type: TourTransactionPaxTypeZ,
  isLandTourOnly: z.boolean().default(false),
  personalDetails: z.record(z.unknown()).optional(), // JSONB
  mealPreference: z.string().optional(),
  transportRecordId: z.string().uuid().optional(),
  files: z.array(NamedURLZ).optional(),
});

export type TourTransactionPax = z.infer<typeof TourTransactionPaxZ>;

export enum TourTransactionPaxEvents {
  TOUR_TRANSACTION_PAX_UPDATED = "TOUR_TRANSACTION_PAX_UPDATED",
  TOUR_TRANSACTION_PAX_LIST_UPDATED = "TOUR_TRANSACTION_PAX_LIST_UPDATED",
}
