import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { TransportGroupType } from "./transport-group";


export enum TransportSegmentEvents {
  TRANSPORT_SEGMENT_UPDATED = "TRANSPORT_SEGMENT_UPDATED",
  TRANSPORT_SEGMENT_LIST_UPDATED = "TRANSPORT_SEGMENT_LIST_UPDATED",
}

// Base TransportSegment entity with common fields
export const TransportSegmentZ = EntityZ.extend({
  entityType: z.literal(EntityType.TRANSPORT_SEGMENT),
  transportGroupOID: z.string(),
  type: z.nativeEnum(TransportGroupType),
  originLocation: z.string(),
  destinationLocation: z.string(),
  departureDateTime: z.date(),
  arrivalDateTime: z.date(),
  capacity: z.number().nullable(),
});

// Flight specific details
export const FlightSegmentDetailsZ = z.object({
  airline: z.string(),
  flightNumber: z.string(),
  class: z.string(),
});

// Bus specific details
export const BusSegmentDetailsZ = z.object({
  operator: z.string(),
  vehicleType: z.string(),
});

// Cruise specific details
export const CruiseSegmentDetailsZ = z.object({
  shipName: z.string(),
  cabinTypes: z.string(),
  portDetails: z.string(),
});

// Train specific details
export const TrainSegmentDetailsZ = z.object({
  trainNumber: z.string(),
  carriageClass: z.string(),
});

// Ferry specific details
export const FerrySegmentDetailsZ = z.object({
  operator: z.string(),
  vesselName: z.string(),
});

// Combined transport segment with type-specific details
export const TransportSegmentWithDetailsZ = z.discriminatedUnion("type", [
  TransportSegmentZ.extend({
    type: z.literal(TransportGroupType.FLIGHT),
    details: FlightSegmentDetailsZ,
  }),
  TransportSegmentZ.extend({
    type: z.literal(TransportGroupType.BUS),
    details: BusSegmentDetailsZ,
  }),
  TransportSegmentZ.extend({
    type: z.literal(TransportGroupType.CRUISE),
    details: CruiseSegmentDetailsZ,
  }),
  TransportSegmentZ.extend({
    type: z.literal(TransportGroupType.TRAIN),
    details: TrainSegmentDetailsZ,
  }),
  TransportSegmentZ.extend({
    type: z.literal(TransportGroupType.FERRY),
    details: FerrySegmentDetailsZ,
  }),
]);

export type TransportSegment = z.infer<typeof TransportSegmentZ>;
export type FlightSegmentDetails = z.infer<typeof FlightSegmentDetailsZ>;
export type BusSegmentDetails = z.infer<typeof BusSegmentDetailsZ>;
export type CruiseSegmentDetails = z.infer<typeof CruiseSegmentDetailsZ>;
export type TrainSegmentDetails = z.infer<typeof TrainSegmentDetailsZ>;
export type FerrySegmentDetails = z.infer<typeof FerrySegmentDetailsZ>;
export type TransportSegmentWithDetails = z.infer<typeof TransportSegmentWithDetailsZ>;
