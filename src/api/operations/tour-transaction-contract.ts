// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { TourTransactionZ } from "../../entities/Operations/TourTransaction";
import { TourTransactionPaxZ } from "../../entities/Operations/TourTransactionPax";
import { TourTransactionRoomZ } from "../../entities/Operations/TourTransactionRoom";
import {
  TourTransactionTransferZ,
} from "../../entities/Operations/TourTransactionTransfer";


const basePath = "/api/tour-transactions";

// --- TourTransaction Schemas ---
const CreateTourTransactionBodyZ = TourTransactionZ.pick({
  tenantOID: true,
  tourDepartureOID: true,
  bookingReference: true,
  paymentStatus: true,
  bookingStatus: true,
  metadata: true,
});
export type CreateTourTransactionBody = z.infer<typeof CreateTourTransactionBodyZ>;

const UpdateTourTransactionBodyZ = CreateTourTransactionBodyZ.omit({
  tenantOID: true,
  tourDepartureOID: true,
}).partial();
export type UpdateTourTransactionBody = z.infer<typeof UpdateTourTransactionBodyZ>;

// --- TourTransactionRoom Schemas ---
const CreateTourTransactionRoomBodyZ = TourTransactionRoomZ.pick({
  tourTransactionOID: true,
  status: true,
  roomNumber: true,
  isDbl: true,
  notes: true,
  roomConfigurationRuleOID: true,
});
export type CreateTourTransactionRoomBody = z.infer<typeof CreateTourTransactionRoomBodyZ>;

const UpdateTourTransactionRoomBodyZ = CreateTourTransactionRoomBodyZ.omit({
  tourTransactionOID: true,
}).partial();
export type UpdateTourTransactionRoomBody = z.infer<typeof UpdateTourTransactionRoomBodyZ>;

// --- TourTransactionPax Schemas ---
const CreateTourTransactionPaxBodyZ = TourTransactionPaxZ.pick({
  tourTransactionRoomOID: true,
  type: true,
  isLandTourOnly: true,
  personalDetails: true,
  mealPreference: true,
  transportRecordId: true,
  files: true,
});
export type CreateTourTransactionPaxBody = z.infer<typeof CreateTourTransactionPaxBodyZ>;

const UpdateTourTransactionPaxBodyZ = CreateTourTransactionPaxBodyZ.omit({
}).partial();
export type UpdateTourTransactionPaxBody = z.infer<typeof UpdateTourTransactionPaxBodyZ>;

// --- TourTransactionTransfer Schemas ---
const CreateTourTransactionTransferBodyZ = TourTransactionTransferZ.pick({
  tenantOID: true,
  tourTransactionOID: true,
  transferType: true,
  amount: true,
  currencyCode: true,
  transactionReference: true,
  transactionDate: true,
  notes: true,
  metadata: true,
  files: true,
  paymentMethod: true,
});
export type CreateTourTransactionTransferBody = z.infer<typeof CreateTourTransactionTransferBodyZ>;

const UpdateTourTransactionTransferBodyZ = CreateTourTransactionTransferBodyZ.pick({
  files: true,
  notes: true,
  metadata: true,
}).partial();
export type UpdateTourTransactionTransferBody = z.infer<typeof UpdateTourTransactionTransferBodyZ>;


