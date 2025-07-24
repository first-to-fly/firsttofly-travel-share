import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum AddressType {
  BILLING = "billing",
  SHIPPING = "shipping",
  BOTH = "both",
}

export const SupplierAddressZ = EntityZ.extend({
  supplierOID: EntityOIDZ,
  addressType: z.nativeEnum(AddressType),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string(),
});

export type SupplierAddress = z.infer<typeof SupplierAddressZ>;
