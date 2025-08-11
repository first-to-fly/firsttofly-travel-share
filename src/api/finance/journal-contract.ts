import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { JournalZ } from "../../entities/Finance/Journal";


const basePath = "/api/finance/journals";

const CreateJournalZ = JournalZ.pick({
  tenantOID: true,
  ref: true,
  fromEntityOID: true,
  toEntityOID: true,
  amount: true,
  isVoided: true,
  description: true,
  transactionDate: true,
});

const UpdateJournalZ = CreateJournalZ.omit({
  tenantOID: true,
  ref: true,
}).partial();

const JournalListParamsZ = z.object({
  tenantOID: z.string(),
  fromEntityOID: z.string().optional(),
  toEntityOID: z.string().optional(),
  isVoided: z.boolean().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
}).passthrough();

export type CreateJournal = z.infer<typeof CreateJournalZ>;
export type UpdateJournal = z.infer<typeof UpdateJournalZ>;
export type JournalListParams = z.infer<typeof JournalListParamsZ>;

export const journalContract = initContract().router({

  getJournals: {
    summary: "Get journals",
    method: "GET",
    path: basePath,
    query: JournalListParamsZ,
    responses: { 200: z.object({ oids: z.array(z.string()) }) },
  },

  createJournal: {
    summary: "Create a new journal",
    method: "POST",
    path: basePath,
    body: CreateJournalZ,
    responses: { 200: z.string() },
  },

  batchUpdateJournals: {
    summary: "Update multiple journals",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateJournalZ),
    responses: { 200: z.array(z.string()) },
  },

  batchDeleteJournals: {
    summary: "Delete multiple journals",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      journalOIDs: z.array(z.string().describe("OIDs of journals to delete")),
    }),
    responses: { 200: z.boolean() },
  },

  reverseJournal: {
    summary: "Reverse a journal entry",
    method: "POST",
    path: `${basePath}/:journalOID/reverse`,
    pathParams: z.object({ journalOID: z.string() }),
    body: z.object({
      description: z.string().optional(),
    }),
    responses: { 200: z.string() },
  },

  voidJournal: {
    summary: "Void a journal entry",
    method: "POST",
    path: `${basePath}/:journalOID/void`,
    pathParams: z.object({ journalOID: z.string() }),
    body: z.object({
      reason: z.string().optional(),
    }),
    responses: { 200: z.boolean() },
  },

  getJournalSummary: {
    summary: "Get journal summary by account",
    method: "GET",
    path: `${basePath}/summary`,
    query: z.object({
      tenantOID: z.string(),
      fromDate: z.string().optional(),
      toDate: z.string().optional(),
      groupBy: z.enum(["account", "entity"]).optional(),
    }),
    responses: {
      200: z.object({
        summary: z.array(z.object({
          entityOID: z.string(),
          totalDebit: z.number(),
          totalCredit: z.number(),
          balance: z.number(),
        })),
      }),
    },
  },

});
