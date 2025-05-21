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

const CreateBudgetCostingEntryZ = CreateGroupTourCostingEntryZ.extend({
  groupTourCostingOID: z.string(),
  forexRate: FTFSafeMaxNumberZ({ name: "Forex rate" }),
  localCurrency: z.string(),
  localAmount: FTFSafeMaxNumberZ({ name: "Local amount" }),
  paymentStatus: z.nativeEnum(PaymentStatus),
  paidAmount: FTFSafeMaxNumberZ({ name: "Paid amount" }),
});

const UpdateBudgetCostingEntryZ = CreateBudgetCostingEntryZ.omit({
  groupTourCostingOID: true,
}).partial();

export type CreateBudgetCostingEntry = z.infer<typeof CreateBudgetCostingEntryZ>;
export type UpdateBudgetCostingEntry = z.infer<typeof UpdateBudgetCostingEntryZ>;

export const budgetCostingEntryContract = initContract().router({
  getBudgetEntries: {
    summary: "Get budget entries",
    method: "GET",
    path: basePath,
    query: z.object({ tenantOID: z.string() }).passthrough(),
    responses: { 200: z.object({ oids: z.array(z.string()) }) },
  },

  createBudgetCostingEntry: {
    summary: "Create a budget costing entry",
    method: "POST",
    path: `${basePath}`,
    body: CreateBudgetCostingEntryZ,
    responses: { 200: z.string() },
  },

  updateBudgetCostingEntries: {
    summary: "Update multiple budget costing entries",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateBudgetCostingEntryZ),
    responses: { 200: z.array(z.string()) },
  },

  deleteBudgetCostingEntries: {
    summary: "Delete multiple budget costing entries",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({ budgetCostingEntryOIDs: z.array(z.string()) }),
    responses: { 200: z.boolean() },
  },
});
