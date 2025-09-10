import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export const ContactInfoZ = z.object({
  email: z.string().email().nullish(),
  phone: z.string().nullish(),
  fax: z.string().nullish(),
  officePhone: z.string().nullish(),
  isDefault: z.boolean().default(false),
});

export const SupplierPersonZ = EntityZ.extend({
  supplierOID: EntityOIDZ,
  firstName: z.string(),
  lastName: z.string(),
  department: z.string().nullish(),
  position: z.string().nullish(),
  contactInfo: z.array(ContactInfoZ),
});

export type SupplierPerson = z.infer<typeof SupplierPersonZ>;
export type ContactInfo = z.infer<typeof ContactInfoZ>;

export enum SupplierPersonEvents {
  SUPPLIER_PERSON_UPDATED = "SUPPLIER_PERSON_UPDATED",
  SUPPLIER_PERSON_LIST_UPDATED = "SUPPLIER_PERSON_LIST_UPDATED",
}
