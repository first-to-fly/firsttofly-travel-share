import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { UserMessageType } from "../../entities/Settings/User/UserMessage";


const base = "/api/user-messages" as const;

export const GetUserMessagesParams = z.object({
  userOID: EntityOIDZ.optional(),
  tenantOID: EntityOIDZ,
  type: z.nativeEnum(UserMessageType).optional(),
  isRead: z.boolean().optional(),
  isResolved: z.boolean().optional(),
});

export const BatchUpdateUserMessagesBody = z.object({
  userMessageOIDs: z.array(EntityOIDZ),
  isRead: z.boolean().optional(),
  isResolved: z.boolean().optional(),
  updatedBy: z.string(),
});

export const BatchDeleteUserMessagesBody = z.object({
  userMessageOIDs: z.array(EntityOIDZ),
});

const c = initContract().router({
  getUserMessages: {
    method: "GET",
    path: base,
    query: GetUserMessagesParams,
    responses: {
      200: z.object({
        oids: z.array(EntityOIDZ),
      }),
    },
    summary: "Get user messages",
  },
  batchUpdateUserMessages: {
    method: "PATCH",
    path: `${base}/batch`,
    body: BatchUpdateUserMessagesBody,
    responses: {
      200: z.boolean(),
    },
    summary: "Batch update user messages",
  },
  batchDeleteUserMessages: {
    method: "DELETE",
    path: `${base}/batch`,
    body: BatchDeleteUserMessagesBody,
    responses: {
      200: z.boolean(),
    },
    summary: "Batch delete user messages",
  },
});

export const userMessageContract = c;
