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
  status: true,
}).partial().extend({
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

  batchStatus: {
    summary: "Update statuses of multiple budgets",
    method: "POST",
    path: `${basePath}/batch-status`,
    body: z.record(
      z.string().describe("OID of budget to update"),
      z.object({ status: z.nativeEnum(BudgetStatus) }),
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated budgets")),
    },
  },
});
