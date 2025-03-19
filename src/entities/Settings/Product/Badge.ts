import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export const BadgeZ = EntityZ.extend({
  entityType: z.literal(EntityType.BADGE),

  isActive: z.boolean(),
  icon: z.string().uuid(),
});

export type Badge = z.infer<typeof BadgeZ>;

export const BadgeTranslationZ = EntityZ.extend({
  entityType: z.literal(EntityType.BADGE_TRANSLATION),

  badgeOID: z.string().uuid(),
  languageOID: z.string().uuid(),
  name: z.string(),
});

export type BadgeTranslation = z.infer<typeof BadgeTranslationZ>;
