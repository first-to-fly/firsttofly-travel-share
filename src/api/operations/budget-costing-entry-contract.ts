import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { PaymentStatus } from "../../entities/Products/GroupTourCosting";
import { FTFSafeMaxNumberZ } from "../../types/number";
import { CreateGroupTourCostingEntryZ } from "../products/group-tour-costing-contract";


export const BudgetEntryEvents = {
  BUDGET_ENTRY_UPDATED: "BUDGET_ENTRY_UPDATED",
  BUDGET_ENTRY_LIST_UPDATED: "BUDGET_ENTRY_LIST_UPDATED",
} as const;

const basePath = "/api/operations/budget-entries";

const CreateBudgetEntryZ = CreateGroupTourCostingEntryZ.extend({
  forexRate: FTFSafeMaxNumberZ({ name: "Forex rate" }),
  localCurrency: z.string(),
  localAmount: FTFSafeMaxNumberZ({ name: "Local amount" }),
  paymentStatus: z.nativeEnum(PaymentStatus),
  paidAmount: FTFSafeMaxNumberZ({ name: "Paid amount" }),
});

const UpdateBudgetEntryZ = CreateBudgetEntryZ.partial();

export type CreateBudgetEntry = z.infer<typeof CreateBudgetEntryZ>;
export type UpdateBudgetEntry = z.infer<typeof UpdateBudgetEntryZ>;

export const budgetEntryContract = initContract().router({
  getBudgetEntries: {
    summary: "Get budget entries",
    method: "GET",
    path: basePath,
    query: z.object({ tenantOID: z.string() }).passthrough(),
    responses: { 200: z.object({ oids: z.array(z.string()) }) },
  },

  createBudgetEntry: {
    summary: "Create a budget entry",
    method: "POST",
    path: `${basePath}`,
    body: CreateBudgetEntryZ,
    responses: { 200: z.string() },
  },

  updateBudgetEntries: {
    summary: "Update multiple budget entries",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateBudgetEntryZ),
    responses: { 200: z.array(z.string()) },
  },

  deleteBudgetEntries: {
    summary: "Delete multiple budget entries",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({ budgetEntryOIDs: z.array(z.string()) }),
    responses: { 200: z.boolean() },
  },
});
