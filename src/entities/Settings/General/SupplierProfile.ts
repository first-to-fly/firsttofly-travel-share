import { z } from "zod";

import { EntityZ } from "../../entity";


export const SupplierProfileTypeEnum = z.enum([
  "airline",
  "hotel",
  "cruise_line",
  "bus_operator",
  "train_operator",
  "ferry_operator",
  "other",
]);
export type SupplierProfileType = z.infer<typeof SupplierProfileTypeEnum>;

export const SupplierProfileStatusEnum = z.enum(["active", "inactive"]);
export type SupplierProfileStatus = z.infer<typeof SupplierProfileStatusEnum>;

export const ApiCredentialsZ = z.object({
  endpoint: z.string(),
  key: z.string(),
  type: z.string(), // e.g., 'amadeus', 'sabre', 'custom_rest_v1'
  secret: z.string(),
});
export type ApiCredentials = z.infer<typeof ApiCredentialsZ>;

export const SupplierProfileZ = EntityZ.extend({
  // tenantId is tenantOID in EntityZ, name is not in EntityZ by default
  // oid, entityType, createdBy, createdAt etc. are already in EntityZ
  name: z.string(), // Add name as it's specific to SupplierProfile
  type: SupplierProfileTypeEnum,
  contactEmail: z.string().email().nullable().optional(),
  contactPhone: z.string().nullable().optional(),
  contactAddress: z.string().nullable().optional(),
  apiCredentials: ApiCredentialsZ.nullable().optional(),
  manualContact: z.boolean().default(false),
  communicationInstructions: z.string().nullable().optional(),
  status: SupplierProfileStatusEnum.default("active"),
  // tenantOID is already in EntityZ. We need to ensure it's not duplicated or make sure it aligns.
  // For now, assuming EntityZ's tenantOID is sufficient.
  // If SupplierProfile needs its own tenantId distinct from EntityZ's tenantOID, this needs clarification.
  // Based on typical structure, EntityZ.tenantOID should be the one.
});

export enum SupplierProfileEvents {
  SUPPLIER_PROFILE_UPDATED = "SUPPLIER_PROFILE_UPDATED",
  SUPPLIER_PROFILE_LIST_UPDATED = "SUPPLIER_PROFILE_LIST_UPDATED",
}

export type SupplierProfile = z.infer<typeof SupplierProfileZ>;
