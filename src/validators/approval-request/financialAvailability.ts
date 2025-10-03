import { ApprovalRequestStatus } from "../../entities/Operations/ApprovalRequest";
import type {
  ApprovalRequestBookingCancellationMetadata,
  ApprovalRequestBookingTransferMetadata,
  ApprovalRequestCustomerCancellationFeeMetadata,
  ApprovalRequestCustomerRefundMetadata,
  ApprovalRequestMetadata,
} from "../../entities/Operations/ApprovalRequestMetadata";
import { ApprovalType } from "../../entities/Settings/General/Approval";
import { ArithUtil } from "../../utils/arithUtil";


export interface FinancialApprovalRequestLike {
  oid?: string;
  approvalType: ApprovalType;
  status: ApprovalRequestStatus;
  metadata?: ApprovalRequestMetadata | null;
}

export interface PendingFinancialBreakdown {
  pendingRefundRequests: number;
  pendingCancellationFeeRequests: number;
  pendingCancelBookingRequests: number;
  pendingBookingTransferRequests: number;
}

export interface BookingFinancialAvailability {
  paidAmount: number;
  allocatableAmount: number;
  pendingTotals: PendingFinancialBreakdown;
  totalPendingAmount: number;
  availableAmount: number;
}

const EMPTY_BREAKDOWN_CENTS = {
  pendingRefundRequests: 0,
  pendingCancellationFeeRequests: 0,
  pendingCancelBookingRequests: 0,
  pendingBookingTransferRequests: 0,
} as const;

const PENDING_STATUSES = new Set<ApprovalRequestStatus>([
  ApprovalRequestStatus.IN_PROGRESS,
]);

function isCustomerRefundMetadata(metadata: ApprovalRequestMetadata | null | undefined): metadata is ApprovalRequestCustomerRefundMetadata {
  return metadata?.type === ApprovalType.CUSTOMER_REFUND_REQUEST;
}

function isCustomerCancellationFeeMetadata(metadata: ApprovalRequestMetadata | null | undefined): metadata is ApprovalRequestCustomerCancellationFeeMetadata {
  return metadata?.type === ApprovalType.CUSTOMER_CANCELLATION_FEE_REQUEST;
}

function isBookingCancellationMetadata(metadata: ApprovalRequestMetadata | null | undefined): metadata is ApprovalRequestBookingCancellationMetadata {
  return metadata?.type === ApprovalType.BOOKING_CANCELLATION_WITH_FINANCIALS;
}

function isBookingTransferMetadata(metadata: ApprovalRequestMetadata | null | undefined): metadata is ApprovalRequestBookingTransferMetadata {
  return metadata?.type === ApprovalType.BOOKING_TRANSFER;
}

function toPositiveCents(amount: number | null | undefined): number {
  if (typeof amount !== "number" || Number.isNaN(amount) || !Number.isFinite(amount)) {
    return 0;
  }
  if (amount <= 0) {
    return 0;
  }
  return ArithUtil.toCents(amount);
}

function calculatePendingRefundCents(metadata: ApprovalRequestCustomerRefundMetadata): number {
  return toPositiveCents(metadata.amount);
}

function calculatePendingCancellationFeeCents(metadata: ApprovalRequestCustomerCancellationFeeMetadata): number {
  return toPositiveCents(metadata.amount);
}

function normalizeCurrencyCode(value: string | null | undefined): string | null {
  return value ? value.trim().toUpperCase() : null;
}

function calculatePendingCancelBookingCents(metadata: ApprovalRequestBookingCancellationMetadata): number {
  const refundAmountCents = toPositiveCents(metadata.refund?.requestedAmount ?? metadata.financialSummary?.refundAmount);
  if (refundAmountCents === 0) {
    return 0;
  }

  const cancellationFeeAmountCents = toPositiveCents(metadata.cancellationFee?.amount ?? metadata.financialSummary?.cancellationFeeAmount);
  if (cancellationFeeAmountCents === 0) {
    return refundAmountCents;
  }

  const refundCurrency = normalizeCurrencyCode(metadata.refund?.currencyCode);
  const feeCurrency = normalizeCurrencyCode(metadata.cancellationFee?.currencyCode);

  if (refundCurrency && feeCurrency && refundCurrency === feeCurrency) {
    const netCents = refundAmountCents - cancellationFeeAmountCents;
    return netCents > 0 ? netCents : 0;
  }

  // Currency mismatch – fall back to reserving the full refund to avoid underestimating exposure.
  return refundAmountCents;
}

function calculatePendingTransferCents(metadata: ApprovalRequestBookingTransferMetadata): number {
  const allocations = metadata.financialSummary?.transferAllocation ?? [];
  if (!allocations.length) {
    return 0;
  }

  return allocations.reduce((sum, allocation) => sum + toPositiveCents(allocation.allocatedAmount), 0);
}

function centsToAmount(value: number): number {
  return ArithUtil.fromCents(value);
}

export interface CalculateBookingFinancialAvailabilityParams {
  paidAmount: number | null | undefined;
  allocatableAmount?: number | null | undefined;
  pendingRequests?: FinancialApprovalRequestLike[];
}

export function calculateBookingFinancialAvailability({
  paidAmount,
  allocatableAmount,
  pendingRequests,
}: CalculateBookingFinancialAvailabilityParams): BookingFinancialAvailability {
  const paidAmountCents = Math.max(0, ArithUtil.toCents(paidAmount ?? 0));
  const baseAmountCents = Math.max(0, typeof allocatableAmount === "number" ? ArithUtil.toCents(allocatableAmount) : paidAmountCents);

  const totals = { ...EMPTY_BREAKDOWN_CENTS };
  const seen = new Set<string>();

  (pendingRequests ?? []).forEach((request) => {
    if (!PENDING_STATUSES.has(request.status)) {
      return;
    }

    if (!request.metadata) {
      return;
    }

    if (request.oid) {
      if (seen.has(request.oid)) {
        return;
      }
      seen.add(request.oid);
    }

    if (isCustomerRefundMetadata(request.metadata)) {
      totals.pendingRefundRequests += calculatePendingRefundCents(request.metadata);
      return;
    }

    if (isCustomerCancellationFeeMetadata(request.metadata)) {
      totals.pendingCancellationFeeRequests += calculatePendingCancellationFeeCents(request.metadata);
      return;
    }

    if (isBookingCancellationMetadata(request.metadata)) {
      totals.pendingCancelBookingRequests += calculatePendingCancelBookingCents(request.metadata);
      return;
    }

    if (isBookingTransferMetadata(request.metadata)) {
      totals.pendingBookingTransferRequests += calculatePendingTransferCents(request.metadata);
    }
  });

  const totalPendingCents = totals.pendingRefundRequests +
    totals.pendingCancellationFeeRequests +
    totals.pendingCancelBookingRequests +
    totals.pendingBookingTransferRequests;

  const availableCents = Math.max(baseAmountCents - totalPendingCents, 0);

  return {
    paidAmount: centsToAmount(paidAmountCents),
    allocatableAmount: centsToAmount(baseAmountCents),
    pendingTotals: {
      pendingRefundRequests: centsToAmount(totals.pendingRefundRequests),
      pendingCancellationFeeRequests: centsToAmount(totals.pendingCancellationFeeRequests),
      pendingCancelBookingRequests: centsToAmount(totals.pendingCancelBookingRequests),
      pendingBookingTransferRequests: centsToAmount(totals.pendingBookingTransferRequests),
    },
    totalPendingAmount: centsToAmount(totalPendingCents),
    availableAmount: centsToAmount(availableCents),
  };
}
