import { z } from "zod";

import { EntityZ } from "../entity";


export enum SupplierProfileType {
  AIRLINE = "airline",
  HOTEL = "hotel",
  CRUISE_LINE = "cruise_line",
  BUS_OPERATOR = "bus_operator",
  TRAIN_OPERATOR = "train_operator",
  FERRY_OPERATOR = "ferry_operator",
  OTHER = "other",
}

export enum SupplierProfileStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const ApiCredentialsZ = z.object({
  endpoint: z.string(),
  key: z.string(),
  type: z.string(),
  secret: z.string(),
});
export type ApiCredentials = z.infer<typeof ApiCredentialsZ>;

export const SupplierProfileZ = EntityZ.extend({
  name: z.string(),
  type: z.nativeEnum(SupplierProfileType),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
  apiCredentials: ApiCredentialsZ.optional(),
  manualContact: z.boolean().default(false),
  communicationInstructions: z.string().optional(),
  status: z.nativeEnum(SupplierProfileStatus).default(SupplierProfileStatus.ACTIVE),
});

export enum SupplierProfileEvents {
  SUPPLIER_PROFILE_UPDATED = "SUPPLIER_PROFILE_UPDATED",
  SUPPLIER_PROFILE_LIST_UPDATED = "SUPPLIER_PROFILE_LIST_UPDATED",
}

export type SupplierProfile = z.infer<typeof SupplierProfileZ>;
