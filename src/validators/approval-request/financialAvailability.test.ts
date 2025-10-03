import { ApprovalRequestStatus } from "../../entities/Operations/ApprovalRequest";
import type {
  ApprovalRequestBookingCancellationMetadata,
  ApprovalRequestBookingTransferMetadata,
  ApprovalRequestCustomerCancellationFeeMetadata,
  ApprovalRequestCustomerRefundMetadata,
} from "../../entities/Operations/ApprovalRequestMetadata";
import {
  ApprovalType,
} from "../../entities/Settings/General/Approval";
import {
  calculateBookingFinancialAvailability,
  type FinancialApprovalRequestLike,
} from "./financialAvailability";


describe("calculateBookingFinancialAvailability", () => {
  const baseRefundMetadata: ApprovalRequestCustomerRefundMetadata = {
    type: ApprovalType.CUSTOMER_REFUND_REQUEST,
    amount: 200,
    paymentOrderOID: "po-1",
    bookingOID: "booking-1",
    tenantOID: "tenant-1",
    currencyCode: "USD",
    notes: undefined,
    internalRemarks: undefined,
    externalRemarks: undefined,
  };

  const baseCancellationFeeMetadata: ApprovalRequestCustomerCancellationFeeMetadata = {
    type: ApprovalType.CUSTOMER_CANCELLATION_FEE_REQUEST,
    amount: 150,
    paymentOrderOID: "po-1",
    bookingOID: "booking-1",
    tenantOID: "tenant-1",
    currencyCode: "USD",
    notes: undefined,
    internalRemarks: undefined,
    externalRemarks: undefined,
  };

  const baseBookingCancellationMetadata: ApprovalRequestBookingCancellationMetadata = {
    type: ApprovalType.BOOKING_CANCELLATION_WITH_FINANCIALS,
    bookingOID: "booking-1",
    tenantOID: "tenant-1",
    cancellationReason: "Customer requested",
    refund: {
      requestedAmount: 120,
      currencyCode: "USD",
      internalRemarks: undefined,
      externalRemarks: undefined,
    },
    cancellationFee: {
      amount: 20,
      currencyCode: "USD",
      internalRemarks: undefined,
      externalRemarks: undefined,
    },
    financialSummary: {
      receivedAmount: 1000,
      refundAmount: 120,
      cancellationFeeAmount: 20,
      netImpactToCustomer: 100,
    },
  };

  const baseBookingTransferMetadata: ApprovalRequestBookingTransferMetadata = {
    type: ApprovalType.BOOKING_TRANSFER,
    sourceBookingType: "GTB",
    originalBookingOID: "booking-1",
    transferItems: [],
    transferReason: "Customer moved",
    idempotencyKey: "transfer-key",
    financialSummary: {
      originalBookingPaidAmount: 1000,
      transferAllocation: [
        {
          targetIndex: 0,
          allocatedAmount: 130,
          newBookingTotal: 300,
          balanceDue: 170,
        },
        {
          targetIndex: 1,
          allocatedAmount: 70,
          newBookingTotal: 200,
          balanceDue: 130,
        },
      ],
    },
  };

  function buildRequest(partial: Partial<FinancialApprovalRequestLike> & {metadata: FinancialApprovalRequestLike["metadata"]}): FinancialApprovalRequestLike {
    return {
      oid: partial.oid,
      approvalType: partial.approvalType ?? partial.metadata?.type ?? ApprovalType.CUSTOMER_REFUND_REQUEST,
      status: partial.status ?? ApprovalRequestStatus.IN_PROGRESS,
      metadata: partial.metadata,
    };
  }

  it("calculates pending totals across request types", () => {
    const availability = calculateBookingFinancialAvailability({
      paidAmount: 1000,
      allocatableAmount: 1000,
      pendingRequests: [
        buildRequest({ metadata: baseRefundMetadata }),
        buildRequest({ metadata: baseCancellationFeeMetadata }),
        buildRequest({ metadata: baseBookingCancellationMetadata }),
        buildRequest({ metadata: baseBookingTransferMetadata }),
      ],
    });

    expect(availability.paidAmount).toBe(1000);
    expect(availability.allocatableAmount).toBe(1000);
    expect(availability.pendingTotals.pendingRefundRequests).toBe(200);
    expect(availability.pendingTotals.pendingCancellationFeeRequests).toBe(150);
    expect(availability.pendingTotals.pendingCancelBookingRequests).toBe(100);
    expect(availability.pendingTotals.pendingBookingTransferRequests).toBe(200);
    expect(availability.totalPendingAmount).toBe(650);
    expect(availability.availableAmount).toBe(350);
  });

  it("ignores non-pending statuses and deduplicates by oid", () => {
    const availability = calculateBookingFinancialAvailability({
      paidAmount: 500,
      pendingRequests: [
        buildRequest({
          oid: "duplicate",
          metadata: baseRefundMetadata,
        }),
        buildRequest({
          oid: "duplicate",
          metadata: baseRefundMetadata,
        }),
        buildRequest({
          status: ApprovalRequestStatus.APPROVED,
          metadata: baseCancellationFeeMetadata,
        }),
      ],
    });

    expect(availability.pendingTotals.pendingRefundRequests).toBe(200);
    expect(availability.pendingTotals.pendingCancellationFeeRequests).toBe(0);
    expect(availability.totalPendingAmount).toBe(200);
    expect(availability.availableAmount).toBe(300);
  });

  it("reserves full refund when cancellation fee uses different currency", () => {
    const mismatchMetadata: ApprovalRequestBookingCancellationMetadata = {
      ...baseBookingCancellationMetadata,
      refund: {
        requestedAmount: 80,
        currencyCode: "USD",
        internalRemarks: undefined,
        externalRemarks: undefined,
      },
      cancellationFee: {
        amount: 50,
        currencyCode: "EUR",
        internalRemarks: undefined,
        externalRemarks: undefined,
      },
      financialSummary: {
        receivedAmount: 1000,
        refundAmount: 80,
        cancellationFeeAmount: 50,
        netImpactToCustomer: 0,
      },
    };

    const availability = calculateBookingFinancialAvailability({
      paidAmount: 500,
      pendingRequests: [
        buildRequest({ metadata: mismatchMetadata }),
      ],
    });

    expect(availability.pendingTotals.pendingCancelBookingRequests).toBe(80);
    expect(availability.availableAmount).toBe(420);
  });
});
