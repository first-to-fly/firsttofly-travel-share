import { z } from "zod";

import { EntityZ } from "../entity";


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
  uenNo: z.string().optional(),
  gstNo: z.string().optional(),
  iataCode: z.string().optional(),
  icon: z.string().optional(),
  bsp: z.boolean().optional(),
});
export type SupplierInfo = z.infer<typeof SupplierInfoZ>;

export const SupplierZ = EntityZ.extend({
  name: z.string().default(""),
  code: z.string().default(""),
  type: z.nativeEnum(SupplierType).optional(),
  category: z.nativeEnum(SupplierCategory).optional(),
  status: z.nativeEnum(SupplierStatus).default(SupplierStatus.PENDING),
  shortName: z.string().default(""),
  partnerType: z.nativeEnum(SupplierPartnerType).optional(),
  countries: z.array(z.string()).optional(),
  supplierInfo: SupplierInfoZ.optional(),
  personInChargeOID: z.string().optional(),
  parentOID: z.string().optional(),
  newOID: z.string().optional(),
  remarks: z.string().optional(),
  inactiveRemarks: z.string().optional(),
  mainSupplierPaymentOID: z.string().optional(),
  mainSupplierAddressOID: z.string().optional(),
  paymentTerms: z.number().default(0),
  paymentCreditLimit: z.number().default(0),
});

export enum SupplierEvents {
  SUPPLIER_UPDATED = "SUPPLIER_UPDATED",
  SUPPLIER_LIST_UPDATED = "SUPPLIER_LIST_UPDATED",
}

export type Supplier = z.infer<typeof SupplierZ>;