import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/xero/reference";

export const ContactSearchZ = z.object({
  text: z.string(),
  page: z.number().default(1),
});
export const ContactCreateZ = z.object({
  name: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const xeroReferenceContract = initContract().router({

  searchContacts: {
    summary: "Search Xero contacts",
    method: "POST",
    path: `${basePath}/contacts/search`,
    body: ContactSearchZ,
    responses: {
      200: z.object({
        items: z.array(z.object({
          contactId: z.string(),
          name: z.string(),
          email: z.string().nullable().optional(),
        })),
        nextPage: z.number().nullable().optional(),
      }),
    },
  },

  createContact: {
    summary: "Create Xero contact",
    method: "POST",
    path: `${basePath}/contacts/create`,
    body: ContactCreateZ,
    responses: { 200: z.object({ contactId: z.string() }) },
  },

  syncAccounts: {
    summary: "Sync accounts from Xero",
    method: "POST",
    path: `${basePath}/accounts/sync`,
    body: z.object({ tenantOID: z.string() }),
    responses: {
      200: z.object({
        imported: z.number(),
        updated: z.number(),
        skipped: z.number().optional(),
      }),
    },
  },

  listAccounts: {
    summary: "List cached accounts",
    method: "GET",
    path: `${basePath}/accounts/list`,
    query: z.object({ tenantOID: z.string() }).passthrough(),
    responses: {
      200: z.object({
        items: z.array(z.object({
          accountCodeId: z.string(),
          code: z.string().optional(),
          name: z.string(),
          type: z.string(),
        })),
      }),
    },
  },

  syncTaxTypes: {
    summary: "Sync tax types from Xero",
    method: "POST",
    path: `${basePath}/tax-types/sync`,
    body: z.object({ tenantOID: z.string() }),
    responses: {
      200: z.object({
        imported: z.number(),
        updated: z.number(),
      }),
    },
  },

  listTaxTypes: {
    summary: "List cached tax types",
    method: "GET",
    path: `${basePath}/tax-types/list`,
    query: z.object({ tenantOID: z.string() }).passthrough(),
    responses: {
      200: z.object({
        items: z.array(z.object({
          code: z.string(),
          name: z.string(),
          rate: z.number(),
        })),
      }),
    },
  },

});
