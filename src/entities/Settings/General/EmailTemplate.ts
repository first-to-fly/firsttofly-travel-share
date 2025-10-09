import { z } from "zod";

import { MultiLangRecordZ } from "../../../types/multipleLanguage";
import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";
import type { ApprovalRequestStatus } from "../../Operations/ApprovalRequest";


export enum EmailTemplateKey {
  PAYMENT_REQUEST = "payment.request",
  USER_INVITATION = "user.invitation",
  GROUP_TOUR_BOOKING_CONFIRMATION = "group-tour.booking.confirmation",
  INDEPENDENT_TOUR_BOOKING_CONFIRMATION = "independent-tour.booking.confirmation",
  INDEPENDENT_TOUR_BOOKING_CANCELLATION = "independent-tour.booking.cancellation",
  USER_MESSAGE_NOTIFICATION = "user-message.notification",
  APPROVAL_NOTIFICATION = "approval.notification",
  APPROVAL_OUTCOME = "approval.outcome",
  APPROVAL_TIMEOUT_WARNING = "approval.timeout-warning",
  TOUR_DEPARTURE_MIN_PAX_ALERT = "tour-departure.min-pax-alert",
  CUSTOMER_VERIFICATION_OTP = "customer.verification-otp",
  CUSTOMER_BOOKING_LINK = "customer.booking-link",
}

export const EmailTemplateKeyZ = z.nativeEnum(EmailTemplateKey);

export enum EmailTemplateEvents {
  EMAIL_TEMPLATE_UPDATED = "EMAIL_TEMPLATE_UPDATED",
  EMAIL_TEMPLATE_LIST_UPDATED = "EMAIL_TEMPLATE_LIST_UPDATED",
}

export const EmailTemplateZ = EntityZ.extend({
  entityType: z.literal(EntityType.EMAIL_TEMPLATE),
  tenantOID: EntityOIDZ.nullish(),
  key: EmailTemplateKeyZ,
  subjectTemplate: MultiLangRecordZ(z.string()),
  bodyTemplate: MultiLangRecordZ(z.string()),
  textTemplate: MultiLangRecordZ(z.string().nullish()),
});

export type EmailTemplate = z.infer<typeof EmailTemplateZ>;


// Email Context Interfaces

export interface BaseEmailContext {
  tenantName: string;
  currentYear: number;
}

export interface PaymentEmailContext extends BaseEmailContext {
  tourName: string;
  bookingReference: string;
  departureDate?: string;
  amount: number;
  currency: string;
  paymentLinkUrl: string;
}

export interface UserInvitationEmailContext extends BaseEmailContext {
  activationUrl: string;
  expiryDays: number;
}

export interface GroupTourBookingConfirmationEmailContext extends BaseEmailContext {
  groupTourBookingReference: string;
  departureCode: string;
  departureDate: string;
  totalAmount: string;
  currency: string;
  passengerCount: number;
  passengerDetails: Array<{
    name: string;
    isAdult: boolean;
    mealPreference?: string;
  }>;
  bookedRooms?: Array<{
    type: string;
    quantity: number;
  }>;
  itinerary?: {
    days: Array<{
      dayNumber: number;
      title: string;
      description?: string;
    }>;
  };
  specialInstructions?: string[];
}

export interface UserMessageEmailContext extends BaseEmailContext {
  title: string;
  messageBody: string;
  messageUrl?: string;
  actionText?: string;
}

export interface IndependentTourBookingConfirmationEmailContext extends BaseEmailContext {
  bookingReference: string;
  productName: string;
  accommodationName?: string;
  travelStartDate: string;
  travelEndDate: string;
  totalAmount: string;
  currency: string;
  passengerCount: number;
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
  rooms: Array<{
    roomNumber?: string;
    roomType?: string;
    passengers: Array<{
      name: string;
      type: string;
      mealPreference?: string;
    }>;
  }>;
  discounts?: Array<{
    code?: string;
    amount: number;
  }>;
  specialInstructions?: string[];
  paymentStatus: string;
}

export interface CustomerVerificationOtpEmailContext extends BaseEmailContext {
  otpCode: string;
  expiryMinutes: number;
  bookingReference: string;
  qrCodeDataUrl?: string;
  customerBookingUrl?: string;
  tourName?: string;
  departureDate?: string;
  departureCode?: string;
  totalAmount?: number;
  currency?: string;
  passengerCount?: number;
  bookingStatus?: string;
  paymentStatus?: string;
}

