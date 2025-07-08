import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { UserMessageType, UserMessageZ } from "../../entities/Settings/User/UserMessage";


const basePath = "/api/user-messages";

const CreateUserMessageZ = UserMessageZ.pick({
  tenantOID: true,
  userOID: true,
  title: true,
  type: true,
  key: true,
  bodyFormat: true,
  bodyParams: true,
  metadata: true,
  expiresAt: true,
});

const UpdateUserMessageZ = CreateUserMessageZ.omit({
  tenantOID: true,
  userOID: true,
}).partial();

export type CreateUserMessage = z.infer<typeof CreateUserMessageZ>;
export type UpdateUserMessage = z.infer<typeof UpdateUserMessageZ>;

const c = initContract().router({
  getUserMessages: {
    summary: "Get user messages",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      userOID: z.string().optional(),
      type: z.nativeEnum(UserMessageType).optional(),
      isRead: z.boolean().optional(),
      isResolved: z.boolean().optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createUserMessage: {
    summary: "Create a new user message",
    method: "POST",
    path: basePath,
    body: CreateUserMessageZ,
    responses: {
      200: z.string(),
    },
  },

  updateUserMessages: {
    summary: "Update multiple existing user messages",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of user message to update"),
      UpdateUserMessageZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated user messages")),
    },
  },

  deleteUserMessages: {
    summary: "Delete multiple user messages",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      userMessageOIDs: z.array(z.string().describe("OIDs of user messages to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});

export const userMessageContract = c;
