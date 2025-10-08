import { z } from "zod";

import { CountryCodeZ } from "../../validators/countryCode";
import { EntityOIDZ, EntityZ } from "../entity";


export const SupplierAddressZ = EntityZ.extend({
  supplierOID: EntityOIDZ,
  addressLines: z.array(z.string()),
  city: z.string(),
  state: z.string().nullish(),
  postalCode: z.string().nullish(),
  countryCode: CountryCodeZ,
});

export type SupplierAddress = z.infer<typeof SupplierAddressZ>;

export enum SupplierAddressEvents {
  SUPPLIER_ADDRESS_UPDATED = "SUPPLIER_ADDRESS_UPDATED",
  SUPPLIER_ADDRESS_LIST_UPDATED = "SUPPLIER_ADDRESS_LIST_UPDATED",
}
