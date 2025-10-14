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
  // NEW: Payment & Booking
  PAYMENT_REMINDER = "payment.reminder",
  PAYMENT_RECEIVED = "payment.received",
  BOOKING_DETAIL_UPDATED_BY_CUSTOMER = "booking.detail-updated-by-customer",
  // NEW: System & Account
  USER_PASSWORD_RESET = "user.password-reset",
  // NEW: Operations
  STAFF_ASSIGNMENT_CHANGE = "staff.assignment-change",
  // NEW: Approval Workflow
  APPROVAL_REQUEST_APPROVED = "approval.request-approved",
  APPROVAL_REQUEST_REJECTED = "approval.request-rejected",
  APPROVAL_REQUEST_ABORTED = "approval.request-aborted",
  APPROVAL_EO_FOLLOW_UP = "approval.eo-follow-up",
  APPROVAL_REFUND_FOLLOW_UP = "approval.refund-follow-up",
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

// NEW: Additional Email Context Interfaces

export interface ContactInfo {
  icon?: string;
  value: string;
  url?: string;
}

export interface SocialInfo {
  icon: string;
  url?: string;
}

export interface PaymentReminderEmailContext extends BaseEmailContext {
  ref: string;
  time: string;
  totalAmount: string;
  createTime: string;
  cancelTime: string;
  host: string;
  detailLink: string;
  companyName: string;
  companySecondNames?: string[];
  companyCodes?: string[];
  contacts?: ContactInfo[];
  socials?: SocialInfo[];
}

export interface PaymentReceivedEmailContext extends BaseEmailContext {
  amount: string;
  paymentDate: string;
  companyName: string;
  companySecondNames?: string[];
  companyCodes?: string[];
  contacts?: ContactInfo[];
  socials?: SocialInfo[];
}

export interface BookingDetailUpdatedByCustomerEmailContext extends BaseEmailContext {
  staffName: string;
  bookingRef: string;
  detailLink: string;
  companyName: string;
  companySecondNames?: string[];
  companyCodes?: string[];
  contacts?: ContactInfo[];
  socials?: SocialInfo[];
}

export interface UserPasswordResetEmailContext extends BaseEmailContext {
  userName: string;
  staffCode: string;
  password: string;
}

export interface StaffAssignmentChangeEmailContext extends BaseEmailContext {
  oldStaff: string;
  roleType: string;
  ref: string;
  oldStaffCode: string;
  newStaff: string;
  newStaffCode: string;
  date: string;
  operator: string;
  reason?: string;
  companyName: string;
  companySecondNames?: string[];
  companyCodes?: string[];
  contacts?: ContactInfo[];
  socials?: SocialInfo[];
}

export interface ApprovalRequestApprovedEmailContext extends BaseEmailContext {
  moduleName: string;
  moduleRef: string;
  details?: string[];
  detailLink: string;
  companyName: string;
  companySecondNames?: string[];
  companyCodes?: string[];
  contacts?: ContactInfo[];
  socials?: SocialInfo[];
}

export interface ApprovalRequestRejectedEmailContext extends BaseEmailContext {
  rejectedStaffName: string;
  moduleName: string;
  moduleRef: string;
  details?: string[];
  detailLink: string;
  companyName: string;
  companySecondNames?: string[];
  companyCodes?: string[];
  contacts?: ContactInfo[];
  socials?: SocialInfo[];
}

export interface ApprovalRequestAbortedEmailContext extends BaseEmailContext {
  requestedStaffName: string;
  moduleName: string;
  moduleRef: string;
  details?: string[];
  companyName: string;
  companySecondNames?: string[];
  companyCodes?: string[];
  contacts?: ContactInfo[];
  socials?: SocialInfo[];
}

export interface ApprovalEoFollowUpEmailContext extends BaseEmailContext {
  moduleName: string;
  moduleRef: string;
  supplierFullName: string;
  tourCode: string;
  approvalDate: string;
  host: string;
  detailLink: string;
  companyName: string;
  companySecondNames?: string[];
  companyCodes?: string[];
  contacts?: ContactInfo[];
  socials?: SocialInfo[];
}

export interface ApprovalRefundFollowUpEmailContext extends BaseEmailContext {
  moduleRef: string;
  requestRef: string;
  refundRef: string;
  bookingRef: string;
  approvalDate: string;
  host: string;
  refundLink: string;
  companyName: string;
  companySecondNames?: string[];
  companyCodes?: string[];
  contacts?: ContactInfo[];
  socials?: SocialInfo[];
}

// Email Template Context Registry with labels and descriptions

