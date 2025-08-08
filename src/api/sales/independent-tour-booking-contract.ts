// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { BookingPaymentStatus, BookingStatus } from "../../entities/Sales/BookingTypes";
import { IndependentTourBookingZ } from "../../entities/Sales/IndependentTourBooking";
import { IndependentTourBookingAddonZ, IndependentTourBookingAddonType } from "../../entities/Sales/IndependentTourBookingAddon";
import { BookingDiscountType, DiscountMode } from "../../entities/Sales/IndependentTourBookingDiscount";
import { BookingPaxTypeZ, IndependentTourBookingPaxZ } from "../../entities/Sales/IndependentTourBookingPax";
import { IndependentTourBookingRoomZ, BookingRoomStatus } from "../../entities/Sales/IndependentTourBookingRoom";
import { DiscountBookingChannel, DiscountValidationErrorCode } from "../../entities/Settings/Product/Discount";


const basePath = "/api/sales/independent-tour-bookings";

// --- IndependentTourBooking Schemas ---
const CreateIndependentTourBookingBodyZ = IndependentTourBookingZ.pick({
  tenantOID: true,
  independentTourProductOID: true,
  departmentOID: true,
  bookingReference: true,
  paymentStatus: true,
  bookingStatus: true,
  startDate: true,
  endDate: true,
  accommodationOID: true,
  customerOID: true,
  leadGuestName: true,
  leadGuestEmail: true,
  leadGuestPhone: true,
  metadata: true,
  specialInstructions: true,
  ownerOIDs: true,
});
export type CreateIndependentTourBookingBody = z.infer<typeof CreateIndependentTourBookingBodyZ>;

const UpdateIndependentTourBookingBodyZ = CreateIndependentTourBookingBodyZ.omit({
  tenantOID: true,
  departmentOID: true,
  independentTourProductOID: true,
}).partial();
export type UpdateIndependentTourBookingBody = z.infer<typeof UpdateIndependentTourBookingBodyZ>;

// --- IndependentTourBookingRoom Schemas ---
const CreateIndependentTourBookingRoomBodyZ = IndependentTourBookingRoomZ.pick({
  independentTourBookingOID: true,
  roomName: true,
  roomType: true,
  roomStatus: true,
  adultsCount: true,
  childrenCount: true,
  infantsCount: true,
  bedPreference: true,
  floorPreference: true,
  viewPreference: true,
  specialRequests: true,
  roomPrice: true,
  extraBedPrice: true,
});
export type CreateIndependentTourBookingRoomBody = z.infer<typeof CreateIndependentTourBookingRoomBodyZ>;

const UpdateIndependentTourBookingRoomBodyZ = CreateIndependentTourBookingRoomBodyZ.omit({
  independentTourBookingOID: true,
}).partial();
export type UpdateIndependentTourBookingRoomBody = z.infer<typeof UpdateIndependentTourBookingRoomBodyZ>;

// --- IndependentTourBookingPax Schemas ---
const CreateIndependentTourBookingPaxBodyZ = IndependentTourBookingPaxZ.pick({
  independentTourBookingRoomOID: true,
  paxType: true,
  personalDetails: true,
  documentOIDs: true,
  ageAtTravel: true,
  dietaryRequirements: true,
  medicalConditions: true,
  insurancePolicyNumber: true,
  insuranceProvider: true,
  insuranceValidUntil: true,
  transportRecordOID: true,
  seatPreference: true,
});
export type CreateIndependentTourBookingPaxBody = z.infer<typeof CreateIndependentTourBookingPaxBodyZ>;

const UpdateIndependentTourBookingPaxBodyZ = CreateIndependentTourBookingPaxBodyZ.omit({
  independentTourBookingRoomOID: true,
}).partial();
export type UpdateIndependentTourBookingPaxBody = z.infer<typeof UpdateIndependentTourBookingPaxBodyZ>;

// --- IndependentTourBookingAddon Schemas ---
const AddAddonBodyZ = IndependentTourBookingAddonZ.pick({
  addonType: true,
  optionalServiceOID: true,
  manualServiceName: true,
  description: true,
  serviceDate: true,
  unitPrice: true,
  tax: true,
  quantity: true,
  totalPrice: true,
  supplierOID: true,
  confirmationNumber: true,
  voucherNumber: true,
  paxOIDs: true,
  notes: true,
});
export type AddAddonBody = z.infer<typeof AddAddonBodyZ>;

const UpdateAddonBodyZ = AddAddonBodyZ.partial();
export type UpdateAddonBody = z.infer<typeof UpdateAddonBodyZ>;

