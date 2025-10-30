import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/xero";

const AuthQueryZ = z.object({
  tenantOID: z.string(),
  state: z.string().optional(),
});

const CallbackQueryZ = z.object({
  code: z.string().optional(),
  state: z.string().optional(),
  error: z.string().optional(),
});

const AuthResponseZ = z.object({
  authUrl: z.string(),
});

const CallbackResponseZ = z.object({
  message: z.string(),
  success: z.boolean(),
  state: z.string().optional(),
});

const StatusResponseZ = z.object({
  enabled: z.boolean(),
  authenticated: z.boolean(),
  message: z.string(),
});

const DisconnectResponseZ = z.object({
  message: z.string(),
  success: z.boolean(),
});

export const xeroSyncContract = initContract().router({
  initiateAuth: {
    summary: "Initiate Xero OAuth2 authorization and return redirect URL",
    method: "GET",
    path: `${basePath}/auth`,
    query: AuthQueryZ,
    responses: {
      200: AuthResponseZ,
    },
  },
  handleCallback: {
    summary: "Handle Xero OAuth2 authorization callback",
    method: "GET",
    path: `${basePath}/auth/callback`,
    query: CallbackQueryZ,
    responses: {
      200: CallbackResponseZ,
    },
  },
  getStatus: {
    summary: "Check current Xero integration status",
    method: "GET",
    path: `${basePath}/status`,
    query: z.object({ tenantOID: z.string() }),
    responses: {
      200: StatusResponseZ,
    },
  },
  disconnect: {
    summary: "Disconnect Xero integration and clear stored tokens",
    method: "GET",
    path: `${basePath}/disconnect`,
    query: z.object({ tenantOID: z.string() }),
    responses: {
      200: DisconnectResponseZ,
    },
  },
});
