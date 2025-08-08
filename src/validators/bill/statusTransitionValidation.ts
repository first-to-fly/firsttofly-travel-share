import { BillStatus } from "../../entities/Finance/Bill";


/**
 * Defines valid status transitions for a Bill.
 */
export const BILL_VALID_STATUS_TRANSITIONS: Record<BillStatus, BillStatus[]> = {
  [BillStatus.DRAFT]: [BillStatus.SUBMITTED],
  [BillStatus.SUBMITTED]: [BillStatus.APPROVED, BillStatus.REJECTED],
  [BillStatus.APPROVED]: [BillStatus.VOIDED],
  [BillStatus.REJECTED]: [BillStatus.DRAFT],
  [BillStatus.VOIDED]: [],
};


/**
 * Validates that a Bill can transition from a given status to another status.
 *
 * @param currentStatus - The current status of the Bill
 * @param nextStatus - The proposed new status for the Bill
 * @returns An object with a result property that can be:
 *          { result: "invalid", from: BillStatus, to: BillStatus } if transition is not allowed,
 *          { result: "valid" } if transition is allowed.
 */
export function validateBillStatusTransition(
  currentStatus: BillStatus,
  nextStatus: BillStatus,
): { result: "invalid"; from: BillStatus; to: BillStatus } | { result: "valid" } {
  const allowedNextStatuses = BILL_VALID_STATUS_TRANSITIONS[currentStatus];
  if (!allowedNextStatuses.includes(nextStatus)) {
    return {
      result: "invalid",
      from: currentStatus,
      to: nextStatus,
    };
  }
  return { result: "valid" };
}
