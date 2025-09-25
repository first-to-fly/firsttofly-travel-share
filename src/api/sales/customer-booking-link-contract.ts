// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { CustomerBookingLinkZ } from "../../entities/Sales/CustomerBookingLink";
// CD entities are not available in this submodule, so we'll just use the contract structure directly


const basePath = "/api/customer-booking-links";

// --- Create/Update Schemas ---
const CreateCustomerBookingLinkBodyZ = CustomerBookingLinkZ.pick({
  bookingOID: true,
  customerEmail: true,
});

export type CreateCustomerBookingLink = z.infer<typeof CreateCustomerBookingLinkBodyZ>;

const CustomerPaxDocumentFileZ = z.object({
  url: z.string(),
  name: z.string().optional(),
  mimeType: z.string().optional(),
  size: z.number().optional(),
});

const CustomerPaxDocumentZ = z.object({
  documentId: z.string(),
  documentOID: z.string(),
  type: z.string(),
  name: z.string().optional(),
  docIdentification: z.string().optional(),
  issuedDate: z.string().optional(),
  expiryDate: z.string().optional(),
  files: z.array(CustomerPaxDocumentFileZ),
});

const CustomerPaxDetailZ = z.object({
  paxOID: z.string(),
  paxType: z.string(),
  personalDetails: z.record(z.unknown()).nullable(),
  mealPreference: z.string().nullable(),
  remarks: z.string().nullable(),
  isConfirmed: z.boolean(),
  confirmedAt: z.string().nullable(),
  roomOID: z.string().nullable(),
  isLandTourOnly: z.boolean().optional(),
  documents: z.array(CustomerPaxDocumentZ),
});

const GroupRoomDetailZ = z.object({
  roomOID: z.string(),
  roomNumber: z.string().nullable(),
  status: z.string(),
  notes: z.string().nullable(),
  paxOIDs: z.array(z.string()),
  isDoubleOccupancy: z.boolean(),
});

const IndependentRoomDetailZ = z.object({
  roomOID: z.string(),
  roomNumber: z.string().nullable(),
  status: z.string(),
  notes: z.string().nullable(),
  paxOIDs: z.array(z.string()),
  occupancy: z.record(z.unknown()),
});

// Payment information schemas for customer viewing
const CustomerTransactionFileZ = z.object({
  url: z.string(),
  name: z.string().optional(),
  mimeType: z.string().optional(),
  size: z.number().optional(),
});

const CustomerPayerDetailsZ = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  mobile: z.string().optional(),
});

const CustomerPaymentWayZ = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
});

const CustomerTransactionZ = z.object({
  transactionId: z.string(),
  amount: z.number(),
  serviceFee: z.number(),
  transactionType: z.string(),
  transactionDate: z.string(),
  status: z.string(),
  transactionReference: z.string().optional(),
  payerDetails: CustomerPayerDetailsZ.optional(),
  paymentWay: CustomerPaymentWayZ.optional(),
  receiptFiles: z.array(CustomerTransactionFileZ).optional(),
});

const CustomerPaymentOrderZ = z.object({
  amount: z.number(),
  received: z.number(),
  minPaymentPrice: z.number(),
  currencyCode: z.string(),
  status: z.string(),
});

const CustomerPaymentInfoZ = z.object({
  totalAmount: z.number(),
  receivedAmount: z.number(),
  outstandingAmount: z.number(),
  currency: z.string().optional(),
  paymentStatus: z.string(),
  fullPaymentDueDate: z.string().optional(),
  paymentOrder: CustomerPaymentOrderZ.optional(),
  transactions: z.array(CustomerTransactionZ).optional(),
});

// --- Customer Access Schemas ---
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomerLinkAccessRequestZ = z.object({
  email: z.string().email(),
});
export type CustomerLinkAccessRequest = z.infer<typeof CustomerLinkAccessRequestZ>;

// Customer booking response with sensitive data removed for security
// We create a union type that matches both GroupTour and IndependentTour booking structures
export const CustomerBookingDataResponseZ = z.union([
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
    isCustomerConfirmed: z.boolean(),
    customerConfirmedAt: z.string().nullable(),
    rooms: z.array(GroupRoomDetailZ),
    pax: z.array(CustomerPaxDetailZ),
    paymentInfo: CustomerPaymentInfoZ.optional(),
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
    isCustomerConfirmed: z.boolean(),
    customerConfirmedAt: z.string().nullable(),
    rooms: z.array(IndependentRoomDetailZ),
    pax: z.array(CustomerPaxDetailZ.omit({ isLandTourOnly: true })),
    paymentInfo: CustomerPaymentInfoZ.optional(),
  }),
]);

// Type inferred from the Zod schema
export type CustomerBookingDataResponse = z.infer<typeof CustomerBookingDataResponseZ>;

const GenerateCustomerLinkResponseZ = z.object({
  linkOID: EntityOIDZ,
  linkUrl: z.string().url(), // URL with linkOID, not secure token
  expiresAt: z.string().optional(),
});
export type GenerateCustomerLinkResponse = z.infer<typeof GenerateCustomerLinkResponseZ>;

const SecureTokenBodyZ = z.object({
  secureToken: z.string().min(1, "secureToken is required"),
});


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
  createCustomerLink: {
    summary: "Create a new customer booking link with QR code",
    method: "POST",
    path: `${basePath}/create`,
    body: CreateCustomerBookingLinkBodyZ,
    responses: {
      200: z.string(),
    },
  },
  getCustomerLinksByBooking: {
    summary: "Get customer links for a booking",
    method: "POST",
    path: `${basePath}/get-by-booking`,
    body: z.object({
      bookingOID: EntityOIDZ,
      tenantOID: EntityOIDZ,
    }),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },
  regenerateCustomerLink: {
    summary: "Regenerate secure token for an existing customer link (requires appropriate permissions, returns full token intentionally for authorized staff)",
    method: "POST",
    path: `${basePath}/regenerate`,
    body: z.object({
      linkOID: EntityOIDZ,
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
      200: z.boolean(),
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
  confirmBooking: {
    summary: "Mark booking as customer confirmed",
    method: "POST",
    path: `${basePath}/booking/confirm`,
    body: SecureTokenBodyZ,
    responses: {
      200: z.object({
        bookingOID: z.string(),
        isCustomerConfirmed: z.boolean(),
      }),
    },
  },
  // #endregion

});
