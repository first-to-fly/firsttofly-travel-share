// simple-import-sort
import { z } from "zod";

import { EntityZ } from "../entity";


export const TourTransactionPaxPersonalDetailsZ = z.object({
  title: z.string(),
  gender: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  alternativeMobile: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  emergencyContact: z.object({
    name: z.string(),
    phone: z.string(),
    relationship: z.string(),
  }).optional(),
  travelDocuments: z.object({
    visaApplicationRequired: z.boolean(),
    passportNumber: z.string().optional(),
    passportIssueDate: z.string().optional(),
    passportExpiry: z.string().optional(),
  }).optional(),
  specialNeeds: z.object({
    mealRequest: z.string().optional(),
    healthDeclaration: z.string().optional(),
    wheelchairRequired: z.boolean(),
  }).optional(),
  isLeadPassenger: z.boolean().optional(),
});

export type TourTransactionPaxPersonalDetails = z.infer<typeof TourTransactionPaxPersonalDetailsZ>;

export enum TourTransactionPaxType {
  TWIN = "twin",
  SINGLE = "single",
  TRIPLE = "triple",
  QUAD = "quad",
  CHILD_TWIN = "child_twin",
  CHILD_WITH_BED = "child_with_bed",
  CHILD_NO_BED = "child_no_bed",
  INFANT = "infant",
}

export const TourTransactionPaxTypeZ = z.nativeEnum(TourTransactionPaxType);

export const TourTransactionPaxZ = EntityZ.extend({
  tourTransactionRoomOID: z.string(),
  type: TourTransactionPaxTypeZ,
  isLandTourOnly: z.boolean().default(false),
  personalDetails: TourTransactionPaxPersonalDetailsZ.optional(),
  mealPreference: z.string().optional(),
  transportRecordOID: z.string().optional(),
  documentOIDs: z.array(z.string()).optional(),
}).omit({
  tenantOID: true,
});

export type TourTransactionPax = z.infer<typeof TourTransactionPaxZ>;

export enum TourTransactionPaxEvents {
  TOUR_TRANSACTION_PAX_UPDATED = "TOUR_TRANSACTION_PAX_UPDATED",
  TOUR_TRANSACTION_PAX_LIST_UPDATED = "TOUR_TRANSACTION_PAX_LIST_UPDATED",
}
