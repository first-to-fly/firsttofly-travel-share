import { z } from "zod";

import { DateISOStringZ } from "../../../types/date";
import { NamedURLZ } from "../../../types/url";
import { EntityZ } from "../../entity";


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


export const SupplierContractZ = EntityZ.extend({
  supplierProfileId: z.string().uuid(),
  name: z.string(),
  type: SupplierContractTypeEnum,
  details: z.record(z.string(), z.unknown()),
  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,
  status: SupplierContractStatusEnum.default("active"),
  contractFiles: z.array(NamedURLZ).optional(),
});

export enum SupplierContractEvents {
  SUPPLIER_CONTRACT_UPDATED = "SUPPLIER_CONTRACT_UPDATED",
  SUPPLIER_CONTRACT_LIST_UPDATED = "SUPPLIER_CONTRACT_LIST_UPDATED",
}

export type SupplierContract = z.infer<typeof SupplierContractZ>;