// --- IndependentTourBookingDiscount Schemas ---
const ApplyDiscountBodyZ = z.discriminatedUnion("discountType", [
  // Code-based discount: requires discountOID (from validation API)
  z.object({
    discountType: z.literal(BookingDiscountType.CODE_BASED),
    discountOID: z.string(),
    discountCode: z.string(),
    description: z.string().optional(),
    bookingChannel: z.nativeEnum(DiscountBookingChannel).default(DiscountBookingChannel.WEB),
  }),
  // Special request discount: handled via approval workflow
  z.object({
    discountType: z.literal(BookingDiscountType.SPECIAL_REQUEST),
    discountName: z.string(),
    discountMode: z.nativeEnum(DiscountMode),
    discountValue: z.number(),
    description: z.string().optional(),
    approvalRequired: z.boolean().default(true),
  }),
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

// --- Validation Context ---
const BookingValidationContextZ = z.object({
  bookingChannel: z.nativeEnum(DiscountBookingChannel).default(DiscountBookingChannel.WEB),
  totalAmount: z.number().min(0),
  roomCount: z.number().min(0),
  paxCount: z.number().min(0),
  startDate: z.string(),
  endDate: z.string(),
  bookingTimestamp: z.string().datetime().optional(),
});
export type BookingValidationContext = z.infer<typeof BookingValidationContextZ>;

// --- Validation Response Schemas ---
const ValidationErrorZ = z.object({
  code: z.nativeEnum(DiscountValidationErrorCode),
  message: z.string(),
  field: z.string().optional(),
});

const ValidationResponseZ = z.object({
  isValid: z.boolean(),
  errors: z.array(ValidationErrorZ).optional(),
  warnings: z.array(z.string()).optional(),
});
export type ValidationResponse = z.infer<typeof ValidationResponseZ>;

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
  
  getIndependentTourBooking: {
    summary: "Get a single independent tour booking",
    method: "GET",
    path: `${basePath}/:bookingOID`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: IndependentTourBookingZ,
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
  
  // #region ROOMS
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
  
  updateRoom: {
    summary: "Update a room in the booking",
    method: "PATCH",
    path: `${basePath}/:bookingOID/rooms/:roomOID`,
    pathParams: z.object({ 
      bookingOID: EntityOIDZ,
      roomOID: EntityOIDZ,
    }),
    body: UpdateIndependentTourBookingRoomBodyZ,
    responses: {
      200: EntityOIDZ,
    },
  },
  
  deleteRoom: {
    summary: "Delete a room from the booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/rooms/:roomOID`,
    pathParams: z.object({ 
      bookingOID: EntityOIDZ,
      roomOID: EntityOIDZ,
    }),
    responses: {
      200: z.boolean(),
    },
  },
  
  // #region PASSENGERS
  addPaxToRoom: {
    summary: "Add a passenger to a room",
    method: "POST",
    path: `${basePath}/:bookingOID/rooms/:roomOID/passengers`,
    pathParams: z.object({ 
      bookingOID: EntityOIDZ,
      roomOID: EntityOIDZ,
    }),
    body: CreateIndependentTourBookingPaxBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  
  updatePax: {
    summary: "Update a passenger",
    method: "PATCH",
    path: `${basePath}/:bookingOID/passengers/:paxOID`,
    pathParams: z.object({ 
      bookingOID: EntityOIDZ,
      paxOID: EntityOIDZ,
    }),
    body: UpdateIndependentTourBookingPaxBodyZ,
    responses: {
      200: EntityOIDZ,
    },
  },
  
  deletePax: {
    summary: "Delete a passenger",
    method: "DELETE",
    path: `${basePath}/:bookingOID/passengers/:paxOID`,
    pathParams: z.object({ 
      bookingOID: EntityOIDZ,
      paxOID: EntityOIDZ,
    }),
    responses: {
      200: z.boolean(),
    },
  },
  
  // #region ADDONS
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
    responses: {
      200: z.boolean(),
    },
  },
  
  // #region DISCOUNTS
  validateDiscount: {
    summary: "Validate a discount code before applying",
    method: "POST",
    path: `${basePath}/:bookingOID/discounts/validate`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({
      discountCode: z.string(),
      context: BookingValidationContextZ,
    }),
    responses: {
      200: ValidationResponseZ,
    },
  },
  
  applyDiscount: {
    summary: "Apply a discount to the booking",
    method: "POST",
    path: `${basePath}/:bookingOID/discounts`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: ApplyDiscountBodyZ,
    responses: {
      201: z.object({
        discountOID: EntityOIDZ,
        appliedAmount: z.number(),
        totalAmount: z.number(),
      }),
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
    responses: {
      200: z.object({
        totalAmount: z.number(),
      }),
    },
  },
  
  // #region BOOKING CONFIRMATION
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
  
  // #region PAYMENT
  createPaymentLink: {
    summary: "Create an AirWallex payment link for the booking",
    method: "POST",
    path: `${basePath}/:bookingOID/payment-link`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateAirWallexPaymentLinkBodyZ,
    responses: {
      200: AirWallexPaymentLinkResponseZ,
    },
  },
  
  // #region PRICING
  recalculateTotal: {
    summary: "Recalculate the booking total amount",
    method: "POST",
    path: `${basePath}/:bookingOID/recalculate`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.object({
        accommodationCost: z.number(),
        optionalServicesCost: z.number(),
        miscellaneousCost: z.number(),
        discountAmount: z.number(),
        taxAmount: z.number(),
        totalAmount: z.number(),
      }),
    },
  },
});