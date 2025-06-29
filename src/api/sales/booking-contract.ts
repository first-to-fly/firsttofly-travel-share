// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { BookingBookingStatus, BookingZ } from "../../entities/Sales/Booking";
import { BookingAddonZ } from "../../entities/Sales/BookingAddon";
import { BookingDiscountType } from "../../entities/Sales/BookingDiscount";
import { BookingPaxZ } from "../../entities/Sales/BookingPax";
import { BookingRoomZ } from "../../entities/Sales/BookingRoom";
import { BookingTransferZ } from "../../entities/Sales/BookingTransfer";


const basePath = "/api/sales/bookings";

// --- Booking Schemas ---
const CreateBookingBodyZ = BookingZ.pick({
  tenantOID: true,
  tourDepartureOID: true,
  departmentOID: true,
  bookingReference: true,
  paymentStatus: true,
  metadata: true,
  specialInstructions: true,
  overwriteTax: true,
});
export type CreateBookingBody = z.infer<typeof CreateBookingBodyZ>;

const UpdateBookingBodyZ = CreateBookingBodyZ.omit({
  tenantOID: true,
  departmentOID: true,
  tourDepartureOID: true,
}).partial();
export type UpdateBookingBody = z.infer<typeof UpdateBookingBodyZ>;

// --- BookingRoom Schemas ---
const CreateBookingRoomBodyZ = BookingRoomZ.pick({
  bookingOID: true,
  status: true,
  roomNumber: true,
  isDbl: true,
  notes: true,
  roomConfigurationRuleOID: true,
});
export type CreateBookingRoomBody = z.infer<typeof CreateBookingRoomBodyZ>;

const UpdateBookingRoomBodyZ = CreateBookingRoomBodyZ.omit({
  bookingOID: true,
}).partial();
export type UpdateBookingRoomBody = z.infer<typeof UpdateBookingRoomBodyZ>;

// --- BookingPax Schemas ---
const CreateBookingPaxBodyZ = BookingPaxZ.pick({
  bookingRoomOID: true,
  type: true,
  isLandTourOnly: true,
  personalDetails: true,
  mealPreference: true,
  transportRecordId: true,
  documentOIDs: true,
});
export type CreateBookingPaxBody = z.infer<typeof CreateBookingPaxBodyZ>;

const UpdateBookingPaxBodyZ = CreateBookingPaxBodyZ.omit({
}).partial();
export type UpdateBookingPaxBody = z.infer<typeof UpdateBookingPaxBodyZ>;

