// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { CustomerBookingLinkZ } from "../../entities/Sales/CustomerBookingLink";
// CD entities are not available in this submodule, so we'll just use the contract structure directly


const basePath = "/api/sales/customer-booking-links";

// --- Create/Update Schemas ---
const CreateCustomerBookingLinkBodyZ = CustomerBookingLinkZ.pick({
  bookingOID: true,
  customerEmail: true,
}).extend({
  departmentOID: EntityOIDZ.optional(),
});

export type CreateCustomerBookingLink = z.infer<typeof CreateCustomerBookingLinkBodyZ>;

// --- Customer Access Schemas ---
const CustomerLinkAccessRequestZ = z.object({
  email: z.string().email(),
});
export type CustomerLinkAccessRequest = z.infer<typeof CustomerLinkAccessRequestZ>;

// Customer booking response with sensitive data removed for security
// We create a union type that matches both GroupTour and IndependentTour booking structures
const CustomerBookingDataResponseZ = z.union([
  // Group Tour Booking Response (customer-safe fields only)
  z.object({
    bookingReference: z.string(),
    paymentStatus: z.string(), // BookingPaymentStatus enum
    bookingStatus: z.string(), // BookingStatus enum
    totalAmount: z.number(),
    receivedAmount: z.number(),
    fullPaymentDueDate: z.string().nullable(),
    snapshot: z.record(z.unknown()).nullable(), // GroupTourBookingSnapshotData (customer-safe)
    metadata: z.record(z.unknown()).nullable(), // Customer metadata only
    specialInstructions: z.array(z.string()).nullable(),
    liveRoomCount: z.number(),
    livePaxCount: z.number(),
    createdAt: z.string(),
  }),
  // Independent Tour Booking Response (customer-safe fields only)
  z.object({
    bookingReference: z.string(),
    paymentStatus: z.string(), // BookingPaymentStatus enum
    bookingStatus: z.string(), // BookingStatus enum
    totalAmount: z.number(),
    receivedAmount: z.number(),
    fullPaymentDueDate: z.string().nullable(),
    travelStartDate: z.string().nullable(),
    travelEndDate: z.string().nullable(),
    snapshot: z.record(z.unknown()).nullable(), // IndependentTourBookingSnapshotData (customer-safe)
    metadata: z.record(z.unknown()).nullable(), // Customer metadata only
    specialInstructions: z.array(z.string()).nullable(),
    liveRoomCount: z.number(),
    livePaxCount: z.number(),
    liveAddonCount: z.number(),
    createdAt: z.string(),
  }),
]);

// Type inferred from the Zod schema
export type CustomerBookingDataResponse = z.infer<typeof CustomerBookingDataResponseZ>;

// --- Generate Response Schema ---
const GenerateCustomerLinkResponseZ = z.object({
  linkOID: EntityOIDZ,
  linkUrl: z.string().url(), // URL with linkOID, not secure token
  expiresAt: z.string().optional(),
});
export type GenerateCustomerLinkResponse = z.infer<typeof GenerateCustomerLinkResponseZ>;


export const customerBookingLinkContract = initContract().router({
  getCustomerBookingLinks: {
    summary: "Get customer booking links",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },


  deleteCustomerBookingLinks: {
    summary: "Delete multiple customer booking links",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      customerBookingLinkOIDs: z.array(z.string()),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  // #region SPECIALIZED STAFF ENDPOINTS
  generateCustomerLink: {
    summary: "Generate a new customer booking link with QR code",
    method: "POST",
    path: `${basePath}/generate`,
    body: CreateCustomerBookingLinkBodyZ,
    responses: {
      201: GenerateCustomerLinkResponseZ,
    },
  },
  getCustomerLinksByBooking: {
    summary: "Get customer links for a booking",
    method: "GET",
    path: `${basePath}/booking/:bookingOID`,
    pathParams: z.object({ bookingOID: EntityOIDZ }),
    query: z.object({
      tenantOID: EntityOIDZ,
      isActive: z.boolean().optional(),
      isVerified: z.boolean().optional(),
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        items: z.array(CustomerBookingLinkZ.pick({
          oid: true,
          isActive: true,
          isVerified: true,
          expiresAt: true,
        })),
        nextCursor: z.string().nullable(),
      }),
    },
  },
  regenerateCustomerLink: {
    summary: "Regenerate secure token for an existing customer link (requires appropriate permissions, returns full token intentionally for authorized staff)",
    method: "POST",
    path: `${basePath}/:linkOID/regenerate`,
    pathParams: z.object({ linkOID: EntityOIDZ }),
    body: z.object({
      tenantOID: EntityOIDZ,
    }),
    responses: {
      200: GenerateCustomerLinkResponseZ,
    },
  },
  // #endregion

  // #region CUSTOMER ACCESS ENDPOINTS
  accessBookingData: {
    summary: "Retrieve booking data after verification",
    method: "POST",
    path: `${basePath}/access/booking`,
    body: z.object({
      secureToken: z.string(),
    }),
    responses: {
      200: CustomerBookingDataResponseZ,
    },
  },
  requestOtpForAccess: {
    summary: "Request OTP for customer verification using link OID",
    method: "POST",
    path: `${basePath}/access/request-otp`,
    body: z.object({
      linkOID: EntityOIDZ, // Public link OID, not secure token
      email: z.string().email(),
    }),
    responses: {
      200: z.object({
        otpSent: z.boolean(),
        message: z.string(),
      }),
    },
  },
  validateOtpForAccess: {
    summary: "Validate OTP and receive secure token for booking access",
    method: "POST",
    path: `${basePath}/access/validate-otp`,
    body: z.object({
      linkOID: EntityOIDZ, // Public link OID, not secure token
      email: z.string().email(),
      otpCode: z.string(),
    }),
    responses: {
      200: z.object({
        verified: z.boolean(),
        message: z.string(),
        secureToken: z.string().optional(), // Return secure token on successful validation
      }),
    },
  },
  // #endregion
});
