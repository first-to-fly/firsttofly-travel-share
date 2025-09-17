import { TransactionStatus } from "../../entities/Sales/Transaction";


/**
 * Defines valid status transitions for a Transaction.
 */
export const TRANSACTION_VALID_STATUS_TRANSITIONS: Record<TransactionStatus, TransactionStatus[]> = {
  [TransactionStatus.PENDING]: [
    TransactionStatus.COMPLETED,
    TransactionStatus.FAILED,
    TransactionStatus.CANCELLED,
  ],
  [TransactionStatus.COMPLETED]: [
    // Allow explicit cancellation/voiding of a completed transaction if business permits
    TransactionStatus.CANCELLED,
  ],
  [TransactionStatus.FAILED]: [],
  [TransactionStatus.CANCELLED]: [],
};


/**
 * Validates that a Transaction can transition from a given status to another status.
 *
 * @param currentStatus - The current status of the Transaction
 * @param nextStatus - The proposed new status for the Transaction
 * @returns { result: "valid" } if allowed, or { result: "invalid", from, to } if not
 */
export function validateTransactionStatusTransition(
  currentStatus: TransactionStatus,
  nextStatus: TransactionStatus,
): { result: "invalid"; from: TransactionStatus; to: TransactionStatus } | { result: "valid" } {
  const allowedNextStatuses = TRANSACTION_VALID_STATUS_TRANSITIONS[currentStatus] || [];
  if (!allowedNextStatuses.includes(nextStatus)) {
    return {
      result: "invalid",
      from: currentStatus,
      to: nextStatus,
    };
  }
  return { result: "valid" };
}

