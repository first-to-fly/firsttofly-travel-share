import { TransactionStatus, TransactionType } from "../../entities/Sales/Transaction";
import type { BookingStatus } from "../../enums/BookingTypes";


export interface MinimalTransaction {
  transactionType: TransactionType;
  amount: number; // positive for receipt, negative for refund/cancellation per backend convention
  status: TransactionStatus;
}

export interface PaymentOrderAggregates {
  received: number; // net: receipts (+) + refunds (-)
  totalReceipts: number; // sum of receipt amounts (positive)
  totalRefundsAbs: number; // sum of abs(refund amounts) for display
  totalCancellationFeeAbs: number; // sum of abs(cancellation fees)
  refundableExposure: number; // max(0, received - totalCancellationFeeAbs)
  remainingBalance: number; // max(0, totalAmount - received)
}

export interface ValidateCreateTransactionParams {
  bookingStatus?: BookingStatus;
  bookingTotalAmount: number; // booking total amount
  bookingTenantId: string;
  inputTenantId: string; // tenant extracted from input OID
  inputCurrencyCode?: string; // optional; only validated if both this and paymentOrderCurrencyCode present
  paymentOrderCurrencyCode?: string; // optional (when PO exists)
  proposedTransactionType: TransactionType;
  proposedAmount: number; // >0 for receipt, <0 for refund/cancellation
  existingTransactions?: MinimalTransaction[]; // completed/pending etc.; we consider only COMPLETED for aggregates
}

export type ValidateCreateTransactionResult =
  | { result: "valid"; aggregates: PaymentOrderAggregates }
  | { result: "invalid"; message: string; aggregates: PaymentOrderAggregates };

/**
 * Computes aggregates from a list of existing transactions.
 */
export function computePaymentOrderAggregates(
  totalAmount: number,
  transactions: MinimalTransaction[] = [],
): PaymentOrderAggregates {
  let received = 0;
  let totalReceipts = 0;
  let totalRefundsAbs = 0;
  let totalCancellationFeeAbs = 0;

  for (const t of transactions) {
    if (t.status !== TransactionStatus.COMPLETED) continue;
    if (t.transactionType === TransactionType.RECEIPT) {
      received += t.amount;
      totalReceipts += t.amount;
    } else if (t.transactionType === TransactionType.REFUND) {
      received += t.amount; // negative by convention
      totalRefundsAbs += Math.abs(t.amount);
    } else if (t.transactionType === TransactionType.CANCELLATION_FEE) {
      totalCancellationFeeAbs += Math.abs(t.amount);
    }
  }

  const refundableExposure = Math.max(0, received - totalCancellationFeeAbs);
  const remainingBalance = Math.max(0, totalAmount - received);

  return {
    received: received,
    totalReceipts: totalReceipts,
    totalRefundsAbs: totalRefundsAbs,
    totalCancellationFeeAbs: totalCancellationFeeAbs,
    refundableExposure: refundableExposure,
    remainingBalance: remainingBalance,
  };
}

/**
 * Validates a proposed transaction (receipt/refund/cancellation fee) against booking and payment order context.
 * This mirrors backend logic so FE and BE can share identical validation.
 */
export function validateCreateTransaction(
  params: ValidateCreateTransactionParams,
): ValidateCreateTransactionResult {
  const {
    bookingStatus,
    bookingTotalAmount,
    bookingTenantId,
    inputTenantId,
    inputCurrencyCode,
    paymentOrderCurrencyCode,
    proposedTransactionType,
    proposedAmount,
    existingTransactions = [],
  } = params;

  const aggregates = computePaymentOrderAggregates(bookingTotalAmount, existingTransactions);

  // Tenant check
  if (bookingTenantId && bookingTenantId !== inputTenantId) {
    return {
      result: "invalid",
      message: "Tenant mismatch for booking.",
      aggregates: aggregates,
    };
  }

  // Booking status check
  if (bookingStatus && (bookingStatus === "cancelled" || bookingStatus === "voided")) {
    return {
      result: "invalid",
      message: `Booking is ${bookingStatus}.`,
      aggregates: aggregates,
    };
  }

  // Optional currency check (only when a PO already exists and has a currency)
  if (paymentOrderCurrencyCode && inputCurrencyCode && paymentOrderCurrencyCode !== inputCurrencyCode) {
    return {
      result: "invalid",
      message: `Currency mismatch. PaymentOrder currency ${paymentOrderCurrencyCode} does not match input ${inputCurrencyCode}.`,
      aggregates: aggregates,
    };
  }

  // Type-specific validations
  if (proposedTransactionType === TransactionType.RECEIPT) {
    if (proposedAmount <= 0) {
      return {
        result: "invalid",
        message: "Receipt amount must be positive.",
        aggregates: aggregates,
      };
    }
    if (aggregates.received + proposedAmount > bookingTotalAmount) {
      return {
        result: "invalid",
        message: `Receipt exceeds remaining balance. received=${aggregates.received}, total=${bookingTotalAmount}, amount=${proposedAmount}.`
          .replace(/\n/g, " "),
        aggregates: aggregates,
      };
    }
  }

  if (proposedTransactionType === TransactionType.REFUND) {
    if (proposedAmount >= 0) {
      return {
        result: "invalid",
        message: "Refund amount must be negative.",
        aggregates: aggregates,
      };
    }
    const refundAbs = Math.abs(proposedAmount);
    if (refundAbs > aggregates.refundableExposure) {
      return {
        result: "invalid",
        message: `Refund exceeds refundable exposure. exposure=${aggregates.refundableExposure}, requested=${refundAbs}.`,
        aggregates: aggregates,
      };
    }
  }

  if (proposedTransactionType === TransactionType.CANCELLATION_FEE) {
    if (proposedAmount >= 0) {
      return {
        result: "invalid",
        message: "Cancellation fee amount must be negative.",
        aggregates: aggregates,
      };
    }
    const feeAbs = Math.abs(proposedAmount);
    if (feeAbs > aggregates.refundableExposure) {
      return {
        result: "invalid",
        message: `Cancellation fee exceeds refundable exposure. exposure=${aggregates.refundableExposure}, requested=${feeAbs}.`,
        aggregates: aggregates,
      };
    }
  }

  return {
    result: "valid",
    aggregates: aggregates,
  };
}
