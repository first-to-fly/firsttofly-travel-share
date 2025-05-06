import { z } from "zod";

import { DateISOStringZ } from "../../../types/date";
import { EntityZ } from "../../entity";
// Base entity schema

export const SupplierContractTypeEnum = z.enum([
  "inventory",
  "transport",
  "accommodation",
  "meals",
  "other",
]);
export type SupplierContractType = z.infer<typeof SupplierContractTypeEnum>;

export const SupplierContractStatusEnum = z.enum(["active", "inactive", "expired"]);
export type SupplierContractStatus = z.infer<typeof SupplierContractStatusEnum>;

export const ContractFileZ = z.object({
  filename: z.string(),
  url: z.string().url(),
});
export type ContractFile = z.infer<typeof ContractFileZ>;

export const SupplierContractZ = EntityZ.extend({
  // tenantOID is in EntityZ
  supplierProfileId: z.string().uuid(), // Assuming OID of supplier profile
  name: z.string(),
  type: SupplierContractTypeEnum,
  details: z.record(z.any()), // JSONB, schema varies by type
  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,
  status: SupplierContractStatusEnum.default("active"),
  contractFiles: z.array(ContractFileZ).nullable().optional(),
  // createdBy, createdAt, updatedBy, updatedAt, deletedAt are in EntityZ
});

export enum SupplierContractEvents {
  SUPPLIER_CONTRACT_UPDATED = "SUPPLIER_CONTRACT_UPDATED",
  SUPPLIER_CONTRACT_LIST_UPDATED = "SUPPLIER_CONTRACT_LIST_UPDATED",
}

export type SupplierContract = z.infer<typeof SupplierContractZ>;
