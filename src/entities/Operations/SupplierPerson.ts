import { z } from "zod";

import { EntityZ } from "../entity";


export const ContactInfoZ = z.object({
  linkedin: z.string().optional(),
  skype: z.string().optional(),
  whatsapp: z.string().optional(),
  preferredContactMethod: z.string().optional(),
}).optional();

export const SupplierPersonZ = EntityZ.extend({
  supplierOID: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string().optional(),
  department: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  fax: z.string().optional(),
  position: z.string().optional(),
  isMainContact: z.boolean().default(false),
  isActive: z.boolean().default(true),
  contactInfo: ContactInfoZ,
});

export type SupplierPerson = z.infer<typeof SupplierPersonZ>;
export type ContactInfo = z.infer<typeof ContactInfoZ>;

// Legacy interface for backward compatibility
interface BaseEntityColumns {
  createdAt: string;
  updatedAt?: string;
  createdBy: string;
  updatedBy?: string;
}

export interface LegacySupplierPerson extends BaseEntityColumns {
  id: string;
  supplierId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  position?: string;
  department?: string;
  isPrimary: boolean;
}

