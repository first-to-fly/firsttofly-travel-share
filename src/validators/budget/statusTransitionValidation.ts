import { BudgetStatus } from "../../entities/Operations/Budget";


/**
 * Defines valid status transitions for a Budget.
 */
export const BUDGET_VALID_STATUS_TRANSITIONS: Record<BudgetStatus, BudgetStatus[]> = {
  [BudgetStatus.DRAFT]: [BudgetStatus.WFA, BudgetStatus.CANCELLED],
  [BudgetStatus.WFA]: [BudgetStatus.APPROVED, BudgetStatus.REJECTED, BudgetStatus.CANCELLED],
  [BudgetStatus.APPROVED]: [BudgetStatus.COMPLETED, BudgetStatus.CANCELLED],
  [BudgetStatus.REJECTED]: [BudgetStatus.DRAFT, BudgetStatus.COMPLETED, BudgetStatus.CANCELLED],
  [BudgetStatus.COMPLETED]: [],
  [BudgetStatus.CANCELLED]: [],
};


/**
 * Validates that a Budget can transition from a given status to another status.
 *
 * This function checks if the proposed new status is allowed based on the current status
 * and the BUDGET_VALID_STATUS_TRANSITIONS mapping.
 *
 * @param currentStatus - The current status of the Budget
 * @param nextStatus - The proposed new status for the Budget
 * @returns An object with a result property that can be:
 *          { result: "invalid", from: BudgetStatus, to: BudgetStatus } if transition is not allowed,
 *          { result: "valid" } if transition is allowed.
 */
export function validateBudgetStatusTransition(
  currentStatus: BudgetStatus,
  nextStatus: BudgetStatus,
): { result: "invalid"; from: BudgetStatus; to: BudgetStatus } | { result: "valid" } {
  const allowedNextStatuses = BUDGET_VALID_STATUS_TRANSITIONS[currentStatus];
  if (!allowedNextStatuses.includes(nextStatus)) {
    return {
      result: "invalid",
      from: currentStatus,
      to: nextStatus,
    };
  }
  return { result: "valid" };
}
