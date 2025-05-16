import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { BudgetStatus, BudgetZ } from "../../entities/Operations/Budget";


const basePath = "/api/operations/budgets";

const CreateBudgetZ = BudgetZ.pick({
  tenantOID: true,
  tourDepartureOID: true,
  status: true,
  materializationRate: true,
  remarks: true,
  isArchived: true,
});

const UpdateBudgetZ = CreateBudgetZ.omit({
  tenantOID: true,
  tourDepartureOID: true,
}).partial().extend({
  status: z.nativeEnum(BudgetStatus).optional(),
  remarks: z.string().optional(),
  isArchived: z.boolean().optional(),
});

export type CreateBudget = z.infer<typeof CreateBudgetZ>;
export type UpdateBudget = z.infer<typeof UpdateBudgetZ>;

export const budgetContract = initContract().router({
  getBudgets: {
    summary: "Get budgets",
    method: "GET",
    path: basePath,
    query: z.object({ tenantOID: z.string() }).passthrough(),
    responses: { 200: z.object({ oids: z.array(z.string()) }) },
  },

  batchUpdateBudgets: {
    summary: "Update multiple budgets",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateBudgetZ),
    responses: { 200: z.array(z.string()) },
  },

  completeBudget: {
    summary: "Complete a budget",
    method: "POST",
    path: `${basePath}/complete`,
    body: z.object({
      budgetOID: z.string(),
      remarks: z.string().optional(),
    }),
    responses: { 200: z.boolean() },
  },

  revertBudgetToDraft: {
    summary: "Revert a budget to draft",
    method: "POST",
    path: `${basePath}/revert`,
    body: z.object({ budgetOID: z.string() }),
    responses: { 200: z.boolean() },
  },
});