export interface CustomerBookingLinkEmailContext extends BaseEmailContext {
  customerEmail: string;
  bookingReference: string;
  customerBookingUrl: string;
  expiryDate: string;
  tourName?: string;
  departureDate?: string;
  departureCode?: string;
  totalAmount?: number;
  currency?: string;
  passengerCount?: number;
  bookingStatus?: string;
  paymentStatus?: string;
}

export interface TourDepartureMinPaxAlertEmailContext extends BaseEmailContext {
  departureCode: string;
  departureDate: string | Date;
  minimumPax: number;
  bookedPax: number;
  gap: number;
  lookaheadDays: number;
  formattedDepartureDate?: string;
}

export interface IndependentTourBookingCancellationEmailContext extends BaseEmailContext {
  bookingReference: string;
  productName: string;
  accommodationName?: string;
  travelStartDate: string;
  travelEndDate: string;
  totalAmount: string;
  currency: string;
  passengerCount: number;
  cancellationReason: string;
  cancellationDate: string;
  originalDueDate: string;
}

export interface ApprovalNotificationEmailContext extends BaseEmailContext {
  approverName: string;
  approvalName: string;
  submitterName: string;
  targetEntityDescription: string;
  approvalUrl: string;
  level: number;
  minApprovers: number;
  timeoutDays: number;
  comments?: string;
}

export interface ApprovalOutcomeEmailContext extends BaseEmailContext {
  submitterName: string;
  approvalName: string;
  targetEntityDescription: string;
  outcome: ApprovalRequestStatus;
  reason?: string;
  finalApproverName?: string;
  completedAt: string;
  detailsUrl?: string;
}

export interface ApprovalTimeoutWarningEmailContext extends BaseEmailContext {
  approverName: string;
  approvalName: string;
  submitterName: string;
  targetEntityDescription: string;
  approvalUrl: string;
  level: number;
  timeRemaining: string;
  timeRemainingHours: number;
  originalTimeoutDays: number;
}


// Email Template Context Registry with descriptions

export interface EmailTemplateContextRegistry {
  [EmailTemplateKey.PAYMENT_REQUEST]: {
    context: PaymentEmailContext;
    description: "Payment request email for tour bookings";
  };
  [EmailTemplateKey.USER_INVITATION]: {
    context: UserInvitationEmailContext;
    description: "User invitation email with activation link";
  };
  [EmailTemplateKey.GROUP_TOUR_BOOKING_CONFIRMATION]: {
    context: GroupTourBookingConfirmationEmailContext;
    description: "Confirmation email for group tour bookings";
  };
  [EmailTemplateKey.INDEPENDENT_TOUR_BOOKING_CONFIRMATION]: {
    context: IndependentTourBookingConfirmationEmailContext;
    description: "Confirmation email for independent tour bookings";
  };
  [EmailTemplateKey.INDEPENDENT_TOUR_BOOKING_CANCELLATION]: {
    context: IndependentTourBookingCancellationEmailContext;
    description: "Cancellation notification for independent tour bookings";
  };
  [EmailTemplateKey.USER_MESSAGE_NOTIFICATION]: {
    context: UserMessageEmailContext;
    description: "General user message notification";
  };
  [EmailTemplateKey.APPROVAL_NOTIFICATION]: {
    context: ApprovalNotificationEmailContext;
    description: "Notification to approver for pending approval request";
  };
  [EmailTemplateKey.APPROVAL_OUTCOME]: {
    context: ApprovalOutcomeEmailContext;
    description: "Notification of approval request outcome to submitter";
  };
  [EmailTemplateKey.APPROVAL_TIMEOUT_WARNING]: {
    context: ApprovalTimeoutWarningEmailContext;
    description: "Warning to approver about approaching timeout";
  };
  [EmailTemplateKey.TOUR_DEPARTURE_MIN_PAX_ALERT]: {
    context: TourDepartureMinPaxAlertEmailContext;
    description: "Alert for tour departures below minimum passenger count";
  };
  [EmailTemplateKey.CUSTOMER_VERIFICATION_OTP]: {
    context: CustomerVerificationOtpEmailContext;
    description: "OTP verification email for customer booking access";
  };
  [EmailTemplateKey.CUSTOMER_BOOKING_LINK]: {
    context: CustomerBookingLinkEmailContext;
    description: "Secure link email for customer to access their booking";
  };
}

export type EmailTemplateContext<K extends EmailTemplateKey> = EmailTemplateContextRegistry[K]["context"];
