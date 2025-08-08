// simple-import-sort
import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { BookingRoomStatusZ, BookingRoomStatus } from "./BookingTypes";


export const IndependentTourBookingRoomZ = EntityZ.extend({

  independentTourBookingOID: EntityOIDZ,
  
  roomName: z.string().optional(),
  roomType: z.string(), // e.g., "twin", "single", "triple", "quad"
  roomStatus: BookingRoomStatusZ.default(BookingRoomStatus.REQUESTED),
  
  // Room allocation details
  adultsCount: z.number().min(0).default(0),
  childrenCount: z.number().min(0).default(0),
  infantsCount: z.number().min(0).default(0),
  
  // Room preferences
  bedPreference: z.string().optional(), // e.g., "twin beds", "double bed"
  floorPreference: z.string().optional(),
  viewPreference: z.string().optional(),
  specialRequests: z.array(z.string()).optional(),
  
  // Pricing
  roomPrice: z.number().optional(),
  extraBedPrice: z.number().optional(),
  
  // Confirmation details
  confirmationNumber: z.string().optional(),
  confirmedAt: z.string().optional(), // ISO date string
  
  sortOrder: z.number().optional(),
});

export type IndependentTourBookingRoom = z.infer<typeof IndependentTourBookingRoomZ>;