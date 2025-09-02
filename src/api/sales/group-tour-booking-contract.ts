// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { GroupTourBookingZ } from "../../entities/Sales/GroupTourBooking";
import { GroupTourBookingAddonZ } from "../../entities/Sales/GroupTourBookingAddon";
import { GroupTourBookingPaxZ } from "../../entities/Sales/GroupTourBookingPax";
import { GroupTourBookingRoomZ } from "../../entities/Sales/GroupTourBookingRoom";
import { DiscountValidationErrorCode } from "../../entities/Settings/Product/Discount";
import { BookingStatusZ } from "../../enums/BookingTypes";
import { BookingValidationContextZ, CodeBasedDiscountZ, SpecialRequestDiscountZ, TourDepartureDiscountZ } from "../../types/discount";


const basePath = "/api/sales/group-tour-bookings";

// --- GroupTourBooking Schemas ---
const CreateGroupTourBookingBodyZ = GroupTourBookingZ.pick({
  tenantOID: true,
  tourDepartureOID: true,
  departmentOID: true,
  stationCodeOID: true,
  paymentStatus: true,
  metadata: true,
  specialInstructions: true,
  overwriteTax: true,
  ownerOIDs: true,
}).extend({
  bookingReference: GroupTourBookingZ.shape.bookingReference.optional(),
});
export type CreateGroupTourBookingBody = z.infer<typeof CreateGroupTourBookingBodyZ>;

const UpdateGroupTourBookingBodyZ = CreateGroupTourBookingBodyZ.omit({
  tenantOID: true,
  departmentOID: true,
  tourDepartureOID: true,
}).partial();
export type UpdateGroupTourBookingBody = z.infer<typeof UpdateGroupTourBookingBodyZ>;

// --- GroupTourBookingRoom Schemas ---
const CreateGroupTourBookingRoomBodyZ = GroupTourBookingRoomZ.pick({
  bookingOID: true,
  status: true,
  roomNumber: true,
  isDbl: true,
  notes: true,
  roomConfigurationRuleOID: true,
});
export type CreateGroupTourBookingRoomBody = z.infer<typeof CreateGroupTourBookingRoomBodyZ>;

const UpdateGroupTourBookingRoomBodyZ = CreateGroupTourBookingRoomBodyZ.omit({
  bookingOID: true,
}).partial();
export type UpdateGroupTourBookingRoomBody = z.infer<typeof UpdateGroupTourBookingRoomBodyZ>;

// --- GroupTourBookingPax Schemas ---
const CreateGroupTourBookingPaxBodyZ = GroupTourBookingPaxZ.pick({
  bookingRoomOID: true,
  type: true,
  isLandTourOnly: true,
  personalDetails: true,
  mealPreference: true,
  transportRecordId: true,
  documentOIDs: true,
});
export type CreateGroupTourBookingPaxBody = z.infer<typeof CreateGroupTourBookingPaxBodyZ>;

const UpdateGroupTourBookingPaxBodyZ = CreateGroupTourBookingPaxBodyZ.omit({
}).partial();
export type UpdateGroupTourBookingPaxBody = z.infer<typeof UpdateGroupTourBookingPaxBodyZ>;


// --- GroupTourBookingDiscount Schemas ---
const ApplyDiscountBodyZ = z.discriminatedUnion("discountType", [
  CodeBasedDiscountZ,
  TourDepartureDiscountZ,
  SpecialRequestDiscountZ,
]);
export type ApplyDiscountBody = z.infer<typeof ApplyDiscountBodyZ>;

// --- GroupTourBookingAddon Schemas ---
const AddAddonBodyZ = GroupTourBookingAddonZ.pick({
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
  paymentWayOID: EntityOIDZ.optional().describe("Payment way OID to use for this transaction"),
});
export type CreateAirWallexPaymentLinkBody = z.infer<typeof CreateAirWallexPaymentLinkBodyZ>;

const AirWallexPaymentLinkResponseZ = z.object({
  paymentLinkUrl: z.string().url().describe("Secure payment link URL"),
  paymentLinkId: z.string().describe("AirWallex payment link ID"),
});
export type AirWallexPaymentLinkResponse = z.infer<typeof AirWallexPaymentLinkResponseZ>;


