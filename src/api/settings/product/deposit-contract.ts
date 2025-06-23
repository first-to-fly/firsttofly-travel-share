import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DepositZ } from "../../../entities/Settings/Product/Deposit";


const basePath = "/api/deposits";

const CreateDepositZ = DepositZ.pick({
  tenantOID: true,
  name: true,
  minDeposit: true,
  type: true,
  remarks: true,
  coveredEntityOIDs: true,
  productTypeOIDs: true,
  isActive: true,
});

const UpdateDepositZ = CreateDepositZ.omit({
  tenantOID: true,
}).partial();

export type CreateDeposit = z.infer<typeof CreateDepositZ>;
export type UpdateDeposit = z.infer<typeof UpdateDepositZ>;

export const depositContract = initContract().router({
  getDeposits: {
    summary: "Get deposits",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createDeposit: {
    summary: "Create a new deposit",
    method: "POST",
    path: basePath,
    body: CreateDepositZ,
    responses: {
      200: z.string(),
    },
  },

  updateDeposits: {
    summary: "Update multiple existing deposits",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of deposit to update"),
      UpdateDepositZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated deposits")),
    },
  },

  deleteDeposits: {
    summary: "Delete multiple deposits",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      depositOIDs: z.array(z.string().describe("OIDs of deposits to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
