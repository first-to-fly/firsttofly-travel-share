// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { TourTransactionBookingStatus, TourTransactionZ } from "../../entities/Sales/TourTransaction";
import { TourTransactionAddonZ } from "../../entities/Sales/TourTransactionAddon";
import { TourTransactionDiscountType } from "../../entities/Sales/TourTransactionDiscount";
import { TourTransactionPaxZ } from "../../entities/Sales/TourTransactionPax";
import { TourTransactionRoomZ } from "../../entities/Sales/TourTransactionRoom";
import { TourTransactionTransferZ } from "../../entities/Sales/TourTransactionTransfer";


const basePath = "/api/sales/tour-transactions";

// --- TourTransaction Schemas ---
const CreateTourTransactionBodyZ = TourTransactionZ.pick({
  tenantOID: true,
  tourDepartureOID: true,
  departmentOID: true,
  bookingReference: true,
  paymentStatus: true,
  metadata: true,
  specialInstructions: true,
});
export type CreateTourTransactionBody = z.infer<typeof CreateTourTransactionBodyZ>;

const UpdateTourTransactionBodyZ = CreateTourTransactionBodyZ.omit({
  tenantOID: true,
  departmentOID: true,
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

// --- TourTransactionDiscount Schemas ---
const ApplyDiscountBodyZ = z.discriminatedUnion("discountType", [
  // Code-based discount: requires discountOID (from validation API)
  z.object({
    discountType: z.literal(TourTransactionDiscountType.CODE_BASED),
    discountOID: z.string(),
    description: z.string().optional(),
  }),
  // Tour departure discount: no discountOID needed, amount calculated on backend
  z.object({
    discountType: z.literal(TourTransactionDiscountType.TOUR_DEPARTURE_DISCOUNT),
    groupIndex: z.number(),
  }),
  // Special request discount: handled via approval workflow
  z.object({
    discountType: z.literal(TourTransactionDiscountType.SPECIAL_REQUEST),
  }),
]);
export type ApplyDiscountBody = z.infer<typeof ApplyDiscountBodyZ>;

// --- TourTransactionAddon Schemas ---
const AddAddonBodyZ = TourTransactionAddonZ.pick({
  type: true,
  // these two goes together to pinpoint the pricing entry - start
  groupTourPricingOID: true,
  groupTourCostingEntryOID: true,
  // these two goes together to pinpoint the pricing item - end
  name: true,
  unitPrice: true,
  quantity: true,
  totalPrice: true,
  supplierOID: true,
  notes: true,
});
export type AddAddonBody = z.infer<typeof AddAddonBodyZ>;

const UpdateAddonBodyZ = AddAddonBodyZ.partial();
export type UpdateAddonBody = z.infer<typeof UpdateAddonBodyZ>;


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
    path: `${basePath}/:tourTransactionOID/confirm`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    summary: "Confirm a tour transaction, trigger validation and data snapshotting",
    body: z.undefined(),
    responses: {
      200: z.boolean(),
    },
  },
  cancelTourTransaction: {
    method: "POST",
    path: `${basePath}/:tourTransactionOID/cancel`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    summary: "Cancel a tour transaction",
    body: z.undefined(),
    responses: {
      200: z.boolean(),
    },
  },
  batchUpdateBookingStatus: {
    method: "POST",
    path: `${basePath}/batch-booking-status`,
    body: z.record(
      EntityOIDZ.describe("OID of TourTransaction to update"),
      z.object({ status: z.nativeEnum(TourTransactionBookingStatus) }),
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated TourTransactions")),
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
      200: z.array(EntityOIDZ),
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

  // #region DISCOUNT
  getDiscountsForTransaction: {
    summary: "List applied discounts for a transaction",
    method: "GET",
    path: `${basePath}/:tourTransactionOID/discounts`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of TourTransactionDiscounts")),
    },
  },
  applyDiscountToTransaction: {
    summary: "Apply a new discount to the transaction",
    method: "POST",
    path: `${basePath}/:tourTransactionOID/discounts`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    body: ApplyDiscountBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  removeDiscountFromTransaction: {
    summary: "Remove a discount from the transaction",
    method: "DELETE",
    path: `${basePath}/:tourTransactionOID/discounts/:transactionDiscountOID`,
    pathParams: z.object({
      tourTransactionOID: EntityOIDZ,
      transactionDiscountOID: EntityOIDZ,
    }),
    body: z.undefined(),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region ADDON
  getAddonsForTransaction: {
    summary: "List add-ons for a transaction",
    method: "GET",
    path: `${basePath}/:tourTransactionOID/addons`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of TourTransactionAddons")),
    },
  },
  addAddonToTransaction: {
    summary: "Add a new add-on to the transaction",
    method: "POST",
    path: `${basePath}/:tourTransactionOID/addons`,
    pathParams: z.object({ tourTransactionOID: EntityOIDZ }),
    body: AddAddonBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  updateAddonInTransaction: {
    summary: "Update an existing add-on in the transaction",
    method: "PUT",
    path: `${basePath}/:tourTransactionOID/addons/:transactionAddonOID`,
    pathParams: z.object({
      tourTransactionOID: EntityOIDZ,
      transactionAddonOID: EntityOIDZ,
    }),
    body: UpdateAddonBodyZ,
    responses: {
      200: EntityOIDZ,
    },
  },
  removeAddonFromTransaction: {
    summary: "Remove an add-on from the transaction",
    method: "DELETE",
    path: `${basePath}/:tourTransactionOID/addons/:transactionAddonOID`,
    pathParams: z.object({
      tourTransactionOID: EntityOIDZ,
      transactionAddonOID: EntityOIDZ,
    }),
    body: z.undefined(),
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
