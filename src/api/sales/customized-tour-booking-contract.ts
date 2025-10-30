// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { DateISOStringZ, EntityOIDZ } from "../../entities/entity";
import { CustomizedTourBookingZ } from "../../entities/Sales/CustomizedTourBooking";
import { CustomizedTourBookingPaxZ } from "../../entities/Sales/CustomizedTourBookingPax";
import { CustomizedTourCostItemZ } from "../../entities/Sales/CustomizedTourCostItem";
import { CustomizedTourItineraryZ } from "../../entities/Sales/CustomizedTourItinerary";
import { CustomizedTourItineraryDayZ } from "../../entities/Sales/CustomizedTourItineraryDay";
import { CustomizedTourItineraryItemZ } from "../../entities/Sales/CustomizedTourItineraryItem";
import {
  CustomizedTourQuoteAdjustmentZ,
  CustomizedTourQuoteDepositZ,
  CustomizedTourQuotePaymentScheduleZ,
  CustomizedTourQuoteStatus,
} from "../../entities/Sales/CustomizedTourQuote";
import { CustomizedTourTaskZ } from "../../entities/Sales/CustomizedTourTask";


const basePath = "/api/sales/customized-tour-bookings";
const quoteBasePath = "/api/sales/customized-tour-quotes";

// --- CustomizedTourBooking Schemas ---
const CreateCustomizedTourBookingBodyZ = CustomizedTourBookingZ.pick({
  tenantOID: true,
  departmentOID: true,
  stationCodeOID: true,
  saleStaffOID: true,
  saleReferrerOID: true,
  bookingReference: true,
  status: true,
  paymentStatus: true,
  overwriteDeposit: true,
  specialInstructions: true,
  insuranceDeclaration: true,
  remarks: true,
  totalAmount: true,
  receivedAmount: true,
});
export type CreateCustomizedTourBookingBody = z.infer<typeof CreateCustomizedTourBookingBodyZ>;

const UpdateCustomizedTourBookingBodyZ = CreateCustomizedTourBookingBodyZ.omit({
  tenantOID: true,
})
  .partial()
  .partial();
export type UpdateCustomizedTourBookingBody = z.infer<typeof UpdateCustomizedTourBookingBodyZ>;

const ConfirmBookingResponseZ = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  errors: z.array(z.string()).optional(),
});
export type ConfirmBookingResponse = z.infer<typeof ConfirmBookingResponseZ>;

const CanModifyResponseZ = z.object({
  canModify: z.boolean(),
  reason: z.string().optional(),
});
export type CanModifyResponse = z.infer<typeof CanModifyResponseZ>;

// --- CustomizedTourBookingPax Schemas ---
const CreateCustomizedTourBookingPaxEntryZ = z.object({
  type: CustomizedTourBookingPaxZ.shape.type,
  personalDetails: CustomizedTourBookingPaxZ.shape.personalDetails,
  mealPreference: CustomizedTourBookingPaxZ.shape.mealPreference,
  documentOIDs: CustomizedTourBookingPaxZ.shape.documentOIDs,
  remarks: CustomizedTourBookingPaxZ.shape.remarks,
  isConfirmed: CustomizedTourBookingPaxZ.shape.isConfirmed,
  confirmedAt: CustomizedTourBookingPaxZ.shape.confirmedAt,
  confirmedByEmail: CustomizedTourBookingPaxZ.shape.confirmedByEmail,
  isLocked: CustomizedTourBookingPaxZ.shape.isLocked,
  lockedAt: CustomizedTourBookingPaxZ.shape.lockedAt,
  lockedBy: CustomizedTourBookingPaxZ.shape.lockedBy,
});

const CreateCustomizedTourBookingPaxBodyZ = z.object({
  pax: z.array(CreateCustomizedTourBookingPaxEntryZ),
});
export type CreateCustomizedTourBookingPaxBody = z.infer<typeof CreateCustomizedTourBookingPaxBodyZ>;

