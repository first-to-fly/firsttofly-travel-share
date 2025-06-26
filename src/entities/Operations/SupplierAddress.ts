import { z } from "zod";

import { EntityZ } from "../entity";


export enum AddressType {
  BILLING = "billing",
  SHIPPING = "shipping",
  BOTH = "both",
}

export const SupplierAddressZ = EntityZ.extend({
  supplierOID: z.string(),
  addressType: z.nativeEnum(AddressType),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().email().optional(),
  contactPerson: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type SupplierAddress = z.infer<typeof SupplierAddressZ>;

// Legacy interface for backward compatibility
interface BaseEntityColumns {
  createdAt: string;
  updatedAt?: string;
  createdBy: string;
  updatedBy?: string;
}

export interface LegacySupplierAddress extends BaseEntityColumns {
  id: string;
  supplierId: string;
  addressType: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

