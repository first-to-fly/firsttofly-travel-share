import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TransportType } from "../../entities/Operations/TransportGroup";
import {
  BaseTransportSegmentZ,
  BusSegmentDetailsZ,
  CruiseSegmentDetailsZ,
  FerrySegmentDetailsZ,
  FlightSegmentDetailsZ,
  TrainSegmentDetailsZ,
} from "../../entities/Operations/TransportSegment";


const basePath = "/api/operations/transport-segments";

// Create a base transport segment schema for creation (without planning fields)
const BaseCreateTransportSegmentZ = BaseTransportSegmentZ.pick({
  tenantOID: true,
  type: true,
  originLocation: true,
  destinationLocation: true,
  originTimezone: true,
  destinationTimezone: true,

  // Actual mode fields
  departureDateTime: true,
  arrivalDateTime: true,
  seatCapacity: true,

  // Planning mode fields
  isPlanning: true,
  plannedDepartureTime: true,
  plannedArrivalTime: true,

  isActive: true,
});

// Create specialized schemas based on segment type
const CreateFlightSegmentZ = BaseCreateTransportSegmentZ.extend({
  type: z.literal(TransportType.FLIGHT),
  details: FlightSegmentDetailsZ,
});

const CreateBusSegmentZ = BaseCreateTransportSegmentZ.extend({
  type: z.literal(TransportType.BUS),
  details: BusSegmentDetailsZ,
});

const CreateCruiseSegmentZ = BaseCreateTransportSegmentZ.extend({
  type: z.literal(TransportType.CRUISE),
  details: CruiseSegmentDetailsZ,
});

const CreateTrainSegmentZ = BaseCreateTransportSegmentZ.extend({
  type: z.literal(TransportType.TRAIN),
  details: TrainSegmentDetailsZ,
});

const CreateFerrySegmentZ = BaseCreateTransportSegmentZ.extend({
  type: z.literal(TransportType.FERRY),
  details: FerrySegmentDetailsZ,
});

// Create a union of all segment types for the contract
const CreateTransportSegmentZ = z.discriminatedUnion("type", [
  CreateFlightSegmentZ,
  CreateBusSegmentZ,
  CreateCruiseSegmentZ,
  CreateTrainSegmentZ,
  CreateFerrySegmentZ,
]);

// Update schemas - include planning fields here
const BaseUpdateTransportSegmentZ = BaseCreateTransportSegmentZ.omit({
  tenantOID: true,
  isPlanning: true,
}).partial();

const UpdateFlightSegmentZ = BaseUpdateTransportSegmentZ.extend({
  details: FlightSegmentDetailsZ,
}).partial().extend({
  type: z.literal(TransportType.FLIGHT),
});

const UpdateBusSegmentZ = BaseUpdateTransportSegmentZ.extend({
  details: BusSegmentDetailsZ,
}).partial().extend({
  type: z.literal(TransportType.BUS),
});

const UpdateCruiseSegmentZ = BaseUpdateTransportSegmentZ.extend({
  details: CruiseSegmentDetailsZ,
}).partial().extend({
  type: z.literal(TransportType.CRUISE),
});

const UpdateTrainSegmentZ = BaseUpdateTransportSegmentZ.extend({
  details: TrainSegmentDetailsZ,
}).partial().extend({
  type: z.literal(TransportType.TRAIN),
});

const UpdateFerrySegmentZ = BaseUpdateTransportSegmentZ.extend({
  details: FerrySegmentDetailsZ,
}).partial().extend({
  type: z.literal(TransportType.FERRY),
});

// Create a map for update schemas based on segment type
const UpdateTransportSegmentZ = z.discriminatedUnion("type", [
  UpdateFlightSegmentZ,
  UpdateBusSegmentZ,
  UpdateCruiseSegmentZ,
  UpdateTrainSegmentZ,
  UpdateFerrySegmentZ,
]);

export type CreateTransportSegment = z.infer<typeof CreateTransportSegmentZ>;
export type UpdateTransportSegment = z.infer<typeof UpdateTransportSegmentZ>;

export const transportSegmentContract = initContract().router({
  getTransportSegments: {
    summary: "Get transport segments",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
      isPlanning: z.union([z.literal("true"), z.literal("false")]),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createTransportSegment: {
    summary: "Create a new transport segment",
    method: "POST",
    path: basePath,
    body: CreateTransportSegmentZ,
    responses: {
      200: z.string(),
    },
  },

  batchCreateTransportSegments: {
    summary: "Create multiple new transport segments",
    method: "POST",
    path: `${basePath}/batch-create`,
    body: z.array(CreateTransportSegmentZ),
    responses: {
      200: z.array(z.string()),
    },
  },

  updateTransportSegments: {
    summary: "Update multiple existing transport segments",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of transport segment to update"),
      UpdateTransportSegmentZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated transport segments")),
    },
  },

  deleteTransportSegments: {
    summary: "Delete multiple transport segments",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      transportSegmentOIDs: z.array(z.string().describe("OIDs of transport segments to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  assignSegmentToGroups: {
    summary: "Assign transport segment to multiple groups",
    method: "POST",
    path: `${basePath}/assign-to-groups`,
    body: z.object({
      transportSegmentOID: z.string().describe("OID of transport segment to assign"),
      transportGroupOIDs: z.array(z.string().describe("OIDs of transport groups to assign to")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
