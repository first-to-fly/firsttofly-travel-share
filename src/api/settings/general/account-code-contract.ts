import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { AccountCodeStatus, AccountCodeType, AccountCodeZ } from "../../../entities/Settings/General/AccountCode";


const basePath = "/api/settings/account-codes";

const CreateAccountCodeZ = AccountCodeZ.pick({
  tenantOID: true,
  code: true,
  name: true,
  description: true,
  type: true,
  status: true,
  currency: true,
  parentAccountCodeOID: true,
  xeroAccountId: true,
  xeroAccountCode: true,
  isSystemGenerated: true,
  allowManualJournals: true,
  taxType: true,
});

const UpdateAccountCodeZ = CreateAccountCodeZ.omit({
  tenantOID: true,
  code: true,
  isSystemGenerated: true,
}).partial();

const AccountCodeListParamsZ = z.object({
  tenantOID: z.string(),
  type: z.nativeEnum(AccountCodeType).optional(),
  status: z.nativeEnum(AccountCodeStatus).optional(),
  currency: z.string().optional(),
  parentAccountCodeOID: z.string().optional(),
  search: z.string().optional(),
}).passthrough();

export type CreateAccountCode = z.infer<typeof CreateAccountCodeZ>;
export type UpdateAccountCode = z.infer<typeof UpdateAccountCodeZ>;
export type AccountCodeListParams = z.infer<typeof AccountCodeListParamsZ>;

export const accountCodeContract = initContract().router({
  getAccountCodes: {
    summary: "Get account codes",
    method: "GET",
    path: basePath,
    query: AccountCodeListParamsZ,
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createAccountCode: {
    summary: "Create a new account code",
    method: "POST",
    path: basePath,
    body: CreateAccountCodeZ,
    responses: {
      200: z.string(),
    },
  },

  updateAccountCode: {
    summary: "Update an existing account code",
    method: "PATCH",
    path: `${basePath}/:accountCodeOID`,
    body: UpdateAccountCodeZ,
    responses: {
      200: z.string(),
    },
  },

  updateAccountCodes: {
    summary: "Update multiple existing account codes",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of account code to update"),
      UpdateAccountCodeZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated account codes")),
    },
  },

  deleteAccountCode: {
    summary: "Delete an account code",
    method: "DELETE",
    path: `${basePath}/:accountCodeOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteAccountCodes: {
    summary: "Delete multiple account codes",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      accountCodeOIDs: z.array(z.string().describe("OIDs of account codes to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  syncFromXero: {
    summary: "Sync account codes from Xero",
    method: "POST",
    path: `${basePath}/sync-from-xero`,
    body: z.object({
      tenantOID: z.string(),
    }),
    responses: {
      200: z.object({
        imported: z.number(),
        updated: z.number(),
        failed: z.number(),
      }),
    },
  },

  getDefaultAccountCodes: {
    summary: "Get default account codes for tenant",
    method: "GET",
    path: `${basePath}/defaults`,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        revenueAccountCodeOID: z.string().optional(),
        expenseAccountCodeOID: z.string().optional(),
        assetAccountCodeOID: z.string().optional(),
        liabilityAccountCodeOID: z.string().optional(),
      }),
    },
  },

  updateDefaultAccountCodes: {
    summary: "Update default account codes for tenant",
    method: "POST",
    path: `${basePath}/defaults`,
    body: z.object({
      tenantOID: z.string(),
      revenueAccountCodeOID: z.string().optional(),
      expenseAccountCodeOID: z.string().optional(),
      assetAccountCodeOID: z.string().optional(),
      liabilityAccountCodeOID: z.string().optional(),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
