// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { TourTransactionZ } from "../../entities/Operations/TourTransaction";
import { TourTransactionPaxZ } from "../../entities/Operations/TourTransactionPax";
import { TourTransactionRoomZ } from "../../entities/Operations/TourTransactionRoom";
import {
  PaymentMethodZ,
  TourTransactionTransferTypeZ,
  TourTransactionTransferZ,
} from "../../entities/Operations/TourTransactionTransfer";


const basePath = "/api/tour-transactions";

// --- TourTransaction Schemas ---
const CreateTourTransactionBodyZ = TourTransactionZ.pick({
  tenantOID: true,
  bookingReference: true,
  paymentStatus: true,
  bookingStatus: true,
  discounts: true,
  addOns: true,
  transportType: true,
  metadata: true,
})
  .extend({
    productOID: EntityOIDZ,
    tourDepartureOID: EntityOIDZ,
    costingOID: EntityOIDZ,
  });
export type CreateTourTransactionBody = z.infer<typeof CreateTourTransactionBodyZ>;

const UpdateTourTransactionBodyZ = CreateTourTransactionBodyZ.omit({
  tenantOID: true,
  productOID: true,
  tourDepartureOID: true,
  costingOID: true,
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
  bookingOID: EntityOIDZ,
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
  bookingRoomId: true,
  type: true,
  isLandTourOnly: true,
  personalDetails: true,
  mealPreference: true,
  transportRecordId: true,
  files: true,
}).extend({
  bookingRoomOID: EntityOIDZ,
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
}).extend({
  paymentMethod: z.enum(["cash", "voucher", "other"]).optional(),
}).required({
  transferType: true,
  amount: true,
  currencyCode: true,
  tenantOID: true,
  tourTransactionOID: true,
});
export type CreateTourTransactionTransferBody = z.infer<typeof CreateTourTransactionTransferBodyZ>;


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
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      tourTransactionOIDs: z.array(EntityOIDZ.describe("OIDs of TourTransactions to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
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
  confirmTourTransaction: {
    method: "POST",
    path: `${basePath}/:bookingOID/confirm`,
    summary: "Confirm a tour transaction, trigger validation and data snapshotting",
    pathParams: z.object({
      bookingOID: EntityOIDZ,
    }),
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

  // == TourTransactionTransfer Endpoints (nested under a transaction) ==
  createTourTransactionTransfer: {
    summary: "Record a completed financial transfer for a booking",
    method: "POST",
    path: `${basePath}/:bookingOID/transfers`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateTourTransactionTransferBodyZ.omit({
      tenantOID: true,
      tourTransactionOID: true,
    }),
    responses: {
      201: EntityOIDZ,
    },
  },
  getTourTransactionTransfers: {
    summary: "Get list of financial transfers for a booking",
    method: "GET",
    path: `${basePath}/:bookingOID/transfers`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    query: z.object({
      limit: z.coerce.number().int().positive().optional(),
      offset: z.coerce.number().int().nonnegative().optional(),
      transferType: TourTransactionTransferTypeZ.optional(),
      paymentMethod: PaymentMethodZ.optional(),
    }).passthrough(),
    responses: {
      200: z.object({ oids: z.array(EntityOIDZ) }),
    },
  },
  getTourTransactionTransferById: {
    summary: "Get details of a specific financial transfer",
    method: "GET",
    path: `${basePath}/:bookingOID/transfers/:transferOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      transferOID: EntityOIDZ,
    }),
    responses: {
      200: EntityOIDZ,
    },
  },
});
