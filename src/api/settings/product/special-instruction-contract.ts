import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { SpecialInstructionZ } from "../../../entities/Settings/Product/SpecialInstruction";


const basePath = "/api/settings/special-instructions";

const CreateSpecialInstructionZ = SpecialInstructionZ.pick({
  tenantOID: true,

  isPreset: true,
  description: true,

  remarks: true,
  isActive: true,
  isCustomized: true,

  coveredEntityOIDs: true,
  productTypeOIDs: true,
});

const UpdateSpecialInstructionZ = CreateSpecialInstructionZ.omit({
  tenantOID: true,
}).partial();

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
