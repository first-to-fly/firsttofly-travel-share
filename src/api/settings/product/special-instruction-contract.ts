import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { SpecialInstructionZ } from "../../../entities/Settings/Product/SpecialInstruction";


const basePath = "/api/settings/special-instructions";

const UpdateSpecialInstructionZ = SpecialInstructionZ.pick({
  isPrepare: true,
  description: true,
  remark: true,
  status: true,
  isCustomized: true,
  offlineOperator: true,
  sectorOIDs: true,
  sectorGroupOIDs: true,
  productOIDs: true,
  participatorOIDs: true,
  personInChargeOIDs: true,
  productTypeOIDs: true,
});

const CreateSpecialInstructionZ = UpdateSpecialInstructionZ.extend({
  tenantOID: z.string(),
});

export type UpdateSpecialInstruction = z.infer<typeof UpdateSpecialInstructionZ>;
export type CreateSpecialInstruction = z.infer<typeof CreateSpecialInstructionZ>;

export const specialInstructionContract = initContract().router({
  getSpecialInstructions: {
    summary: "Get special instructions",
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

  createSpecialInstruction: {
    summary: "Create a new special instruction",
    method: "POST",
    path: basePath,
    body: CreateSpecialInstructionZ,
    responses: {
      200: z.string(),
    },
  },

  updateSpecialInstruction: {
    summary: "Update an existing special instruction",
    method: "PATCH",
    path: `${basePath}/:specialInstructionOID`,
    body: UpdateSpecialInstructionZ,
    responses: {
      200: z.string(),
    },
  },

  updateSpecialInstructions: {
    summary: "Update multiple existing special instructions",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of special instruction to update"),
      UpdateSpecialInstructionZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated special instructions")),
    },
  },

  deleteSpecialInstruction: {
    summary: "Delete a special instruction",
    method: "DELETE",
    path: `${basePath}/:specialInstructionOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteSpecialInstructions: {
    summary: "Delete multiple special instructions",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      specialInstructionOIDs: z.array(z.string().describe("OIDs of special instructions to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});