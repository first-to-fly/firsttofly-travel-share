import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum SupplierPartnerType {
  LONG_TERM = "long_term",
  AD_HOC = "ad_hoc",
}

export enum SupplierType {
  TRADE = "trade",
  MISC = "misc",
}

export enum SupplierCategory {
  AIRLINE = "airline",
  OTA = "ota",
  LAND_OPERATOR = "land_operator",
  SYSTEM_VENDOR = "system_vender",
  PRINTING = "printing",
  TICKETING = "ticketing",
  OTHER = "other",
}

export enum SupplierStatus {
  PENDING = "pending",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const SupplierInfoZ = z.object({
  uenNo: z.string().nullish(),
  gstNo: z.string().nullish(),
  iataCode: z.string().nullish(),
  icon: z.string().nullish(),
  bsp: z.boolean().nullish(),
});
export type SupplierInfo = z.infer<typeof SupplierInfoZ>;

export const SupplierZ = EntityZ.extend({
  name: z.string().default(""),
  code: z.string().default(""),
  type: z.nativeEnum(SupplierType).nullish(),
  category: z.nativeEnum(SupplierCategory).nullish(),
  status: z.nativeEnum(SupplierStatus).default(SupplierStatus.PENDING),
  shortName: z.string().default(""),
  partnerType: z.nativeEnum(SupplierPartnerType).nullish(),
  countries: z.array(z.string()).nullish(),
  supplierInfo: SupplierInfoZ.nullish(),
  personInChargeOID: EntityOIDZ.nullish(),
  parentOID: EntityOIDZ.nullish(),
  newOID: EntityOIDZ.nullish(),
  remarks: z.string().nullish(),
  inactiveRemarks: z.string().nullish(),
  mainSupplierPaymentOID: EntityOIDZ.nullish(),
  mainSupplierAddressOID: EntityOIDZ.nullish(),
  paymentTerms: z.number().default(0),
  paymentCreditLimit: z.number().default(0),
});

export enum SupplierEvents {
  SUPPLIER_UPDATED = "SUPPLIER_UPDATED",
  SUPPLIER_LIST_UPDATED = "SUPPLIER_LIST_UPDATED",
}

export type Supplier = z.infer<typeof SupplierZ>;

