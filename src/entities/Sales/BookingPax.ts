// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export const BookingPaxPersonalDetailsZ = z.object({
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

export type BookingPaxPersonalDetails = z.infer<typeof BookingPaxPersonalDetailsZ>;

export enum BookingPaxType {
  TWIN = "twin",
  SINGLE = "single",
  TRIPLE = "triple",
  QUAD = "quad",
  CHILD_TWIN = "child_twin",
  CHILD_WITH_BED = "child_with_bed",
  CHILD_NO_BED = "child_no_bed",
  INFANT = "infant",
}

export const BookingPaxTypeZ = z.nativeEnum(BookingPaxType);

export const BookingPaxZ = EntityZ.extend({
  bookingRoomOID: EntityOIDZ,
  type: BookingPaxTypeZ,
  isLandTourOnly: z.boolean().default(false),
  personalDetails: BookingPaxPersonalDetailsZ.optional(),
  mealPreference: z.string().optional(),
  transportRecordOID: EntityOIDZ.optional(),
  documentOIDs: z.array(EntityOIDZ).optional(),
}).omit({
  tenantOID: true,
});

export type BookingPax = z.infer<typeof BookingPaxZ>;

export enum BookingPaxEvents {
  BOOKING_PAX_UPDATED = "BOOKING_PAX_UPDATED",
  BOOKING_PAX_LIST_UPDATED = "BOOKING_PAX_LIST_UPDATED",
}
