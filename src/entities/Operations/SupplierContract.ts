import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { NamedURLZ } from "../../types/url";
import { EntityOIDZ, EntityZ } from "../entity";


export enum SupplierContractType {
  INVENTORY = "inventory",
  TRANSPORT = "transport",
  ACCOMMODATION = "accommodation",
  MEALS = "meals",
  OTHER = "other",
}

export enum SupplierContractStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  EXPIRED = "expired",
}


export const SupplierContractZ = EntityZ.extend({
  supplierProfileOID: EntityOIDZ,
  name: z.string(),
  type: z.nativeEnum(SupplierContractType),
  details: z.record(z.string(), z.unknown()),
  validityStartDate: DateISOStringZ,
  validityEndDate: DateISOStringZ,
  status: z.nativeEnum(SupplierContractStatus).default(SupplierContractStatus.ACTIVE),
  contractFiles: z.array(NamedURLZ).optional(),
});

export enum SupplierContractEvents {
  SUPPLIER_CONTRACT_UPDATED = "SUPPLIER_CONTRACT_UPDATED",
  SUPPLIER_CONTRACT_LIST_UPDATED = "SUPPLIER_CONTRACT_LIST_UPDATED",
}

export type SupplierContract = z.infer<typeof SupplierContractZ>;

