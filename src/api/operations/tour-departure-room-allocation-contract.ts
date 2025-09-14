import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";


const basePath = "/api/operations/tour-departure-room-allocation";

// Room Assignment Schemas
const RoomAssignmentZ = z.object({
  tourDepartureOID: EntityOIDZ,
  paxOID: EntityOIDZ,
  assignedRoomOID: EntityOIDZ,
  assignedBy: EntityOIDZ,
  notes: z.string().optional(),
});

const CreateRoomAssignmentZ = RoomAssignmentZ.omit({
  // Remove fields that are auto-generated or derived
});

const UpdateRoomAssignmentZ = CreateRoomAssignmentZ.partial();

const RoomAssignmentResponseZ = RoomAssignmentZ.extend({
  id: z.string(),
  tenantOID: EntityOIDZ,
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: EntityOIDZ,
  updatedBy: EntityOIDZ,
});

// Room Adjacency Schemas
const RoomAdjacencyZ = z.object({
  tourDepartureOID: EntityOIDZ,
  roomOneOID: EntityOIDZ,
  roomTwoOID: EntityOIDZ,
  notes: z.string().optional(),
});

const CreateRoomAdjacencyZ = RoomAdjacencyZ.omit({
  // Remove fields that are auto-generated or derived
});

const UpdateRoomAdjacencyZ = CreateRoomAdjacencyZ.partial();

const RoomAdjacencyResponseZ = RoomAdjacencyZ.extend({
  id: z.string(),
  tenantOID: EntityOIDZ,
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: EntityOIDZ,
  updatedBy: EntityOIDZ,
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
export type RoomAssignment = z.infer<typeof RoomAssignmentZ>;
export type CreateRoomAssignment = z.infer<typeof CreateRoomAssignmentZ>;
export type UpdateRoomAssignment = z.infer<typeof UpdateRoomAssignmentZ>;
export type RoomAssignmentResponse = z.infer<typeof RoomAssignmentResponseZ>;

export type RoomAdjacency = z.infer<typeof RoomAdjacencyZ>;
export type CreateRoomAdjacency = z.infer<typeof CreateRoomAdjacencyZ>;
export type UpdateRoomAdjacency = z.infer<typeof UpdateRoomAdjacencyZ>;
export type RoomAdjacencyResponse = z.infer<typeof RoomAdjacencyResponseZ>;

export type BulkAssignPaxToRooms = z.infer<typeof BulkAssignPaxToRoomsZ>;
export type BulkCreateRoomAdjacencies = z.infer<typeof BulkCreateRoomAdjacenciesZ>;
export type BulkDeleteRoomAdjacencies = z.infer<typeof BulkDeleteRoomAdjacenciesZ>;

export type BulkOperationResponse = z.infer<typeof BulkOperationResponseZ>;
