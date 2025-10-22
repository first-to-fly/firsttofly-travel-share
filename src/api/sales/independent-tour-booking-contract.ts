// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { IndependentTourBookingZ } from "../../entities/Sales/IndependentTourBooking";
import { IndependentTourBookingAddonZ } from "../../entities/Sales/IndependentTourBookingAddon";
import { IndependentTourBookingPaxZ } from "../../entities/Sales/IndependentTourBookingPax";
import { IndependentTourBookingRoomZ } from "../../entities/Sales/IndependentTourBookingRoom";
import { DiscountValidationErrorCode } from "../../entities/Settings/Product/Discount";
import { BookingPaymentStatus, BookingStatus, BookingStatusZ } from "../../enums/BookingTypes";
import { BookingValidationContextZ, CodeBasedDiscountZ, SpecialRequestDiscountZ } from "../../types/discount";


const basePath = "/api/sales/independent-tour-bookings";

// --- IndependentTourBooking Schemas ---
const CreateIndependentTourBookingBodyZ = IndependentTourBookingZ.pick({
  tenantOID: true,
  independentTourProductOID: true,
  independentTourAccommodationOID: true,
  departmentOID: true,
  stationCodeOID: true,
  tcpBookingOID: true,
  paymentStatus: true,
  bookingStatus: true,
  fullPaymentDueDate: true,
  platform: true,
  metadata: true,
  specialInstructions: true,
  overwriteTax: true,
  overwriteDeposit: true,
  saleStaffOID: true,
  saleReferrerOID: true,
  insuranceDeclaration: true,
}).extend({
  bookingReference: IndependentTourBookingZ.shape.bookingReference.optional(),
  travelStartDate: IndependentTourBookingZ.shape.travelStartDate.optional(),
  travelEndDate: IndependentTourBookingZ.shape.travelEndDate.optional(),
});
export type CreateIndependentTourBookingBody = z.infer<typeof CreateIndependentTourBookingBodyZ>;

const UpdateIndependentTourBookingBodyZ = CreateIndependentTourBookingBodyZ.omit({
  tenantOID: true,
  departmentOID: true,
  independentTourProductOID: true,
  tcpBookingOID: true,
}).partial();
export type UpdateIndependentTourBookingBody = z.infer<typeof UpdateIndependentTourBookingBodyZ>;

// --- IndependentTourBookingRoom Schemas ---
const CreateIndependentTourBookingRoomBodyZ = IndependentTourBookingRoomZ.pick({
  independentTourBookingOID: true,
  roomNumber: true,
  occupancy: true,
  status: true,
  notes: true,
});
export type CreateIndependentTourBookingRoomBody = z.infer<typeof CreateIndependentTourBookingRoomBodyZ>;

const UpdateIndependentTourBookingRoomBodyZ = IndependentTourBookingRoomZ.pick({
  roomNumber: true,
  occupancy: true,
  status: true,
  notes: true,
}).partial();
export type UpdateIndependentTourBookingRoomBody = z.infer<typeof UpdateIndependentTourBookingRoomBodyZ>;

// --- IndependentTourBookingPax Schemas ---
const UpdateIndependentTourBookingPaxBodyZ = IndependentTourBookingPaxZ.pick({
  type: true,
  personalDetails: true,
  mealPreference: true,
  documentOIDs: true,
  isConfirmed: true,
  isLocked: true,
}).partial();
export type UpdateIndependentTourBookingPaxBody = z.infer<typeof UpdateIndependentTourBookingPaxBodyZ>;

