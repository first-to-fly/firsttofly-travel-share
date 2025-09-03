import type { RoomConfigurationRule, RoomOccupancy } from "../../entities/Settings/Product/RoomConfiguration";
import { RoomType } from "../../entities/Settings/Product/RoomConfiguration";


/**
 * Normalize a RoomOccupancy object to ensure all counts are numbers.
 */
function normalizeOccupancy(o: RoomOccupancy): Required<RoomOccupancy> {
  return {
    adultNum: o.adultNum ?? 0,
    childWithBedNum: o.childWithBedNum ?? 0,
    childWithoutBedNum: o.childWithoutBedNum ?? 0,
    infantNum: o.infantNum ?? 0,
  };
}


/**
 * Calculate the total number of beds needed based on adults and children with beds
 */
function calculateTotalBeds(occupancy: RoomOccupancy): number {
  const normalized = normalizeOccupancy(occupancy);
  return normalized.adultNum + normalized.childWithBedNum;
}


/**
 * Determine the room type based on total number of beds needed
 */
function determineRoomType(totalBeds: number): RoomType {
  if (totalBeds <= 0) {
    throw new Error("Invalid occupancy: total beds must be greater than 0");
  }
  if (totalBeds === 1) {
    return RoomType.SINGLE;
  }
  if (totalBeds === 2) {
    return RoomType.TWIN;
  }
  if (totalBeds === 3) {
    return RoomType.TRIPLE;
  }
  if (totalBeds === 4) {
    return RoomType.QUADRUPLE;
  }
  throw new Error(`Invalid occupancy: total beds (${totalBeds}) exceeds maximum allowed (4)`);
}


/**
 * Check if two occupancies have exactly matching counts
 */
function isExactOccupancyMatch(
  a: RoomOccupancy,
  b: RoomOccupancy,
): boolean {
  const na = normalizeOccupancy(a);
  const nb = normalizeOccupancy(b);

  return (
    na.adultNum === nb.adultNum &&
    na.childWithBedNum === nb.childWithBedNum &&
    na.childWithoutBedNum === nb.childWithoutBedNum &&
    na.infantNum === nb.infantNum
  );
}


/**
 * Find the rule that exactly matches the given occupancy from a list of rules.
 * Room type is automatically determined based on the number of beds needed.
 * Throws an error if no exact match is found or if the occupancy is invalid.
 */
export function roomRulesForOccupancy(
  occupancy: RoomOccupancy,
  rules: RoomConfigurationRule[],
): RoomConfigurationRule {
  if (!rules?.length) {
    throw new Error("No room configuration rules provided");
  }

  const totalBeds = calculateTotalBeds(occupancy);
  const roomType = determineRoomType(totalBeds);

  const matchingRule = rules.find(
    (rule) => rule.roomType === roomType &&
      isExactOccupancyMatch(occupancy, rule.occupancy),
  );

  if (!matchingRule) {
    throw new Error(
      `Room rule not exists for roomType=${roomType} (${totalBeds} beds) and occupancy=${JSON.stringify(
        normalizeOccupancy(occupancy),
      )}`,
    );
  }

  return matchingRule;
}
