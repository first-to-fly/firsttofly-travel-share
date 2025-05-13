// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { TourTransactionZ } from "../../entities/Operations/TourTransaction";
import { TourTransactionPaxZ } from "../../entities/Operations/TourTransactionPax";
import { TourTransactionRoomZ } from "../../entities/Operations/TourTransactionRoom";


const basePath = "/api/tour-transactions";

// --- TourTransaction Schemas ---
const CreateTourTransactionBodyZ = TourTransactionZ.pick({
  tenantOID: true,
  bookingReference: true,
  // totalAmount: true, // Removed - Server-calculated
  snapshot: true, // Snapshot is kept, server can use this to calculate totalAmount
  paymentStatus: true,
  bookingStatus: true,
  // receivedAmount: true, // Server-managed
  discounts: true, // Allowed via API
  addOns: true, // Allowed via API
  transportType: true,
  metadata: true,
}).extend({
  productOID: EntityOIDZ,
  tourDepartureOID: EntityOIDZ,
  costingOID: EntityOIDZ,
  productPricingOID: EntityOIDZ,
});
export type CreateTourTransactionBody = z.infer<typeof CreateTourTransactionBodyZ>;

const UpdateTourTransactionBodyZ = CreateTourTransactionBodyZ.omit({
  tenantOID: true,
  productOID: true,
  tourDepartureOID: true,
  costingOID: true,
  productPricingOID: true,
}).partial();
export type UpdateTourTransactionBody = z.infer<typeof UpdateTourTransactionBodyZ>;

// --- TourTransactionRoom Schemas ---
const CreateTourTransactionRoomBodyZ = TourTransactionRoomZ.pick({
  bookingId: true,
  roomConfigurationRuleId: true,
  status: true,
  roomNumber: true,
  isDbl: true,
  notes: true,
}).extend({
  bookingOID: EntityOIDZ, // To link to the parent transaction
  roomConfigurationRuleOID: EntityOIDZ,
});
export type CreateTourTransactionRoomBody = z.infer<typeof CreateTourTransactionRoomBodyZ>;

const UpdateTourTransactionRoomBodyZ = CreateTourTransactionRoomBodyZ.omit({
  bookingOID: true,
  roomConfigurationRuleOID: true,
  bookingId: true,
  roomConfigurationRuleId: true,
}).partial();
export type UpdateTourTransactionRoomBody = z.infer<typeof UpdateTourTransactionRoomBodyZ>;

// --- TourTransactionPax Schemas ---
const CreateTourTransactionPaxBodyZ = TourTransactionPaxZ.pick({
  // bookingId: true, // Removed, link is via bookingRoomId
  bookingRoomId: true,
  type: true,
  isLandTourOnly: true,
  personalDetails: true,
  mealPreference: true,
  transportRecordId: true,
}).extend({
  // bookingOID: EntityOIDZ, // Removed, parent transaction context comes from the endpoint path
  bookingRoomOID: EntityOIDZ, // This should be mandatory to link to a specific room. Optionality removed.
});
export type CreateTourTransactionPaxBody = z.infer<typeof CreateTourTransactionPaxBodyZ>;

const UpdateTourTransactionPaxBodyZ = CreateTourTransactionPaxBodyZ.omit({
  // bookingOID: true, // Removed
  // bookingId: true, // Removed
  // bookingRoomId cannot be omitted if it's the primary link and potentially updatable (e.g. moving pax)
  // However, for a partial update, specific fields are updated.
  // If bookingRoomId is part of the .pick(), it can be updated.
  // Let's assume for now that if bookingRoomId is in the pick, it's fine.
  // If it's not meant to be updatable here, it should be omitted from the pick in Update, or handled by a dedicated "move pax" endpoint.
}).partial(); // .partial() makes all fields optional for update
export type UpdateTourTransactionPaxBody = z.infer<typeof UpdateTourTransactionPaxBodyZ>;


export const tourTransactionContract = initContract().router({
  // == TourTransaction Endpoints ==
  getTourTransactions: {
    summary: "Get tour transactions",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: EntityOIDZ,
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(EntityOIDZ),
      }),
    },
  },
  createTourTransaction: {
    summary: "Create a new tour transaction",
    method: "POST",
    path: basePath,
    body: CreateTourTransactionBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  updateTourTransactions: { // This was batch update, consider single update endpoint too
    summary: "Update multiple existing tour transactions",
    method: "POST", // Should probably be PUT for single or PATCH for partial batch
    path: `${basePath}/batch-update`,
    body: z.record(
      EntityOIDZ.describe("OID of TourTransaction to update"),
      UpdateTourTransactionBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated TourTransactions")),
    },
  },
  // Example for single update:
  updateTourTransaction: {
    summary: "Update a specific tour transaction",
    method: "PUT",
    path: `${basePath}/:bookingOID`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: UpdateTourTransactionBodyZ,
    responses: {
      200: EntityOIDZ,
    },
  },
  deleteTourTransactions: {
    summary: "Delete multiple tour transactions",
    method: "POST", // Should be DELETE for single, or POST for batch with specific body
    path: `${basePath}/batch-delete`,
    body: z.object({
      tourTransactionOIDs: z.array(EntityOIDZ.describe("OIDs of TourTransactions to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // Example for single delete:
  deleteTourTransaction: {
    summary: "Delete a specific tour transaction",
    method: "DELETE",
    path: `${basePath}/:bookingOID`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  // == TourTransactionRoom Endpoints (nested under a transaction) ==
  getRoomsForTransaction: {
    summary: "Get all rooms for a specific tour transaction",
    method: "GET",
    path: `${basePath}/:bookingOID/rooms`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(TourTransactionRoomZ),
    },
  },
  addRoomToTransaction: {
    summary: "Add a new room to a tour transaction",
    method: "POST",
    path: `${basePath}/:bookingOID/rooms`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateTourTransactionRoomBodyZ.omit({
      bookingOID: true,
      bookingId: true,
    }),
    responses: {
      201: EntityOIDZ,
    },
  },
  updateRoomInTransaction: {
    summary: "Update a specific room in a tour transaction",
    method: "PUT",
    path: `${basePath}/:bookingOID/rooms/:roomOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      roomOID: EntityOIDZ,
    }),
    body: UpdateTourTransactionRoomBodyZ,
    responses: {
      200: EntityOIDZ,
    },
  },
  removeRoomFromTransaction: {
    summary: "Remove a room from a tour transaction",
    method: "DELETE",
    path: `${basePath}/:bookingOID/rooms/:roomOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      roomOID: EntityOIDZ,
    }),
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  // == TourTransactionPax Endpoints (nested under a transaction) ==
  // getPaxForTransaction removed
  // addPaxToTransaction removed as Pax should only be added to a Room.
  updatePaxInTransaction: {
    summary: "Update a specific passenger in a tour transaction",
    method: "PUT",
    path: `${basePath}/:bookingOID/pax/:paxOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      paxOID: EntityOIDZ,
    }),
    body: UpdateTourTransactionPaxBodyZ,
    responses: {
      200: EntityOIDZ,
    },
  },
  removePaxFromTransaction: {
    summary: "Remove a passenger from a tour transaction",
    method: "DELETE",
    path: `${basePath}/:bookingOID/pax/:paxOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      paxOID: EntityOIDZ,
    }),
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
