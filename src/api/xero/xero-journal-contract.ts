import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/xero/journals";

export const JournalPreviewZ = z.object({
  stateId: z.string(),
  header: z.object({
    narration: z.string().optional(),
    date: z.string().optional(),
    reference: z.string().optional(),
  }).partial(),
  lines: z.array(z.object({
    accountCode: z.string(),
    description: z.string().optional(),
    amount: z.number(),
  })),
  balanced: z.boolean(),
});

export const BuildJournalStateZ = z.object({
  tenantOID: z.string(),
  journalOIDs: z.array(z.string()).min(1),
  header: z.object({
    narration: z.string().optional(),
    date: z.string().optional(),
    reference: z.string().optional(),
  }).partial().optional(),
});

export const SubmitJournalPostZ = z.object({ stateId: z.string() });
export const SubmitJournalResultZ = z.object({
  success: z.boolean(),
  xeroId: z.string().optional(),
  errors: z.array(z.string()).optional(),
});

export const xeroJournalContract = initContract().router({

  buildState: {
    summary: "Build posting state for selected journals",
    method: "POST",
    path: `${basePath}/state`,
    body: BuildJournalStateZ,
    responses: { 200: z.object({ stateId: z.string() }) },
  },

  preview: {
    summary: "Preview composed manual journal",
    method: "POST",
    path: `${basePath}/preview`,
    body: z.object({ stateId: z.string() }),
    responses: { 200: JournalPreviewZ },
  },

  submit: {
    summary: "Submit manual journal to Xero",
    method: "POST",
    path: `${basePath}/submit`,
    body: SubmitJournalPostZ,
    responses: { 200: SubmitJournalResultZ },
  },

});

export const settlementBasePath = "/api/xero/settlements";

export const xeroSettlementContract = initContract().router({
  buildState: {
    summary: "Build posting state for monthly settlements",
    method: "POST",
    path: `${settlementBasePath}/state`,
    body: z.object({
      tenantOID: z.string(),
      period: z.string(),
    }),
    responses: { 200: z.object({ stateId: z.string() }) },
  },
  preview: {
    summary: "Preview monthly settlement journal",
    method: "POST",
    path: `${settlementBasePath}/preview`,
    body: z.object({ stateId: z.string() }),
    responses: { 200: JournalPreviewZ },
  },
  submit: {
    summary: "Submit monthly settlement to Xero",
    method: "POST",
    path: `${settlementBasePath}/submit`,
    body: SubmitJournalPostZ,
    responses: { 200: SubmitJournalResultZ },
  },
});
