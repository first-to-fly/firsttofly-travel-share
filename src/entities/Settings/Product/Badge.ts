import { z } from "zod";

import { MultiLangRecordZ } from "../../../types/multipleLanguage";
import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export const BadgeZ = EntityZ.extend({
  entityType: z.literal(EntityType.BADGE),
  image: MultiLangRecordZ(z.string()),
  isActive: z.boolean(),
  icon: z.string(),
});

export type Badge = z.infer<typeof BadgeZ>;

export enum BadgeEvents {
  BADGE_UPDATED = "BADGE_UPDATED",
  BADGE_LIST_UPDATED = "BADGE_LIST_UPDATED",
}
