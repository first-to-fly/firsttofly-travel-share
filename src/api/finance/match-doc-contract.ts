import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { MatchDocCategory, MatchDocStatus, MatchDocZ } from "../../entities/Finance/MatchDoc";


const basePath = "/api/operations/match-docs";

export const CreateMatchDocZ = MatchDocZ.pick({
  tenantOID: true,
  code: true,
  status: true,
  category: true,
  issueDate: true,
  dueDate: true,
  supplierOID: true,
  totalAmount: true,
  currency: true,
  remarks: true,
  documentUrl: true,
  isArchived: true,
  billOID: true,
  billUsedAmount: true,
  currencyRate: true,
  foreignAmount: true,
  localAmount: true,
});

export const UpdateMatchDocZ = CreateMatchDocZ.omit({
  tenantOID: true,
  code: true,
}).partial();

export const MatchDocListParamsZ = z.object({
  tenantOID: z.string(),
  supplierOID: z.string().optional(),
  status: z.nativeEnum(MatchDocStatus).optional(),
  category: z.nativeEnum(MatchDocCategory).optional(),
}).passthrough();

export type CreateMatchDoc = z.infer<typeof CreateMatchDocZ>;
export type UpdateMatchDoc = z.infer<typeof UpdateMatchDocZ>;
export type MatchDocListParams = z.infer<typeof MatchDocListParamsZ>;

export const matchDocContract = initContract().router({
  getMatchDocs: {
    summary: "Get match docs",
    method: "GET",
    path: basePath,
    query: MatchDocListParamsZ,
    responses: { 200: z.object({ oids: z.array(z.string()) }) },
  },

  createMatchDoc: {
    summary: "Create a new match doc",
    method: "POST",
    path: basePath,
    body: CreateMatchDocZ,
    responses: { 200: z.string() },
  },

  updateMatchDoc: {
    summary: "Update a match doc",
    method: "PATCH",
    path: `${basePath}/:matchDocOID`,
    pathParams: z.object({ matchDocOID: z.string() }),
    body: UpdateMatchDocZ,
    responses: { 200: z.string() },
  },

  completeMatchDoc: {
    summary: "Complete a match doc",
    method: "POST",
    path: `${basePath}/:matchDocOID/complete`,
    pathParams: z.object({ matchDocOID: z.string() }),
    body: z.object({}),
    responses: { 200: z.string() },
  },

  voidMatchDoc: {
    summary: "Void a match doc",
    method: "POST",
    path: `${basePath}/:matchDocOID/void`,
    pathParams: z.object({ matchDocOID: z.string() }),
    body: z.object({}),
    responses: { 200: z.string() },
  },

  setAllocations: {
    summary: "Set allocations for a match doc (overwrites existing)",
    method: "POST",
    path: `${basePath}/:matchDocOID/allocations`,
    pathParams: z.object({ matchDocOID: z.string() }),
    body: z.array(z.object({
      budgetEntryId: z.string(),
      amountUsed: z.number().positive(),
      currencyRate: z.number().nullable().optional(),
    })),
    responses: {
      200: z.boolean(),
    },
  },

  updateMatchDocs: {
    summary: "Update multiple match docs",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateMatchDocZ),
    responses: { 200: z.array(z.string()) },
  },

  deleteMatchDocs: {
    summary: "Delete multiple match docs",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({ matchDocOIDs: z.array(z.string()) }),
    responses: { 200: z.boolean() },
  },
});
