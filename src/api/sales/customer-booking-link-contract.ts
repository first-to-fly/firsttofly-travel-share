// simple-import-sort
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { CustomerBookingLinkZ } from "../../entities/Sales/CustomerBookingLink";


const basePath = "/api/sales/customer-booking-links";

// --- Create/Update Schemas ---
const CreateCustomerBookingLinkBodyZ = CustomerBookingLinkZ.pick({
  tenantOID: true,
  bookingOID: true,
  expiresAt: true,
}).extend({
  departmentOID: EntityOIDZ.optional(),
});

const UpdateCustomerBookingLinkZ = CreateCustomerBookingLinkBodyZ.omit({
  tenantOID: true,
}).partial();

export type CreateCustomerBookingLink = z.infer<typeof CreateCustomerBookingLinkBodyZ>;
export type UpdateCustomerBookingLink = z.infer<typeof UpdateCustomerBookingLinkZ>;

// --- Customer Access Schemas ---
const CustomerLinkAccessRequestZ = z.object({
  email: z.string().email(),
});
export type CustomerLinkAccessRequest = z.infer<typeof CustomerLinkAccessRequestZ>;

const CustomerBookingDataResponseZ = z.object({
  bookingReference: z.string(),
  totalAmount: z.number().optional(),
  receivedAmount: z.number().optional(),
  paymentStatus: z.string(),
  bookingStatus: z.string(),
  customerEmail: z.string().email(),
  travelers: z.array(z.object({
    name: z.string(),
    type: z.string(),
    personalDetails: z.object({}).passthrough().optional(),
  })).optional(),
  summary: z.object({}).passthrough().optional(),
});
export type CustomerBookingDataResponse = z.infer<typeof CustomerBookingDataResponseZ>;

// --- Generate Response Schema ---
const GenerateCustomerLinkResponseZ = z.object({
  linkOID: EntityOIDZ,
  secureToken: z.string().min(32).max(256),
  linkUrl: z.string().url(),
  qrCodeDataUrl: z.string().regex(/^data:image\/(png|svg\+xml);base64,/).or(z.string().url()),
  expiresAt: z.string().optional(),
});
export type GenerateCustomerLinkResponse = z.infer<typeof GenerateCustomerLinkResponseZ>;


export const customerBookingLinkContract = initContract().router({
  // #region STANDARD CRUD ENDPOINTS
  getCustomerBookingLinks: {
    summary: "Get customer booking links",
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

  createCustomerBookingLink: {
    summary: "Create a new customer booking link",
    method: "POST",
    path: basePath,
    body: CreateCustomerBookingLinkBodyZ,
    responses: {
      200: EntityOIDZ,
    },
  },

  updateCustomerBookingLinks: {
    summary: "Update multiple existing customer booking links",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      EntityOIDZ.describe("OID of CustomerBookingLink to update"),
      UpdateCustomerBookingLinkZ,
    ),
    responses: {
      200: z.array(EntityOIDZ.describe("OIDs of updated CustomerBookingLinks")),
    },
  },

  deleteCustomerBookingLinks: {
    summary: "Delete multiple customer booking links",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      customerBookingLinkOIDs: z.array(EntityOIDZ.describe("OIDs of CustomerBookingLinks to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
  // #endregion

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
  verifyCustomerIdentity: {
    summary: "Verify customer email against booking data",
    method: "POST",
    path: `${basePath}/access/:secureToken/verify`,
    pathParams: z.object({ secureToken: z.string() }),
    body: CustomerLinkAccessRequestZ,
    responses: {
      200: z.object({
        verified: z.boolean(),
        message: z.string(),
      }),
      401: z.object({ message: z.string() }),
      403: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
      410: z.object({ message: z.string() }),
    },
  },
  accessBookingData: {
    summary: "Retrieve booking data after verification",
    method: "GET",
    path: `${basePath}/access/:secureToken/booking`,
    pathParams: z.object({ secureToken: z.string() }),
    responses: {
      200: CustomerBookingDataResponseZ,
      401: z.object({ message: z.string() }),
      403: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
      410: z.object({ message: z.string() }),
    },
  },
  requestOtpForAccess: {
    summary: "Request OTP for customer verification",
    method: "POST",
    path: `${basePath}/access/:secureToken/request-otp`,
    pathParams: z.object({ secureToken: z.string() }),
    body: z.object({
      email: z.string().email(),
    }),
    responses: {
      200: z.object({
        otpSent: z.boolean(),
        message: z.string(),
      }),
      401: z.object({ message: z.string() }),
      403: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
      410: z.object({ message: z.string() }),
    },
  },
  validateOtpForAccess: {
    summary: "Validate OTP and grant access to booking",
    method: "POST",
    path: `${basePath}/access/:secureToken/validate-otp`,
    pathParams: z.object({ secureToken: z.string() }),
    body: z.object({
      email: z.string().email(),
      otpCode: z.string(),
    }),
    responses: {
      200: z.object({
        verified: z.boolean(),
        message: z.string(),
      }),
      401: z.object({ message: z.string() }),
      403: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
      410: z.object({ message: z.string() }),
    },
  },
  // #endregion
});

// Export separate contracts for staff and public endpoints
export const customerBookingLinkStaffContract = initContract().router({
  // Standard CRUD endpoints
  getCustomerBookingLinks: customerBookingLinkContract.getCustomerBookingLinks,
  createCustomerBookingLink: customerBookingLinkContract.createCustomerBookingLink,
  updateCustomerBookingLinks: customerBookingLinkContract.updateCustomerBookingLinks,
  deleteCustomerBookingLinks: customerBookingLinkContract.deleteCustomerBookingLinks,

  // Specialized endpoints
  generateCustomerLink: customerBookingLinkContract.generateCustomerLink,
  getCustomerLinksByBooking: customerBookingLinkContract.getCustomerLinksByBooking,
  regenerateCustomerLink: customerBookingLinkContract.regenerateCustomerLink,
});

export const customerBookingLinkPublicContract = initContract().router({
  verifyCustomerIdentity: customerBookingLinkContract.verifyCustomerIdentity,
  accessBookingData: customerBookingLinkContract.accessBookingData,
  requestOtpForAccess: customerBookingLinkContract.requestOtpForAccess,
  validateOtpForAccess: customerBookingLinkContract.validateOtpForAccess,
});
