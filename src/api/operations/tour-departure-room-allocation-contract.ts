import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";


const basePath = "/api/operations/tour-departure-room-allocation";

// Room Assignment Schemas
const CreateRoomAssignmentZ = z.object({
  tourDepartureOID: EntityOIDZ,
  paxOID: EntityOIDZ,
  assignedRoomOID: EntityOIDZ,
  assignedBy: EntityOIDZ,
  notes: z.string().optional(),
});

// Room Adjacency Schemas
const CreateRoomAdjacencyZ = z.object({
  tourDepartureOID: EntityOIDZ,
  roomOneOID: EntityOIDZ,
  roomTwoOID: EntityOIDZ,
  notes: z.string().optional(),
});

// Bulk Operation Schemas
const BulkAssignPaxToRoomsZ = z.object({
  tourDepartureOID: EntityOIDZ,
  assignments: z.array(CreateRoomAssignmentZ),
});

const BulkCreateRoomAdjacenciesZ = z.object({
  tourDepartureOID: EntityOIDZ,
  adjacencies: z.array(CreateRoomAdjacencyZ),
});

const BulkDeleteRoomAdjacenciesZ = z.object({
  tourDepartureOID: EntityOIDZ,
  roomPairs: z.array(z.object({
    roomOneOID: EntityOIDZ,
    roomTwoOID: EntityOIDZ,
  })),
});


const BulkOperationResponseZ = z.object({
  success: z.boolean(),
  processedCount: z.number(),
  errors: z.array(z.string()).optional(),
});

export const tourDepartureRoomAllocationContract = initContract().router({
  // Room Assignment endpoints - Bulk operations only
  bulkAssignPaxToRooms: {
    method: "POST",
    path: `${basePath}/assignments/bulk`,
    responses: {
      200: BulkOperationResponseZ,
    },
    body: BulkAssignPaxToRoomsZ,
    summary: "Bulk assign PAX to rooms",
  },

  // Room Adjacency endpoints - Bulk operations only
  bulkCreateRoomAdjacencies: {
    method: "POST",
    path: `${basePath}/adjacencies/bulk`,
    responses: {
      200: BulkOperationResponseZ,
    },
    body: BulkCreateRoomAdjacenciesZ,
    summary: "Bulk create room adjacencies",
  },

  bulkDeleteRoomAdjacencies: {
    method: "DELETE",
    path: `${basePath}/adjacencies/bulk`,
    responses: {
      200: BulkOperationResponseZ,
    },
    body: BulkDeleteRoomAdjacenciesZ,
    summary: "Bulk delete room adjacencies",
  },
});

// Export types
export type BulkAssignPaxToRooms = z.infer<typeof BulkAssignPaxToRoomsZ>;
export type BulkCreateRoomAdjacencies = z.infer<typeof BulkCreateRoomAdjacenciesZ>;
export type BulkDeleteRoomAdjacencies = z.infer<typeof BulkDeleteRoomAdjacenciesZ>;

export type BulkOperationResponse = z.infer<typeof BulkOperationResponseZ>;
