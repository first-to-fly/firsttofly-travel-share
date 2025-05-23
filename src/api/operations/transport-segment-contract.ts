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

// Create a base transport segment schema
const BaseCreateTransportSegmentZ = BaseTransportSegmentZ.pick({
  tenantOID: true,
  transportGroupOID: true,
  type: true,
  originLocation: true,
  destinationLocation: true,
  departureDateTime: true,
  arrivalDateTime: true,
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

// Update schemas
const BaseUpdateTransportSegmentZ = BaseCreateTransportSegmentZ.omit({
  tenantOID: true,
  transportGroupOID: true,
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
});
