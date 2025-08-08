// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export enum IndependentTourBookingAddonType {
  OPTIONAL_SERVICE = "optional_service",
  MANUAL = "manual",
}

export const IndependentTourBookingAddonTypeZ = z.nativeEnum(IndependentTourBookingAddonType);

export const IndependentTourBookingAddonZ = EntityZ.extend({

  independentTourBookingOID: EntityOIDZ,
  
  addonType: IndependentTourBookingAddonTypeZ,
  
  // Reference to optional service or manual entry
  optionalServiceOID: EntityOIDZ.optional(), // Reference to IndependentTourOptionalService
  manualServiceName: z.string().optional(), // For manual entries
  
  description: z.string().optional(),
  serviceDate: z.string(), // ISO date string - when the service will be provided
  
  // Pricing
  unitPrice: z.number(),
  tax: z.number().default(0),
  quantity: z.number().min(1).default(1),
  totalPrice: z.number(),
  
  // Service details
  supplierOID: EntityOIDZ.optional(),
  confirmationNumber: z.string().optional(),
  voucherNumber: z.string().optional(),
  
  // Passenger assignment (optional - some services apply to specific passengers)
  paxOIDs: z.array(EntityOIDZ).optional(),
  
  notes: z.string().optional(),
  
  sortOrder: z.number().optional(),
});

export type IndependentTourBookingAddon = z.infer<typeof IndependentTourBookingAddonZ>;