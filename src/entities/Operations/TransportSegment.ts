import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { TransportType } from "./TransportGroup";


export enum TransportSegmentEvents {
  TRANSPORT_SEGMENT_UPDATED = "TRANSPORT_SEGMENT_UPDATED",
  TRANSPORT_SEGMENT_LIST_UPDATED = "TRANSPORT_SEGMENT_LIST_UPDATED",
}

// Base TransportSegment entity with common fields
export const BaseTransportSegmentZ = EntityZ.extend({
  entityType: z.literal(EntityType.TRANSPORT_SEGMENT),

  transportGroupOID: z.string(),
  type: z.nativeEnum(TransportType),

  originLocation: z.string(),
  destinationLocation: z.string(),

  departureDateTime: DateISOStringZ,
  arrivalDateTime: DateISOStringZ,
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
export const TransportSegmentZ = z.discriminatedUnion("type", [
  BaseTransportSegmentZ.extend({
    type: z.literal(TransportType.FLIGHT),
    details: FlightSegmentDetailsZ,
  }),
  BaseTransportSegmentZ.extend({
    type: z.literal(TransportType.BUS),
    details: BusSegmentDetailsZ,
  }),
  BaseTransportSegmentZ.extend({
    type: z.literal(TransportType.CRUISE),
    details: CruiseSegmentDetailsZ,
  }),
  BaseTransportSegmentZ.extend({
    type: z.literal(TransportType.TRAIN),
    details: TrainSegmentDetailsZ,
  }),
  BaseTransportSegmentZ.extend({
    type: z.literal(TransportType.FERRY),
    details: FerrySegmentDetailsZ,
  }),
]);

export type TransportSegment = z.infer<typeof TransportSegmentZ>;
export type FlightSegmentDetails = z.infer<typeof FlightSegmentDetailsZ>;
export type BusSegmentDetails = z.infer<typeof BusSegmentDetailsZ>;
export type CruiseSegmentDetails = z.infer<typeof CruiseSegmentDetailsZ>;
export type TrainSegmentDetails = z.infer<typeof TrainSegmentDetailsZ>;
export type FerrySegmentDetails = z.infer<typeof FerrySegmentDetailsZ>;
