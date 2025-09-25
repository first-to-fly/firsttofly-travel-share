import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { BudgetEntryZ } from "../../entities/Operations/BudgetEntry";


export { BudgetEntryEvents } from "../../entities/Operations/BudgetEntry";


const basePath = "/api/operations/budget-entries";

const CreateBudgetEntryZ = BudgetEntryZ.pick({
  tenantOID: true,
  budgetOID: true,
  supplierOID: true,
  name: true,
  category: true,
  calculationBasis: true,
  applyToPackageType: true,
  applyToOccupancyType: true,
  remarks: true,
  quantityMode: true,
  quantity: true,
  isTieredPrice: true,
  currency: true,
  prices: true,
  originalCostingEntryOID: true,
  originalCostingEntityType: true,
  forexRate: true,
  localCurrency: true,
  localAmount: true,
  paymentStatus: true,
  paidAmount: true,
});

const UpdateBudgetEntryZ = CreateBudgetEntryZ.omit({
  budgetOID: true,
  tenantOID: true,
}).partial();

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
