import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export const BadgeZ = EntityZ.extend({
  entityType: z.literal(EntityType.BADGE),

  isActive: z.boolean(),
  icon: z.string(),
});

export type Badge = z.infer<typeof BadgeZ>;

export const BadgeTranslationZ = EntityZ.extend({
  entityType: z.literal(EntityType.BADGE_TRANSLATION),

  badgeOID: z.string(),
  languageOID: z.string(),
  name: z.string(),
});

export type BadgeTranslation = z.infer<typeof BadgeTranslationZ>;
