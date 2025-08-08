// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { BookingPaxTypeZ, BookingPaxPersonalDetailsZ } from "./BookingTypes";


export const IndependentTourBookingPaxZ = EntityZ.extend({

  independentTourBookingRoomOID: EntityOIDZ,
  
  paxType: BookingPaxTypeZ,
  personalDetails: BookingPaxPersonalDetailsZ,
  
  // Document references
  documentOIDs: z.array(EntityOIDZ).optional(),
  
  // Additional information
  ageAtTravel: z.number().optional(),
  dietaryRequirements: z.array(z.string()).optional(),
  medicalConditions: z.array(z.string()).optional(),
  
  // Insurance information  
  insurancePolicyNumber: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insuranceValidUntil: z.string().optional(), // ISO date string
  
  // Transport preferences (for optional transport services)
  transportRecordOID: EntityOIDZ.optional(),
  seatPreference: z.string().optional(),
  
  sortOrder: z.number().optional(),
});

export type IndependentTourBookingPax = z.infer<typeof IndependentTourBookingPaxZ>;