import { z } from "zod";

import { NamedURLZ } from "../../../types/url";
import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum PrivacyPolicyEvents {
  PRIVACY_POLICY_UPDATED = "PRIVACY_POLICY_UPDATED",
  PRIVACY_POLICY_LIST_UPDATED = "PRIVACY_POLICY_LIST_UPDATED",
}


export const PrivacyPolicyZ = EntityZ.extend({
  entityType: z.literal(EntityType.PRIVACY_POLICY),

  name: z.string(),
  file: NamedURLZ,
  isActive: z.boolean(),
});

export type PrivacyPolicy = z.infer<typeof PrivacyPolicyZ>;
