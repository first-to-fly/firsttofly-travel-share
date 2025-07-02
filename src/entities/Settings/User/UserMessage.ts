import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../../entity";


export enum UserMessageType {
  SYSTEM = "system",
  NOTIFICATION = "notification",
  ALERT = "alert",
  INFO = "info",
}

export enum UserMessageBodyFormat {
  TEXT = "text",
  HTML = "html",
  MARKDOWN = "markdown",
}

export const UserMessageZ = EntityZ.extend({
  userMessageOID: EntityOIDZ.optional(),
  tenantOID: EntityOIDZ.optional(),
  userOID: EntityOIDZ.optional(),
  title: z.string(),
  type: z.nativeEnum(UserMessageType),
  key: z.string(),
  bodyFormat: z.nativeEnum(UserMessageBodyFormat),
  bodyParams: z.record(z.unknown()).optional(),
  isRead: z.boolean().default(false),
  isResolved: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
  expiresAt: z.string().optional(),
});

export type UserMessage = z.infer<typeof UserMessageZ>;

export enum UserMessageEvents {
  USER_MESSAGE_CREATED = "USER_MESSAGE_CREATED",
  USER_MESSAGE_UPDATED = "USER_MESSAGE_UPDATED",
  USER_MESSAGE_DELETED = "USER_MESSAGE_DELETED",
}