// --- IndependentTourBookingAddon Schemas ---
const AddAddonBodyZ = IndependentTourBookingAddonZ.pick({
  independentTourOptionalServiceOID: true,
  type: true,
  name: true,
  serviceDate: true,
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

// --- IndependentTourBookingDiscount Schemas ---
const ApplyDiscountBodyZ = z.discriminatedUnion("discountType", [
  CodeBasedDiscountZ,
  SpecialRequestDiscountZ,
]);
export type ApplyDiscountBody = z.infer<typeof ApplyDiscountBodyZ>;

// --- Accommodation Selection Schema ---
const SetAccommodationBodyZ = z.object({
  accommodationOID: EntityOIDZ,
  checkInDate: z.string(), // ISO date string
  checkOutDate: z.string(), // ISO date string
  specialRequests: z.string().optional(),
});
export type SetAccommodationBody = z.infer<typeof SetAccommodationBodyZ>;

// --- Validation Response Schemas ---
// Aligned with Group tour booking validation response schema
const ValidationResponseZ = z.object({
  valid: z.boolean(),
  discountOID: z.string().optional(),
  discountName: z.string().optional(),
  discountValue: z.number().optional(),
  calculatedAmount: z.number().optional(),
  errorCode: z.nativeEnum(DiscountValidationErrorCode).optional(),
  errorMessage: z.string().optional(),
});
export type ValidationResponse = z.infer<typeof ValidationResponseZ>;

// --- AirWallex Payment Link Schemas ---
const CreateAirWallexPaymentLinkBodyZ = z.object({
  amount: z.number().positive().describe("Payment amount"),
  currency: z.string().length(3).describe("Currency code (e.g., USD, EUR)"),
  customerEmail: z.string().email().describe("Customer email address"),
  paymentWayOID: EntityOIDZ.optional().describe("Payment way OID to use for this transaction"),
  validityDurationMinutes: z
    .number()
    .int()
    .positive()
    .describe("Optional validity duration in minutes. Defaults to 7 days when omitted.")
    .optional(),
});
export type CreateAirWallexPaymentLinkBody = z.infer<typeof CreateAirWallexPaymentLinkBodyZ>;

const AirWallexPaymentLinkResponseZ = z.object({
  paymentLinkUrl: z.string().url().describe("Secure payment link URL"),
  paymentLinkId: z.string().describe("AirWallex payment link ID"),
});
export type AirWallexPaymentLinkResponse = z.infer<typeof AirWallexPaymentLinkResponseZ>;

const ResendAirWallexPaymentLinkBodyZ = z.object({
  customerEmail: z.string().email().optional(),
});
export type ResendAirWallexPaymentLinkBody = z.infer<typeof ResendAirWallexPaymentLinkBodyZ>;

// --- Workflow Response Schema ---
const WorkflowResponseZ = z.object({
  workflowId: z.string(),
  runId: z.string(),
  status: z.string(),
  message: z.string().optional(),
});
export type WorkflowResponse = z.infer<typeof WorkflowResponseZ>;

export const independentTourBookingContract = initContract().router({
  // #region INDEPENDENT TOUR BOOKING
  getIndependentTourBookings: {
    summary: "Get independent tour bookings",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: EntityOIDZ,
      independentTourProductOID: EntityOIDZ.optional(),
      customerOID: EntityOIDZ.optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      bookingStatus: z.nativeEnum(BookingStatus).optional(),
      paymentStatus: z.nativeEnum(BookingPaymentStatus).optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(EntityOIDZ),
      }),
    },
  },

  createIndependentTourBooking: {
    summary: "Create a new independent tour booking",
    method: "POST",
    path: basePath,
    body: CreateIndependentTourBookingBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },

  updateIndependentTourBookings: {
    summary: "Update multiple existing independent tour bookings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      EntityOIDZ.describe("OID of IndependentTourBooking to update"),
      UpdateIndependentTourBookingBodyZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated IndependentTourBookings")),
    },
  },

  deleteIndependentTourBookings: {
    summary: "Delete multiple independent tour bookings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      bookingOIDs: z.array(EntityOIDZ.describe("OIDs of IndependentTourBookings to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  confirmBooking: {
    summary: "Confirm an independent tour booking and trigger workflow",
    method: "POST",
    path: `${basePath}/:bookingOID/confirm`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({
      sendConfirmationEmail: z.boolean().default(true),
      emailRecipients: z.array(z.string().email()).optional(),
    }).optional(),
    responses: {
      200: WorkflowResponseZ,
    },
  },

  cancelIndependentTourBooking: {
    summary: "Cancel an independent tour booking",
    method: "POST",
    path: `${basePath}/:bookingOID/cancel`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({ remarks: z.string() }),
    responses: {
      200: z.boolean(),
    },
  },
  voidIndependentTourBooking: {
    summary: "Void an independent tour booking",
    method: "POST",
    path: `${basePath}/:bookingOID/void`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({ remarks: z.string() }),
    responses: {
      200: z.boolean(),
    },
  },

  batchUpdateBookingStatus: {
    summary: "Batch update booking statuses",
    method: "POST",
    path: `${basePath}/batch-status`,
    body: z.record(
      EntityOIDZ.describe("OID of IndependentTourBooking"),
      z.object({
        status: BookingStatusZ,
      }),
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated bookings")),
    },
  },
  // #endregion

  // #region ACCOMMODATION
  setAccommodation: {
    summary: "Set or update accommodation for booking",
    method: "POST",
    path: `${basePath}/:bookingOID/accommodation`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: SetAccommodationBodyZ,
    responses: {
      200: z.object({
        bookingOID: EntityOIDZ,
        accommodationOID: EntityOIDZ,
        totalAmount: z.number(),
      }),
    },
  },
  // #endregion

  // #region ROOMS
  getRoomsForBooking: {
    summary: "Get all rooms for a booking",
    method: "GET",
    path: `${basePath}/:bookingOID/rooms`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("Room OIDs")),
    },
  },

  addRoom: {
    summary: "Add a room to the booking",
    method: "POST",
    path: `${basePath}/:bookingOID/rooms`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateIndependentTourBookingRoomBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },

  batchUpdateRooms: {
    summary: "Batch update multiple rooms in the booking",
    method: "PUT",
    path: `${basePath}/:bookingOID/rooms/batch-update`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.record(z.string(), UpdateIndependentTourBookingRoomBodyZ),
    responses: {
      200: z.array(EntityOIDZ.describe("Updated room OIDs")),
    },
  },

  batchDeleteRooms: {
    summary: "Batch delete multiple rooms from the booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/rooms/batch-delete`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({
      bookingRoomOIDs: z.array(EntityOIDZ),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region PAX
  getPaxForBooking: {
    summary: "Get all passengers for a booking",
    method: "GET",
    path: `${basePath}/:bookingOID/passengers`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("Passenger OIDs")),
    },
  },

  batchUpdatePax: {
    summary: "Batch update multiple pax in the booking",
    method: "PUT",
    path: `${basePath}/:bookingOID/pax/batch-update`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.record(z.string(), UpdateIndependentTourBookingPaxBodyZ),
    responses: {
      200: z.array(EntityOIDZ.describe("Updated pax OIDs")),
    },
  },

  batchDeletePax: {
    summary: "Batch delete multiple pax from the booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/pax/batch-delete`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({
      bookingPaxOIDs: z.array(EntityOIDZ),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region ADDONS
  getAddonsForBooking: {
    summary: "Get all addons for a booking",
    method: "GET",
    path: `${basePath}/:bookingOID/addons`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("Addon OIDs")),
    },
  },

  addAddon: {
    summary: "Add an addon (optional service) to the booking",
    method: "POST",
    path: `${basePath}/:bookingOID/addons`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: AddAddonBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },

  updateAddon: {
    summary: "Update an addon",
    method: "PATCH",
    path: `${basePath}/:bookingOID/addons/:addonOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      addonOID: EntityOIDZ,
    }),
    body: UpdateAddonBodyZ,
    responses: {
      200: EntityOIDZ,
    },
  },

  deleteAddon: {
    summary: "Delete an addon",
    method: "DELETE",
    path: `${basePath}/:bookingOID/addons/:addonOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      addonOID: EntityOIDZ,
    }),
    body: z.object({}).optional(),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region DISCOUNT VALIDATION
  validateDiscountCode: {
    summary: "Validate a discount code for independent tour booking",
    method: "POST",
    path: `${basePath}/validate-discount-code`,
    body: z.object({
      tenantOID: z.string(),
      discountCode: z.string(),
      bookingOID: z.string(),
      bookingContext: BookingValidationContextZ,
    }),
    responses: {
      200: ValidationResponseZ,
    },
  },
  // #endregion

  // #region DISCOUNTS
  getDiscountsForBooking: {
    summary: "Get all discounts for a booking",
    method: "GET",
    path: `${basePath}/:bookingOID/discounts`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ.describe("Discount OIDs")),
    },
  },


  applyDiscount: {
    summary: "Apply a discount to the booking",
    method: "POST",
    path: `${basePath}/:bookingOID/discounts`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: ApplyDiscountBodyZ,
    responses: {
      201: EntityOIDZ.describe("Created discount OID"),
    },
  },

  removeDiscount: {
    summary: "Remove a discount from the booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/discounts/:discountOID`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      discountOID: EntityOIDZ,
    }),
    body: z.object({}).optional(),
    responses: {
      200: z.object({
        totalAmount: z.number(),
      }),
    },
  },
  // #endregion

  // #region PAYMENT
  createAirWallexPaymentLink: {
    summary: "Create an AirWallex payment link for the booking",
    method: "POST",
    path: `${basePath}/:bookingOID/payment-link`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateAirWallexPaymentLinkBodyZ,
    responses: {
      200: AirWallexPaymentLinkResponseZ,
    },
  },
  cancelAirWallexPaymentLink: {
    summary: "Cancel an existing AirWallex payment link for the booking",
    method: "POST",
    path: `${basePath}/:bookingOID/payment-link/:paymentLinkId/cancel`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      paymentLinkId: z.string(),
    }),
    body: z.object({}).optional(),
    responses: {
      200: z.boolean(),
    },
  },
  resendAirWallexPaymentLink: {
    summary: "Resend an AirWallex payment link to the customer",
    method: "POST",
    path: `${basePath}/:bookingOID/payment-link/:paymentLinkId/resend`,
    pathParams: z.object({
      bookingOID: EntityOIDZ,
      paymentLinkId: z.string(),
    }),
    body: ResendAirWallexPaymentLinkBodyZ.optional(),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

});
