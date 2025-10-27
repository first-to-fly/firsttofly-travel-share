import { MatchDocStatus } from "../../entities/Finance/MatchDoc";


/**
 * Defines valid status transitions for a MatchDoc.
 */
export const MATCH_DOC_VALID_STATUS_TRANSITIONS: Record<MatchDocStatus, MatchDocStatus[]> = {
  [MatchDocStatus.DRAFT]: [MatchDocStatus.SUBMITTED],
  [MatchDocStatus.SUBMITTED]: [MatchDocStatus.APPROVED, MatchDocStatus.REJECTED],
  [MatchDocStatus.APPROVED]: [MatchDocStatus.COMPLETED, MatchDocStatus.VOIDED],
  [MatchDocStatus.REJECTED]: [MatchDocStatus.DRAFT],
  [MatchDocStatus.COMPLETED]: [MatchDocStatus.VOIDED],
  [MatchDocStatus.VOIDED]: [],
};


/**
 * Validates that a MatchDoc can transition from a given status to another status.
 *
 * This function checks if the proposed new status is allowed based on the current status
 * and the MATCH_DOC_VALID_STATUS_TRANSITIONS mapping.
 *
 * @param currentStatus - The current status of the MatchDoc
 * @param nextStatus - The proposed new status for the MatchDoc
 * @returns An object with a result property that can be:
 *          { result: "invalid", from: MatchDocStatus, to: MatchDocStatus } if transition is not allowed,
 *          { result: "valid" } if transition is allowed.
 */
export function validateMatchDocStatusTransition(
  currentStatus: MatchDocStatus,
  nextStatus: MatchDocStatus,
): { result: "invalid"; from: MatchDocStatus; to: MatchDocStatus } | { result: "valid" } {
  if (currentStatus === nextStatus) return { result: "valid" };
  const allowedNextStatuses = MATCH_DOC_VALID_STATUS_TRANSITIONS[currentStatus];
  if (!allowedNextStatuses.includes(nextStatus)) {
    return {
      result: "invalid",
      from: currentStatus,
      to: nextStatus,
    };
  }
  return { result: "valid" };
}