export const groupTourBookingContract = initContract().router({
  // #region GROUP TOUR BOOKING
  getGroupTourBookings: {
    summary: "Get group tour bookings",
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
  createGroupTourBooking: {
    summary: "Create a new group tour booking",
    method: "POST",
    path: basePath,
    body: CreateGroupTourBookingBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  updateGroupTourBookings: {
    summary: "Update multiple existing group tour bookings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      EntityOIDZ.describe("OID of GroupTourBooking to update"),
      UpdateGroupTourBookingBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated GroupTourBookings")),
    },
  },
  deleteGroupTourBookings: {
    summary: "Delete multiple group tour bookings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      bookingOIDs: z.array(EntityOIDZ.describe("OIDs of GroupTourBookings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  confirmGroupTourBooking: {
    method: "POST",
    path: `${basePath}/:bookingOID/confirm`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    summary: "Confirm a group tour booking, trigger validation and data snapshotting",
    body: z.object({}).optional(),
    responses: {
      200: z.boolean(),
    },
  },
  cancelGroupTourBooking: {
    method: "POST",
    path: `${basePath}/:bookingOID/cancel`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    summary: "Cancel a group tour booking",
    body: z.object({}).optional(),
    responses: {
      200: z.boolean(),
    },
  },
  batchUpdateBookingStatus: {
    method: "POST",
    path: `${basePath}/batch-booking-status`,
    body: z.record(
      EntityOIDZ.describe("OID of GroupTourBooking to update"),
      z.object({ status: BookingStatusZ }),
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated GroupTourBookings")),
    },
  },
  // #endregion

  // #region ROOM
  getRoomsForGroupTourBooking: {
    summary: "Get all rooms for a specific group tour booking",
    method: "GET",
    path: `${basePath}/:bookingOID/rooms`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of GroupTourBookingRooms")),
    },
  },
  addRoomToGroupTourBooking: {
    summary: "Add a new room to a group tour booking",
    method: "POST",
    path: `${basePath}/:bookingOID/rooms`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateGroupTourBookingRoomBodyZ.omit({
      bookingOID: true,
    }),
    responses: {
      201: EntityOIDZ,
    },
  },
  updateRoomInGroupTourBookings: {
    summary: "Update a specific room in a group tour booking",
    method: "PUT",
    path: `${basePath}/:bookingOID/rooms/batch-update`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
    }),
    body: z.record(
      EntityOIDZ.describe("OID of GroupTourBookingRoom to update"),
      UpdateGroupTourBookingRoomBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated GroupTourBookingRooms")),
    },
  },
  removeRoomFromGroupTourBookings: {
    summary: "Remove a room from a group tour booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/rooms/batch-delete`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
    }),
    body: z.object({
      bookingRoomOIDs: z.array(EntityOIDZ.describe("OIDs of GroupTourBookingRooms to remove")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region PAX
  getPaxForGroupTourBooking: {
    summary: "Get all passengers for a specific group tour booking",
    method: "GET",
    path: `${basePath}/:bookingOID/pax`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of GroupTourBookingPax")),
    },
  },
  updatePaxInGroupTourBookings: {
    summary: "Update a specific passenger in a group tour booking",
    method: "PUT",
    path: `${basePath}/:bookingOID/pax/batch-update`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
    }),
    body: z.record(
      EntityOIDZ.describe("OID of GroupTourBookingPax to update"),
      UpdateGroupTourBookingPaxBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  removePaxFromGroupTourBookings: {
    summary: "Remove a passenger from a group tour booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/pax/batch-delete`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
    }),
    body: z.object({
      bookingPaxOIDs: z.array(EntityOIDZ.describe("OIDs of GroupTourBookingPax to remove")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region DISCOUNT
  getDiscountsForGroupTourBooking: {
    summary: "List applied discounts for a group tour booking",
    method: "GET",
    path: `${basePath}/:bookingOID/discounts`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of GroupTourBookingDiscounts")),
    },
  },
  getDiscountsForTourDeparture: {
    summary: "List applied discounts for a tour departure",
    method: "GET",
    path: "/api/sales/tour-departures/:tourDepartureOID/discounts",
    pathParams: z.object({ tourDepartureOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of GroupTourBookingDiscounts")),
    },
  },
  applyDiscountToGroupTourBooking: {
    summary: "Apply a new discount to the group tour booking",
    method: "POST",
    path: `${basePath}/:bookingOID/discounts`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: ApplyDiscountBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  removeDiscountFromGroupTourBooking: {
    summary: "Remove a discount from the group tour booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/discounts/:bookingDiscountOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      bookingDiscountOID: EntityOIDZ,
    }),
    body: z.object({}).optional(),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region ADDON
  getAddonsForGroupTourBooking: {
    summary: "List add-ons for a group tour booking",
    method: "GET",
    path: `${basePath}/:bookingOID/addons`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of GroupTourBookingAddons")),
    },
  },
  addAddonToGroupTourBooking: {
    summary: "Add a new add-on to the group tour booking",
    method: "POST",
    path: `${basePath}/:bookingOID/addons`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: AddAddonBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  updateAddonInGroupTourBooking: {
    summary: "Update an existing add-on in the group tour booking",
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
  removeAddonFromGroupTourBooking: {
    summary: "Remove an add-on from the group tour booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/addons/:bookingAddonOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      bookingAddonOID: EntityOIDZ,
    }),
    body: z.object({}).optional(),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region DISCOUNT VALIDATION
  validateDiscountCode: {
    summary: "Validate a discount code for group tour booking",
    method: "POST",
    path: `${basePath}/validate-discount-code`,
    body: z.object({
      tenantOID: z.string(),
      discountCode: z.string(),
      bookingOID: z.string(),
      bookingContext: BookingValidationContextZ,
    }),
    responses: {
      200: z.object({
        valid: z.boolean(),
        discountOID: z.string().optional(),
        discountName: z.string().optional(),
        discountValue: z.number().optional(),
        calculatedAmount: z.number().optional(),
        errorCode: z.nativeEnum(DiscountValidationErrorCode).optional(),
        errorMessage: z.string().optional(),
      }),
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