const UpdateCustomizedTourBookingPaxBodyZ = CustomizedTourBookingPaxZ.pick({
  type: true,
  personalDetails: true,
  mealPreference: true,
  documentOIDs: true,
  remarks: true,
  isConfirmed: true,
  confirmedAt: true,
  confirmedByEmail: true,
  isLocked: true,
  lockedAt: true,
  lockedBy: true,
}).partial();
export type UpdateCustomizedTourBookingPaxBody = z.infer<typeof UpdateCustomizedTourBookingPaxBodyZ>;

// --- CustomizedTourItinerary Schemas ---
const CreateCustomizedTourItineraryBodyZ = CustomizedTourItineraryZ.pick({
  tenantOID: true,
  customizedTourBookingOID: true,
  name: true,
  pdfs: true,
});
export type CreateCustomizedTourItineraryBody = z.infer<typeof CreateCustomizedTourItineraryBodyZ>;

const UpdateCustomizedTourItineraryBodyZ = CreateCustomizedTourItineraryBodyZ.omit({
  tenantOID: true,
  customizedTourBookingOID: true,
}).partial();
export type UpdateCustomizedTourItineraryBody = z.infer<typeof UpdateCustomizedTourItineraryBodyZ>;

// --- CustomizedTourItineraryDay Schemas ---
const CreateCustomizedTourItineraryDayBodyZ = CustomizedTourItineraryDayZ.pick({
  tenantOID: true,
  customizedTourItineraryOID: true,
  dayNumber: true,
  title: true,
  description: true,
  files: true,
  internalRemarks: true,
  externalRemarks: true,
});
export type CreateCustomizedTourItineraryDayBody = z.infer<typeof CreateCustomizedTourItineraryDayBodyZ>;

const UpdateCustomizedTourItineraryDayBodyZ = CreateCustomizedTourItineraryDayBodyZ.omit({
  tenantOID: true,
  customizedTourItineraryOID: true,
}).partial();
export type UpdateCustomizedTourItineraryDayBody = z.infer<typeof UpdateCustomizedTourItineraryDayBodyZ>;

// --- CustomizedTourItineraryItem Schemas ---
const CreateCustomizedTourItineraryItemBodyZ = CustomizedTourItineraryItemZ.pick({
  tenantOID: true,
  customizedTourItineraryOID: true,
  category: true,
  supplierOID: true,
  name: true,
  details: true,
  internalRemarks: true,
  externalRemarks: true,
  startsAt: true,
  endsAt: true,
  costEstimated: true,
  priceQuoted: true,
  costActual: true,
  marginPercentage: true,
  linkedCostItemOID: true,
});
export type CreateCustomizedTourItineraryItemBody = z.infer<typeof CreateCustomizedTourItineraryItemBodyZ>;

const UpdateCustomizedTourItineraryItemBodyZ = CreateCustomizedTourItineraryItemBodyZ.omit({
  tenantOID: true,
  customizedTourItineraryOID: true,
}).partial();
export type UpdateCustomizedTourItineraryItemBody = z.infer<typeof UpdateCustomizedTourItineraryItemBodyZ>;

const SetCustomizedTourItineraryDayItemsBatchBodyZ = z.object({
  entries: z.array(z.object({
    dayOID: EntityOIDZ,
    itineraryItemOIDs: z.array(EntityOIDZ),
  })),
});
export type SetCustomizedTourItineraryDayItemsBatchBody = z.infer<typeof SetCustomizedTourItineraryDayItemsBatchBodyZ>;

// --- CustomizedTourCostItem Schemas ---
const CreateCustomizedTourCostItemBodyZ = CustomizedTourCostItemZ.pick({
  tenantOID: true,
  customizedTourBookingOID: true,
  customizedTourItineraryItemOID: true,
  category: true,
  supplierOID: true,
  estCost: true,
  quotedPrice: true,
  actualCost: true,
  margin: true,
});
export type CreateCustomizedTourCostItemBody = z.infer<typeof CreateCustomizedTourCostItemBodyZ>;

