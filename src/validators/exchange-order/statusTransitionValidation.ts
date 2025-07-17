import { ExchangeOrderStatus } from "../../entities/Operations/ExchangeOrder";


/**
 * Defines valid status transitions for an Exchange Order.
 */
export const EXCHANGE_ORDER_VALID_STATUS_TRANSITIONS: Record<ExchangeOrderStatus, ExchangeOrderStatus[]> = {
  [ExchangeOrderStatus.DRAFT]: [ExchangeOrderStatus.WFA, ExchangeOrderStatus.VOIDED],
  [ExchangeOrderStatus.WFA]: [ExchangeOrderStatus.APPROVED, ExchangeOrderStatus.REJECTED, ExchangeOrderStatus.DRAFT],
  [ExchangeOrderStatus.APPROVED]: [ExchangeOrderStatus.COMPLETED, ExchangeOrderStatus.VOIDED],
  [ExchangeOrderStatus.REJECTED]: [ExchangeOrderStatus.DRAFT],
  [ExchangeOrderStatus.COMPLETED]: [ExchangeOrderStatus.VOIDED],
  [ExchangeOrderStatus.CANCELLED]: [],
  [ExchangeOrderStatus.VOIDED]: [],
};


/**
 * Validates that an Exchange Order can transition from a given status to another status.
 *
 * This function checks if the proposed new status is allowed based on the current status
 * and the EXCHANGE_ORDER_VALID_STATUS_TRANSITIONS mapping.
 *
 * @param currentStatus - The current status of the Exchange Order
 * @param nextStatus - The proposed new status for the Exchange Order
 * @returns An object with a result property that can be:
 *          { result: "invalid", from: ExchangeOrderStatus, to: ExchangeOrderStatus } if transition is not allowed,
 *          { result: "valid" } if transition is allowed.
 */
export function validateExchangeOrderStatusTransition(
  currentStatus: ExchangeOrderStatus,
  nextStatus: ExchangeOrderStatus,
): { result: "invalid"; from: ExchangeOrderStatus; to: ExchangeOrderStatus } | { result: "valid" } {
  const allowedNextStatuses = EXCHANGE_ORDER_VALID_STATUS_TRANSITIONS[currentStatus];
  if (!allowedNextStatuses.includes(nextStatus)) {
    return {
      result: "invalid",
      from: currentStatus,
      to: nextStatus,
    };
  }
  return { result: "valid" };
}