export const EmailTemplateContextRegistry = {
  [EmailTemplateKey.PAYMENT_REQUEST]: {
    context: {} as PaymentEmailContext,
    label: "Payment Request",
    description: "Payment request email for tour bookings",
  },
  [EmailTemplateKey.USER_INVITATION]: {
    context: {} as UserInvitationEmailContext,
    label: "User Invitation",
    description: "User invitation email with activation link",
  },
  [EmailTemplateKey.GROUP_TOUR_BOOKING_CONFIRMATION]: {
    context: {} as GroupTourBookingConfirmationEmailContext,
    label: "Group Tour Booking Confirmation",
    description: "Confirmation email for group tour bookings",
  },
  [EmailTemplateKey.INDEPENDENT_TOUR_BOOKING_CONFIRMATION]: {
    context: {} as IndependentTourBookingConfirmationEmailContext,
    label: "Independent Tour Booking Confirmation",
    description: "Confirmation email for independent tour bookings",
  },
  [EmailTemplateKey.INDEPENDENT_TOUR_BOOKING_CANCELLATION]: {
    context: {} as IndependentTourBookingCancellationEmailContext,
    label: "Independent Tour Booking Cancellation",
    description: "Cancellation notification for independent tour bookings",
  },
  [EmailTemplateKey.USER_MESSAGE_NOTIFICATION]: {
    context: {} as UserMessageEmailContext,
    label: "User Message Notification",
    description: "General user message notification",
  },
  [EmailTemplateKey.APPROVAL_NOTIFICATION]: {
    context: {} as ApprovalNotificationEmailContext,
    label: "Approval Notification",
    description: "Notification to approver for pending approval request",
  },
  [EmailTemplateKey.APPROVAL_OUTCOME]: {
    context: {} as ApprovalOutcomeEmailContext,
    label: "Approval Outcome",
    description: "Notification of approval request outcome to submitter",
  },
  [EmailTemplateKey.APPROVAL_TIMEOUT_WARNING]: {
    context: {} as ApprovalTimeoutWarningEmailContext,
    label: "Approval Timeout Warning",
    description: "Warning to approver about approaching timeout",
  },
  [EmailTemplateKey.TOUR_DEPARTURE_MIN_PAX_ALERT]: {
    context: {} as TourDepartureMinPaxAlertEmailContext,
    label: "Tour Departure Minimum Pax Alert",
    description: "Alert for tour departures below minimum passenger count",
  },
  [EmailTemplateKey.CUSTOMER_VERIFICATION_OTP]: {
    context: {} as CustomerVerificationOtpEmailContext,
    label: "Customer Verification OTP",
    description: "OTP verification email for customer booking access",
  },
  [EmailTemplateKey.CUSTOMER_BOOKING_LINK]: {
    context: {} as CustomerBookingLinkEmailContext,
    label: "Customer Booking Link",
    description: "Secure link email for customer to access their booking",
  },
  [EmailTemplateKey.PAYMENT_REMINDER]: {
    context: {} as PaymentReminderEmailContext,
    label: "Payment Reminder",
    description: "Reminder email for bookings near auto-void deadline",
  },
  [EmailTemplateKey.PAYMENT_RECEIVED]: {
    context: {} as PaymentReceivedEmailContext,
    label: "Payment Received",
    description: "Payment confirmation thank you email",
  },
  [EmailTemplateKey.BOOKING_DETAIL_UPDATED_BY_CUSTOMER]: {
    context: {} as BookingDetailUpdatedByCustomerEmailContext,
    label: "Booking Detail Updated by Customer",
    description: "Notification to staff when customer updates booking details",
  },
  [EmailTemplateKey.USER_PASSWORD_RESET]: {
    context: {} as UserPasswordResetEmailContext,
    label: "User Password Reset",
    description: "Staff password reset notification with new credentials",
  },
  [EmailTemplateKey.STAFF_ASSIGNMENT_CHANGE]: {
    context: {} as StaffAssignmentChangeEmailContext,
    label: "Staff Assignment Change",
    description: "Notification when staff is unassigned from a booking",
  },
  [EmailTemplateKey.APPROVAL_REQUEST_APPROVED]: {
    context: {} as ApprovalRequestApprovedEmailContext,
    label: "Approval Request Approved",
    description: "Notification when approval request is approved",
  },
  [EmailTemplateKey.APPROVAL_REQUEST_REJECTED]: {
    context: {} as ApprovalRequestRejectedEmailContext,
    label: "Approval Request Rejected",
    description: "Notification when approval request is rejected",
  },
  [EmailTemplateKey.APPROVAL_REQUEST_ABORTED]: {
    context: {} as ApprovalRequestAbortedEmailContext,
    label: "Approval Request Aborted",
    description: "Notification when approval request is withdrawn by submitter",
  },
  [EmailTemplateKey.APPROVAL_EO_FOLLOW_UP]: {
    context: {} as ApprovalEoFollowUpEmailContext,
    label: "Approval EO Follow Up",
    description: "EO approval follow-up notification for operations staff",
  },
  [EmailTemplateKey.APPROVAL_REFUND_FOLLOW_UP]: {
    context: {} as ApprovalRefundFollowUpEmailContext,
    label: "Approval Refund Follow Up",
    description: "Refund approval follow-up notification for finance staff",
  },
} as const;

export type EmailTemplateContext<K extends EmailTemplateKey> = typeof EmailTemplateContextRegistry[K]["context"];
