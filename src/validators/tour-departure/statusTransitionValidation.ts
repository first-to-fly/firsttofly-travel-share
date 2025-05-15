import { TourDepartureStatus } from "../../entities/Operations/TourDeparture";


/**
 * Defines valid status transitions for a Tour departure.
 */
export const TOUR_DEPARTURE_VALID_STATUS_TRANSITIONS: Record<TourDepartureStatus, TourDepartureStatus[]> = {
  [TourDepartureStatus.DRAFT]: [TourDepartureStatus.CONFIRMED, TourDepartureStatus.OPEN],
  [TourDepartureStatus.CONFIRMED]: [TourDepartureStatus.OPEN],
  [TourDepartureStatus.OPEN]: [TourDepartureStatus.CLOSED],
  [TourDepartureStatus.CLOSED]: [],
};


/**
 * Validates that a Tour departure can transition from a given status to another status.
 *
 * This function checks if the proposed new status is allowed based on the current status
 * and the VALID_STATUS_TRANSITIONS mapping.
 *
 * @param currentStatus - The current status of the Tour departure
 * @param nextStatus - The proposed new status for the Tour departure
 * @returns An object with a result property that can be:
 *          { result: "invalid", from: TourDepartureStatus, to: TourDepartureStatus } if transition is not allowed,
 *          { result: "valid" } if transition is allowed.
 */
export function validateTourDepartureStatusTransition(
  currentStatus: TourDepartureStatus,
  nextStatus: TourDepartureStatus,
): { result: "invalid"; from: TourDepartureStatus; to: TourDepartureStatus } | { result: "valid" } {
  const allowedNextStatuses = TOUR_DEPARTURE_VALID_STATUS_TRANSITIONS[currentStatus];
  if (!allowedNextStatuses.includes(nextStatus)) {
    return {
      result: "invalid",
      from: currentStatus,
      to: nextStatus,
    };
  }
  return { result: "valid" };
}
