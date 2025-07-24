import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export const SupplierAddressZ = EntityZ.extend({
  supplierOID: EntityOIDZ,
  addressLines: z.array(z.string()),
  city: z.string(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string(),
});

export type SupplierAddress = z.infer<typeof SupplierAddressZ>;
