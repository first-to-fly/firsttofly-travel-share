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
    oid: z.string().optional(),
    text: z.string().optional(),
    link: z.string().optional(),
    meta: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })).optional(),
  }),
});

export const UserMessageZ = EntityZ.extend({
  userMessageOID: EntityOIDZ.optional(),
  tenantOID: EntityOIDZ.optional(),
  userOID: EntityOIDZ.optional(),
  title: z.string(),
  type: z.nativeEnum(UserMessageType),
  key: z.string(),
  bodyFormat: z.string(), // Template string like "{{user}} has assigned {{task}} to you"
  bodyParams: z.array(UserMessageBodyParamZ).optional(),
  isRead: z.boolean().default(false),
  isResolved: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
  expiresAt: z.string().optional(),
});

export type UserMessage = z.infer<typeof UserMessageZ>;
export type UserMessageBodyParam = z.infer<typeof UserMessageBodyParamZ>;

export enum UserMessageEvents {
  USER_MESSAGE_CREATED = "USER_MESSAGE_CREATED",
  USER_MESSAGE_UPDATED = "USER_MESSAGE_UPDATED",
  USER_MESSAGE_DELETED = "USER_MESSAGE_DELETED",
}
