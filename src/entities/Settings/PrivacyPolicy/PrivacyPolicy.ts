import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export const PrivacyPolicyZ = EntityZ.extend({
  entityType: z.literal(EntityType.PRIVACY_POLICY),

  name: z.string(),
  fileURL: z.string(),
  isActive: z.boolean(),
});

export type PrivacyPolicy = z.infer<typeof PrivacyPolicyZ>;