const UpdateCustomizedTourCostItemBodyZ = CreateCustomizedTourCostItemBodyZ.omit({
  tenantOID: true,
  customizedTourBookingOID: true,
}).partial();
export type UpdateCustomizedTourCostItemBody = z.infer<typeof UpdateCustomizedTourCostItemBodyZ>;

// --- CustomizedTourQuote Schemas ---
const CreateCustomizedTourQuoteBodyZ = z.object({
  quoteDate: DateISOStringZ.optional(),
  validUntil: DateISOStringZ.optional(),
  currencyCode: z.string().min(3).max(3),
  tax: CustomizedTourQuoteAdjustmentZ.nullish(),
  discount: CustomizedTourQuoteAdjustmentZ.nullish(),
  deposit: CustomizedTourQuoteDepositZ.nullish(),
  finalPaymentDate: DateISOStringZ.nullish(),
  paymentMethods: z.array(z.string()).nullish(),
  paymentSchedule: CustomizedTourQuotePaymentScheduleZ.nullish(),
  termsInternal: z.string().nullish(),
  termsExternal: z.string().nullish(),
  notesInternal: z.string().nullish(),
  notesExternal: z.string().nullish(),
  costItemOIDs: z.array(EntityOIDZ).optional(),
});
export type CreateCustomizedTourQuoteBody = z.infer<typeof CreateCustomizedTourQuoteBodyZ>;

const UpdateCustomizedTourQuoteBodyZ = CreateCustomizedTourQuoteBodyZ.partial().extend({
  status: z.nativeEnum(CustomizedTourQuoteStatus).optional(),
  code: z.string().optional(),
  costItemOIDs: z.array(EntityOIDZ).optional(),
  sentAt: DateISOStringZ.nullish(),
  sentBy: z.string().nullish(),
  sentTo: z.array(z.string()).nullish(),
  acceptedAt: DateISOStringZ.nullish(),
});
export type UpdateCustomizedTourQuoteBody = z.infer<typeof UpdateCustomizedTourQuoteBodyZ>;

const SendCustomizedTourQuoteBodyZ = z.object({
  recipients: z.array(z.string().email()).min(1),
  cc: z.array(z.string().email()).optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
  attachPdf: z.boolean().optional(),
});
export type SendCustomizedTourQuoteBody = z.infer<typeof SendCustomizedTourQuoteBodyZ>;

const CustomizedTourQuoteListQueryZ = z.object({
  statuses: z.array(z.nativeEnum(CustomizedTourQuoteStatus)).optional(),
  includeItems: z.boolean().optional(),
});
export type CustomizedTourQuoteListQuery = z.infer<typeof CustomizedTourQuoteListQueryZ>;

const CustomizedTourQuotePreviewQueryZ = z.object({
  format: z.enum(["html", "pdf", "both"]).default("html"),
});
export type CustomizedTourQuotePreviewQuery = z.infer<typeof CustomizedTourQuotePreviewQueryZ>;

const CustomizedTourQuotePreviewResponseZ = z.object({
  format: z.enum(["html", "pdf", "both"]),
  html: z.string().optional(),
  pdfBase64: z.string().optional(),
  fileName: z.string(),
});
export type CustomizedTourQuotePreviewResponse = z.infer<typeof CustomizedTourQuotePreviewResponseZ>;

const CreateCustomizedTourQuoteResponseZ = z.object({
  quoteOID: EntityOIDZ,
  previewPath: z.string(),
  sendPath: z.string(),
});
export type CreateCustomizedTourQuoteResponse = z.infer<typeof CreateCustomizedTourQuoteResponseZ>;