export const tourTransactionContract = initContract().router({
  // #region TRANSACTION
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
  updateTourTransactions: {
    summary: "Update multiple existing tour transactions",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      EntityOIDZ.describe("OID of TourTransaction to update"),
      UpdateTourTransactionBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated TourTransactions")),
    },
  },
  deleteTourTransactions: {
    summary: "Delete multiple tour transactions",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      tourTransactionOIDs: z.array(EntityOIDZ.describe("OIDs of TourTransactions to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  confirmTourTransaction: {
    method: "POST",
    path: `${basePath}/batch-confirm`,
    summary: "Confirm a tour transaction, trigger validation and data snapshotting",
    body: z.object({
      tourTransactionOIDs: z.array(EntityOIDZ.describe("OIDs of TourTransactions to confirm")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region ROOM
  getRoomsForTransaction: {
    summary: "Get all rooms for a specific tour transaction",
    method: "GET",
    path: `${basePath}/:tourTransactionOID/rooms`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of TourTransactionRooms")),
    },
  },
  addRoomToTransaction: {
    summary: "Add a new room to a tour transaction",
    method: "POST",
    path: `${basePath}/:tourTransactionOID/rooms`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    body: CreateTourTransactionRoomBodyZ.omit({
      tourTransactionOID: true,
    }),
    responses: {
      201: EntityOIDZ,
    },
  },
  updateRoomInTransactions: {
    summary: "Update a specific room in a tour transaction",
    method: "PUT",
    path: `${basePath}/:tourTransactionOID/rooms/batch-update`,
    pathParams: z.object({
      tourTransactionOID: EntityOIDZ,
    }),
    body: z.record(
      EntityOIDZ.describe("OID of TourTransactionRoom to update"),
      UpdateTourTransactionRoomBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated TourTransactionRooms")),
    },
  },
  removeRoomFromTransactions: {
    summary: "Remove a room from a tour transaction",
    method: "DELETE",
    path: `${basePath}/:tourTransactionOID/rooms/batch-delete`,
    pathParams: z.object({
      tourTransactionOID: EntityOIDZ,
    }),
    body: z.object({
      tourTransactionRoomOIDs: z.array(EntityOIDZ.describe("OIDs of TourTransactionRooms to remove")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region PAX
  getPaxForTransaction: {
    summary: "Get all passengers for a specific tour transaction",
    method: "GET",
    path: `${basePath}/:tourTransactionOID/pax`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of TourTransactionPax")),
    },
  },
  updatePaxInTransactions: {
    summary: "Update a specific passenger in a tour transaction",
    method: "PUT",
    path: `${basePath}/:tourTransactionOID/pax/batch-update`,
    pathParams: z.object({
      tourTransactionOID: EntityOIDZ,
    }),
    body: z.record(
      EntityOIDZ.describe("OID of TourTransactionPax to update"),
      UpdateTourTransactionPaxBodyZ,
    ),
    responses: {
      200: EntityOIDZ,
    },
  },
  removePaxFromTransactions: {
    summary: "Remove a passenger from a tour transaction",
    method: "DELETE",
    path: `${basePath}/:tourTransactionOID/pax/batch-delete`,
    pathParams: z.object({
      tourTransactionOID: EntityOIDZ,
    }),
    body: z.object({
      tourTransactionPaxOIDs: z.array(EntityOIDZ.describe("OIDs of TourTransactionPax to remove")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region TRANSFER
  createTourTransactionTransfer: {
    summary: "Record a completed financial transfer for a booking",
    method: "POST",
    path: `${basePath}/:tourTransactionOID/transfers`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    body: CreateTourTransactionTransferBodyZ.omit({
      tourTransactionOID: true,
    }),
    responses: {
      200: EntityOIDZ,
    },
  },
  updateTourTransactionTransfers: {
    summary: "Update multiple financial transfers for a tour transaction",
    method: "POST",
    path: `${basePath}/:tourTransactionOID/transfers/batch-update`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    body: z.record(
      EntityOIDZ.describe("OID of TourTransactionTransfer to update"),
      UpdateTourTransactionTransferBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated TourTransactionTransfers")),
    },
  },
  getAllTourTransactionTransfers: {
    summary: "Get all financial transfers in tenants",
    method: "GET",
    path: `${basePath}/transfers`,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({ oids: z.array(EntityOIDZ) }),
    },
  },
  getTourTransactionTransfers: {
    summary: "Get list of financial transfers for a tour transaction",
    method: "GET",
    path: `${basePath}/:tourTransactionOID/transfers`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    responses: {
      200: z.object({ oids: z.array(EntityOIDZ) }),
    },
  },
  // #endregion

});
