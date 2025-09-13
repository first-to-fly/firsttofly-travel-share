import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../../entity";


export enum UserMessageType {
  SYSTEM = "system",
  NOTIFICATION = "notification",
  ALERT = "alert",
  INFO = "info",
}

export const UserMessageBodyParamZ = z.object({
  key: z.string(),
  value: z.object({
    oid: z.string().nullish(),
    text: z.string().nullish(),
    link: z.string().nullish(),
    meta: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })).nullish(),
  }),
});

export const UserMessageZ = EntityZ.extend({
  userMessageOID: EntityOIDZ.nullish(),
  tenantOID: EntityOIDZ.nullish(),
  userOID: EntityOIDZ.nullish(),
  title: z.string(),
  type: z.nativeEnum(UserMessageType),
  key: z.string(),
  bodyFormat: z.string(), // Template string like "{{user}} has assigned {{task}} to you"
  bodyParams: z.array(UserMessageBodyParamZ).nullish(),
  isRead: z.boolean().default(false),
  isResolved: z.boolean().default(false),
  metadata: z.record(z.unknown()).nullish(),
  expiresAt: z.string().nullish(),
});

export type UserMessage = z.infer<typeof UserMessageZ>;
export type UserMessageBodyParam = z.infer<typeof UserMessageBodyParamZ>;

export enum UserMessageEvents {
  USER_MESSAGE_CREATED = "USER_MESSAGE_CREATED",
  USER_MESSAGE_UPDATED = "USER_MESSAGE_UPDATED",
  USER_MESSAGE_DELETED = "USER_MESSAGE_DELETED",
}