// --- CustomizedTourTask Schemas ---
const CreateCustomizedTourTaskBodyZ = CustomizedTourTaskZ.pick({
  tenantOID: true,
  customizedTourBookingOID: true,
  customizedTourItineraryItemOID: true,
  supplierOID: true,
  assignedTo: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  startDate: true,
  endDate: true,
  paxCount: true,
  amount: true,
  category: true,
});
export type CreateCustomizedTourTaskBody = z.infer<typeof CreateCustomizedTourTaskBodyZ>;

const UpdateCustomizedTourTaskBodyZ = CreateCustomizedTourTaskBodyZ.omit({
  tenantOID: true,
  customizedTourBookingOID: true,
}).partial();
export type UpdateCustomizedTourTaskBody = z.infer<typeof UpdateCustomizedTourTaskBodyZ>;


export const customizedTourBookingContract = initContract().router({
  getCustomizedTourBookings: {
    summary: "Get customized tour bookings",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: EntityOIDZ,
    }),
    responses: {
      200: z.object({
        oids: z.array(EntityOIDZ),
      }),
    },
  },
  createCustomizedTourBooking: {
    summary: "Create a customized tour booking",
    method: "POST",
    path: basePath,
    body: CreateCustomizedTourBookingBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  updateCustomizedTourBookings: {
    summary: "Update customized tour bookings",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(EntityOIDZ, UpdateCustomizedTourBookingBodyZ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  deleteCustomizedTourBookings: {
    summary: "Delete customized tour bookings",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      bookingOIDs: z.array(EntityOIDZ),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  confirmCustomizedTourBooking: {
    summary: "Confirm customized tour booking",
    method: "POST",
    path: `${basePath}/:bookingOID/confirm`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({
      remarks: z.string().optional(),
    }).optional(),
    responses: {
      200: ConfirmBookingResponseZ,
      400: ConfirmBookingResponseZ,
    },
  },
  canModifyCustomizedTourBooking: {
    summary: "Check if customized tour booking can be modified",
    method: "GET",
    path: `${basePath}/:bookingOID/can-modify`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: CanModifyResponseZ,
    },
  },
  cancelCustomizedTourBooking: {
    summary: "Cancel customized tour booking",
    method: "POST",
    path: `${basePath}/:bookingOID/cancel`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({ remarks: z.string() }),
    responses: {
      200: z.boolean(),
    },
  },

  // #region Customized Tour Booking Pax
  getCustomizedTourBookingPax: {
    summary: "List passengers for a customized tour booking",
    method: "GET",
    path: `${basePath}/:bookingOID/pax`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  createCustomizedTourBookingPax: {
    summary: "Create passengers for a customized tour booking",
    method: "POST",
    path: `${basePath}/:bookingOID/pax`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateCustomizedTourBookingPaxBodyZ,
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  updateCustomizedTourBookingPax: {
    summary: "Batch update passengers for a customized tour booking",
    method: "PUT",
    path: `${basePath}/:bookingOID/pax/batch-update`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.record(z.string(), UpdateCustomizedTourBookingPaxBodyZ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  deleteCustomizedTourBookingPax: {
    summary: "Batch delete passengers for a customized tour booking",
    method: "DELETE",
    path: `${basePath}/:bookingOID/pax/batch-delete`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({
      paxOIDs: z.array(EntityOIDZ),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

  // #region Customized Tour Itineraries
  getCustomizedTourItineraries: {
    summary: "List itineraries for a customized tour booking",
    method: "GET",
    path: `${basePath}/:bookingOID/itineraries`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  createCustomizedTourItinerary: {
    summary: "Create customized tour itinerary",
    method: "POST",
    path: `${basePath}/:bookingOID/itineraries`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateCustomizedTourItineraryBodyZ.omit({
      customizedTourBookingOID: true,
    }),
    responses: {
      201: EntityOIDZ,
    },
  },
  updateCustomizedTourItineraries: {
    summary: "Update customized tour itineraries",
    method: "POST",
    path: `${basePath}/:bookingOID/itineraries/batch-update`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.record(EntityOIDZ, UpdateCustomizedTourItineraryBodyZ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  deleteCustomizedTourItineraries: {
    summary: "Delete customized tour itineraries",
    method: "POST",
    path: `${basePath}/:bookingOID/itineraries/batch-delete`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({ itineraryOIDs: z.array(EntityOIDZ) }),
    responses: {
      200: z.boolean(),
    },
  },

  // #region Customized Tour Itinerary Days
  getCustomizedTourItineraryDays: {
    summary: "List days for a customized tour itinerary",
    method: "GET",
    path: `${basePath}/:itineraryOID/days`,
    pathParams: z.object({ itineraryOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  createCustomizedTourItineraryDay: {
    summary: "Create customized tour itinerary day",
    method: "POST",
    path: `${basePath}/:itineraryOID/days`,
    pathParams: z.object({ itineraryOID: EntityOIDZ }),
    body: CreateCustomizedTourItineraryDayBodyZ.omit({
      customizedTourItineraryOID: true,
    }),
    responses: {
      201: EntityOIDZ,
    },
  },
  updateCustomizedTourItineraryDays: {
    summary: "Update customized tour itinerary days",
    method: "POST",
    path: `${basePath}/:itineraryOID/days/batch-update`,
    pathParams: z.object({ itineraryOID: EntityOIDZ }),
    body: z.record(EntityOIDZ, UpdateCustomizedTourItineraryDayBodyZ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  deleteCustomizedTourItineraryDays: {
    summary: "Delete customized tour itinerary days",
    method: "POST",
    path: `${basePath}/:itineraryOID/days/batch-delete`,
    pathParams: z.object({ itineraryOID: EntityOIDZ }),
    body: z.object({ itineraryDayOIDs: z.array(EntityOIDZ) }),
    responses: {
      200: z.boolean(),
    },
  },

  // #region Customized Tour Itinerary Items
  getCustomizedTourItineraryBacklogItems: {
    summary: "List unscheduled items for a customized tour itinerary",
    method: "GET",
    path: `${basePath}/:itineraryOID/items/unscheduled`,
    pathParams: z.object({ itineraryOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  getCustomizedTourItineraryItems: {
    summary: "List items for a customized tour itinerary day",
    method: "GET",
    path: `${basePath}/:dayOID/items`,
    pathParams: z.object({ dayOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  createCustomizedTourItineraryItem: {
    summary: "Create customized tour itinerary item",
    method: "POST",
    path: `${basePath}/:dayOID/items`,
    pathParams: z.object({ dayOID: EntityOIDZ }),
    body: CreateCustomizedTourItineraryItemBodyZ,
    responses: {
      201: EntityOIDZ,
    },
  },
  setCustomizedTourItineraryDayItemsBatch: {
    summary: "Replace ordered customized tour itinerary items for multiple days",
    method: "PUT",
    path: `${basePath}/day-items`,
    body: SetCustomizedTourItineraryDayItemsBatchBodyZ,
    responses: {
      200: z.object({ updatedDayOIDs: z.array(EntityOIDZ) }),
    },
  },
  updateCustomizedTourItineraryItems: {
    summary: "Update customized tour itinerary items",
    method: "POST",
    path: `${basePath}/:dayOID/items/batch-update`,
    pathParams: z.object({ dayOID: EntityOIDZ }),
    body: z.record(EntityOIDZ, UpdateCustomizedTourItineraryItemBodyZ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  deleteCustomizedTourItineraryItems: {
    summary: "Delete customized tour itinerary items",
    method: "POST",
    path: `${basePath}/:dayOID/items/batch-delete`,
    pathParams: z.object({ dayOID: EntityOIDZ }),
    body: z.object({ itineraryItemOIDs: z.array(EntityOIDZ) }),
    responses: {
      200: z.boolean(),
    },
  },

  // #region Customized Tour Cost Items
  getCustomizedTourCostItems: {
    summary: "List cost items for a customized tour booking",
    method: "GET",
    path: `${basePath}/:bookingOID/cost-items`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  createCustomizedTourCostItem: {
    summary: "Create customized tour cost item",
    method: "POST",
    path: `${basePath}/:bookingOID/cost-items`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateCustomizedTourCostItemBodyZ.omit({
      customizedTourBookingOID: true,
    }),
    responses: {
      201: EntityOIDZ,
    },
  },
  updateCustomizedTourCostItems: {
    summary: "Update customized tour cost items",
    method: "POST",
    path: `${basePath}/:bookingOID/cost-items/batch-update`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.record(EntityOIDZ, UpdateCustomizedTourCostItemBodyZ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  deleteCustomizedTourCostItems: {
    summary: "Delete customized tour cost items",
    method: "POST",
    path: `${basePath}/:bookingOID/cost-items/batch-delete`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({ costItemOIDs: z.array(EntityOIDZ) }),
    responses: {
      200: z.boolean(),
    },
  },

  // #region Customized Tour Quotes
  listCustomizedTourQuotes: {
    summary: "List quotes for a customized tour booking",
    method: "GET",
    path: `${basePath}/:bookingOID/quotes`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    query: CustomizedTourQuoteListQueryZ,
    responses: {
      200: z.object({
        quoteOIDs: z.array(EntityOIDZ),
      }),
    },
  },
  createCustomizedTourQuote: {
    summary: "Create a customized tour quote",
    method: "POST",
    path: `${basePath}/:bookingOID/quotes`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateCustomizedTourQuoteBodyZ,
    responses: {
      201: CreateCustomizedTourQuoteResponseZ,
    },
  },
  previewCustomizedTourQuote: {
    summary: "Preview a customized tour quote",
    method: "GET",
    path: `${quoteBasePath}/:quoteOID/preview`,
    pathParams: z.object({ quoteOID: EntityOIDZ }),
    query: CustomizedTourQuotePreviewQueryZ.optional(),
    responses: {
      200: CustomizedTourQuotePreviewResponseZ,
    },
  },
  updateCustomizedTourQuote: {
    summary: "Update a customized tour quote",
    method: "PATCH",
    path: `${quoteBasePath}/:quoteOID`,
    pathParams: z.object({ quoteOID: EntityOIDZ }),
    body: UpdateCustomizedTourQuoteBodyZ,
    responses: {
      200: CreateCustomizedTourQuoteResponseZ,
    },
  },
  sendCustomizedTourQuote: {
    summary: "Send a customized tour quote",
    method: "POST",
    path: `${quoteBasePath}/:quoteOID/send`,
    pathParams: z.object({ quoteOID: EntityOIDZ }),
    body: SendCustomizedTourQuoteBodyZ,
    responses: {
      200: z.object({ success: z.boolean() }),
    },
  },
  // #endregion

  // #region Customized Tour Tasks
  getCustomizedTourTasks: {
    summary: "List tasks for a customized tour booking",
    method: "GET",
    path: `${basePath}/:bookingOID/tasks`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  createCustomizedTourTask: {
    summary: "Create customized tour task",
    method: "POST",
    path: `${basePath}/:bookingOID/tasks`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: CreateCustomizedTourTaskBodyZ.omit({
      customizedTourBookingOID: true,
    }),
    responses: {
      201: EntityOIDZ,
    },
  },
  updateCustomizedTourTasks: {
    summary: "Update customized tour tasks",
    method: "POST",
    path: `${basePath}/:bookingOID/tasks/batch-update`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.record(EntityOIDZ, UpdateCustomizedTourTaskBodyZ),
    responses: {
      200: z.array(EntityOIDZ),
    },
  },
  deleteCustomizedTourTasks: {
    summary: "Delete customized tour tasks",
    method: "POST",
    path: `${basePath}/:bookingOID/tasks/batch-delete`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    body: z.object({ taskOIDs: z.array(EntityOIDZ) }),
    responses: {
      200: z.boolean(),
    },
  },
});
