import { EntityType } from "entities/entityType";
import { z } from "zod";

import { EntityZ } from "../../entity";


export const BadgeZ = EntityZ.extend({
  entityType: z.literal(EntityType.BADGE),

  isActive: z.boolean(),
  icon: z.string().uuid(),
});

export type Badge = z.infer<typeof BadgeZ>;

export const BadgeTranslationZ = EntityZ.extend({
  entityType: z.literal(EntityType.BADGE_TRANSLATION),

  badgeId: z.string().uuid(),
  languageId: z.string().uuid(),
  name: z.string(),
});

export type BadgeTranslation = z.infer<typeof BadgeTranslationZ>;
