// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export const GroupTourBookingPaxPersonalDetailsZ = z.object({
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

export type GroupTourBookingPaxPersonalDetails = z.infer<typeof GroupTourBookingPaxPersonalDetailsZ>;

export enum GroupTourBookingPaxType {
  TWIN = "twin",
  SINGLE = "single",
  TRIPLE = "triple",
  QUAD = "quad",
  CHILD_TWIN = "child_twin",
  CHILD_WITH_BED = "child_with_bed",
  CHILD_NO_BED = "child_no_bed",
  INFANT = "infant",
}

export const GroupTourBookingPaxTypeZ = z.nativeEnum(GroupTourBookingPaxType);

export const GroupTourBookingPaxZ = EntityZ.extend({
  bookingRoomOID: EntityOIDZ,
  type: GroupTourBookingPaxTypeZ,
  isLandTourOnly: z.boolean().default(false),
  personalDetails: GroupTourBookingPaxPersonalDetailsZ.optional(),
  mealPreference: z.string().optional(),
  transportRecordOID: EntityOIDZ.optional(),
  documentOIDs: z.array(EntityOIDZ).optional(),
}).omit({
  tenantOID: true,
});

export type GroupTourBookingPax = z.infer<typeof GroupTourBookingPaxZ>;

export enum GroupTourBookingPaxEvents {
  GROUP_TOUR_BOOKING_PAX_UPDATED = "GROUP_TOUR_BOOKING_PAX_UPDATED",
  GROUP_TOUR_BOOKING_PAX_LIST_UPDATED = "GROUP_TOUR_BOOKING_PAX_LIST_UPDATED",
}