// --- BookingTransfer Schemas ---
const CreateBookingTransferBodyZ = BookingTransferZ.pick({
  tenantOID: true,
  bookingOID: true,
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
export type CreateBookingTransferBody = z.infer<typeof CreateBookingTransferBodyZ>;

const UpdateBookingTransferBodyZ = CreateBookingTransferBodyZ.pick({
  files: true,
  notes: true,
  metadata: true,
}).partial();
export type UpdateBookingTransferBody = z.infer<typeof UpdateBookingTransferBodyZ>;

// --- BookingDiscount Schemas ---
const ApplyDiscountBodyZ = z.discriminatedUnion("discountType", [
  // Code-based discount: requires discountOID (from validation API)
  z.object({
    discountType: z.literal(BookingDiscountType.CODE_BASED),
    discountOID: z.string(),
    description: z.string().optional(),
  }),
  // Tour departure discount: no discountOID needed, amount calculated on backend
  z.object({
    discountType: z.literal(BookingDiscountType.TOUR_DEPARTURE_DISCOUNT),
    groupIndex: z.number(),
  }),
  // Special request discount: handled via approval workflow
  z.object({
    discountType: z.literal(BookingDiscountType.SPECIAL_REQUEST),
  }),
]);
export type ApplyDiscountBody = z.infer<typeof ApplyDiscountBodyZ>;

// --- BookingAddon Schemas ---
const AddAddonBodyZ = BookingAddonZ.pick({
  type: true,
  // these two goes together to pinpoint the pricing entry - start
  groupTourPricingOID: true,
  groupTourCostingEntryOID: true,
  // these two goes together to pinpoint the pricing item - end
  name: true,
  unitPrice: true,
  tax: true,
  quantity: true,
  totalPrice: true,
  supplierOID: true,
  notes: true,
});
export type AddAddonBody = z.infer<typeof AddAddonBodyZ>;

const UpdateAddonBodyZ = AddAddonBodyZ.partial();
export type UpdateAddonBody = z.infer<typeof UpdateAddonBodyZ>;

// --- AirWallex Payment Link Schemas ---
const CreateAirWallexPaymentLinkBodyZ = z.object({
  amount: z.number().positive().describe("Payment amount"),
  currency: z.string().length(3).describe("Currency code (e.g., USD, EUR)"),
  customerEmail: z.string().email().describe("Customer email address"),
});
export type CreateAirWallexPaymentLinkBody = z.infer<typeof CreateAirWallexPaymentLinkBodyZ>;

const AirWallexPaymentLinkResponseZ = z.object({
  paymentLinkUrl: z.string().url().describe("Secure payment link URL"),
  paymentLinkId: z.string().describe("AirWallex payment link ID"),
});
export type AirWallexPaymentLinkResponse = z.infer<typeof AirWallexPaymentLinkResponseZ>;


export const bookingContract = initContract().router({
  // #region BOOKING
  getBookings: {
    summary: "Get bookings",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: EntityOIDZ,
      tourDepartureOID: EntityOIDZ.optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(EntityOIDZ),
      }),
    },
  },
  createBooking: {
    summary: "Create a new booking",
    method: "POST",
    path: basePath,
    body: CreateBookingBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  updateBookings: {
    summary: "Update multiple existing bookings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      EntityOIDZ.describe("OID of Booking to update"),
      UpdateBookingBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated Bookings")),
    },
  },
  deleteBookings: {
    summary: "Delete multiple bookings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      bookingOIDs: z.array(EntityOIDZ.describe("OIDs of Bookings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  confirmBooking: {
    method: "POST",
    path: `${basePath}/:bookingOID/confirm`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    summary: "Confirm a booking, trigger validation and data snapshotting",
    body: z.undefined(),
    responses: {
      200: z.boolean(),
    },
  },
  cancelBooking: {
    method: "POST",
    path: `${basePath}/:bookingOID/cancel`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    summary: "Cancel a booking",
    body: z.undefined(),
    responses: {
      200: z.boolean(),
    },
  },
  batchUpdateBookingStatus: {
    method: "POST",
    path: `${basePath}/batch-booking-status`,
    body: z.record(
      EntityOIDZ.describe("OID of Booking to update"),
      z.object({ status: z.nativeEnum(BookingBookingStatus) }),
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated Bookings")),
    },
  },
  // #endregion

  // #region ROOM
  getRoomsForBooking: {
    summary: "Get all rooms for a specific booking",
    method: "GET",
    path: `${basePath}/:bookingOID/rooms`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of BookingRooms")),
    },
  },
  addRoomToBooking: {
    summary: "Add a new room to a booking",
    method: "POST",
    path: `${basePath}/:bookingOID/rooms`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateBookingRoomBodyZ.omit({
      bookingOID: true,
    }),
    responses: {
      201: EntityOIDZ,
    },
  },
  updateRoomInBookings: {
    summary: "Update a specific room in a booking",
    method: "PUT",
    path: `${basePath}/:bookingOID/rooms/batch-update`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
    }),
    body: z.record(
      EntityOIDZ.describe("OID of BookingRoom to update"),
      UpdateBookingRoomBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated BookingRooms")),
    },
  },
  removeRoomFromBookings: {
    summary: "Remove a room from a booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/rooms/batch-delete`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
    }),
    body: z.object({
      bookingRoomOIDs: z.array(EntityOIDZ.describe("OIDs of BookingRooms to remove")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region PAX
  getPaxForBooking: {
    summary: "Get all passengers for a specific booking",
    method: "GET",
    path: `${basePath}/:bookingOID/pax`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of BookingPax")),
    },
  },
  updatePaxInBookings: {
    summary: "Update a specific passenger in a booking",
    method: "PUT",
    path: `${basePath}/:bookingOID/pax/batch-update`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
    }),
    body: z.record(
      EntityOIDZ.describe("OID of BookingPax to update"),
      UpdateBookingPaxBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  removePaxFromBookings: {
    summary: "Remove a passenger from a booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/pax/batch-delete`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
    }),
    body: z.object({
      bookingPaxOIDs: z.array(EntityOIDZ.describe("OIDs of BookingPax to remove")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region DISCOUNT
  getDiscountsForBooking: {
    summary: "List applied discounts for a booking",
    method: "GET",
    path: `${basePath}/:bookingOID/discounts`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of BookingDiscounts")),
    },
  },
  getDiscountsForTourDeparture: {
    summary: "List applied discounts for a tour departure",
    method: "GET",
    path: "/api/sales/tour-departures/:tourDepartureOID/discounts",
    pathParams: z.object({ tourDepartureOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of BookingDiscounts")),
    },
  },
  applyDiscountToBooking: {
    summary: "Apply a new discount to the booking",
    method: "POST",
    path: `${basePath}/:bookingOID/discounts`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: ApplyDiscountBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  removeDiscountFromBooking: {
    summary: "Remove a discount from the booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/discounts/:bookingDiscountOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      bookingDiscountOID: EntityOIDZ,
    }),
    body: z.undefined(),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region ADDON
  getAddonsForBooking: {
    summary: "List add-ons for a booking",
    method: "GET",
    path: `${basePath}/:bookingOID/addons`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of BookingAddons")),
    },
  },
  addAddonToBooking: {
    summary: "Add a new add-on to the booking",
    method: "POST",
    path: `${basePath}/:bookingOID/addons`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: AddAddonBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  updateAddonInBooking: {
    summary: "Update an existing add-on in the booking",
    method: "PUT",
    path: `${basePath}/:bookingOID/addons/:bookingAddonOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      bookingAddonOID: EntityOIDZ,
    }),
    body: UpdateAddonBodyZ,
    responses: {
      200: EntityOIDZ,
    },
  },
  removeAddonFromBooking: {
    summary: "Remove an add-on from the booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/addons/:bookingAddonOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      bookingAddonOID: EntityOIDZ,
    }),
    body: z.undefined(),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region TRANSFER
  createBookingTransfer: {
    summary: "Record a completed financial transfer for a booking",
    method: "POST",
    path: `${basePath}/:bookingOID/transfers`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateBookingTransferBodyZ.omit({
      bookingOID: true,
    }),
    responses: {
      200: EntityOIDZ,
    },
  },
  updateBookingTransfers: {
    summary: "Update multiple financial transfers for a booking",
    method: "POST",
    path: `${basePath}/:bookingOID/transfers/batch-update`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.record(
      EntityOIDZ.describe("OID of BookingTransfer to update"),
      UpdateBookingTransferBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated BookingTransfers")),
    },
  },
  getAllBookingTransfers: {
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
  getBookingTransfers: {
    summary: "Get list of financial transfers for a booking",
    method: "GET",
    path: `${basePath}/:bookingOID/transfers`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.object({ oids: z.array(EntityOIDZ) }),
    },
  },
  // #endregion

  // #region PAYMENT
  createAirWallexPaymentLink: {
    summary: "Create AirWallex payment link and send email to customer",
    method: "POST",
    path: `${basePath}/:bookingOID/airwallex-payment-link`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateAirWallexPaymentLinkBodyZ,
    responses: {
      201: AirWallexPaymentLinkResponseZ,
    },
  },
  // #endregion

});
