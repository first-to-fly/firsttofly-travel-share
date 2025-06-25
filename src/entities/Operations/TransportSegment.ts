import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";
import { TransportType } from "./TransportGroup";


export enum FlightStatus {
  SCHEDULED = "scheduled",
  ACTIVE = "active",
  LANDED = "landed",
  CANCELLED = "cancelled",
  INCIDENT = "incident",
  DIVERTED = "diverted",
}

export const FlightInfoZ = z.object({
  flightDate: z.string(),
  flightStatus: z.nativeEnum(FlightStatus),
  departure: z.object({
    airport: z.string(),
    timezone: z.string(),
    iata: z.string(),
    icao: z.string(),
    terminal: z.string().nullable(),
    gate: z.string().nullable(),
    delay: z.number().nullable(),
    scheduled: z.string(),
    estimated: z.string(),
    actual: z.string().nullable(),
    estimatedRunway: z.string().nullable(),
    actualRunway: z.string().nullable(),
  }),
  arrival: z.object({
    airport: z.string(),
    timezone: z.string(),
    iata: z.string(),
    icao: z.string(),
    terminal: z.string().nullable(),
    gate: z.string().nullable(),
    baggage: z.string().nullable(),
    delay: z.number().nullable(),
    scheduled: z.string(),
    estimated: z.string(),
    actual: z.string().nullable(),
    estimatedRunway: z.string().nullable(),
    actualRunway: z.string().nullable(),
  }),
  airline: z.object({
    name: z.string(),
    iata: z.string(),
    icao: z.string(),
  }),
  flight: z.object({
    number: z.string(),
    iata: z.string(),
    icao: z.string(),
    codeshared: z.object({
      airlineName: z.string(),
      airlineIata: z.string(),
      airlineIcao: z.string(),
      flightNumber: z.string(),
      flightIata: z.string(),
      flightIcao: z.string(),
    }).nullable(),
  }),
  aircraft: z.object({
    registration: z.string().nullable(),
    iata: z.string().nullable(),
    icao: z.string().nullable(),
    icao24: z.string().nullable(),
  }).nullable(),
  live: z.object({
    updated: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    altitude: z.number().nullable(),
    direction: z.number().nullable(),
    speedHorizontal: z.number().nullable(),
    speedVertical: z.number().nullable(),
    isGround: z.boolean().nullable(),
  }).nullable(),
});

export enum TransportSegmentEvents {
  TRANSPORT_SEGMENT_UPDATED = "TRANSPORT_SEGMENT_UPDATED",
  TRANSPORT_SEGMENT_LIST_UPDATED = "TRANSPORT_SEGMENT_LIST_UPDATED",
}

// Base TransportSegment entity with common fields
export const BaseTransportSegmentZ = EntityZ.extend({
  entityType: z.literal(EntityType.TRANSPORT_SEGMENT),

  type: z.nativeEnum(TransportType),

  originLocation: z.string(),
  destinationLocation: z.string(),
  originTimezone: z.string(),
  destinationTimezone: z.string(),

  // Actual mode fields
  departureDateTime: DateISOStringZ.optional(),
  arrivalDateTime: DateISOStringZ.optional(),
  seatCapacity: z.number().int().positive().optional(),

  // Planning mode fields
  isPlanning: z.boolean().default(false).optional(),
  plannedDepartureTime: z.string().optional().refine((val) => val === "" || val === null || val === undefined || /^\d{2}:\d{2}$/.test(val), {
    message: "Planned departure time must be in 'HH:MM' format",
  }),
  plannedArrivalTime: z.string().optional().refine((val) => val === "" || val === null || val === undefined || /^\d{2}:\d{2}$/.test(val), {
    message: "Planned arrival time must be in 'HH:MM' format",
  }),
});

// Flight specific details
export const FlightSegmentDetailsZ = z.object({
  flightNumber: z.string(),
  class: z.string(),
  departureDate: DateISOStringZ,
  flightInfo: FlightInfoZ.optional(),
  flightInfoUpdatedAt: DateISOStringZ.optional(),
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
