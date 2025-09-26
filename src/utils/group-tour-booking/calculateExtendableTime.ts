import type { BookingExtensionRule } from "../../entities/Settings/General/TenantConfig";


export function calculateExtendableTime(ctx: {
  balanceSeats: number;
  requestedSeats: number;
  extendedTimes: number;
}, config: BookingExtensionRule[]): {
    extendableTime: number;
    requireApproval: boolean;
    remainingExtendedTimes: number;
  } {
  // Find matching rule based on balance seats and requested seats conditions
  const matchingRule = config.find((rule) => {
    const balanceSeatsMatch = evaluateCondition(ctx.balanceSeats, rule.balanceSeats.op, rule.balanceSeats.value);
    const requestSeatsMatch = evaluateCondition(ctx.requestedSeats, rule.requestSeats.op, rule.requestSeats.value);

    return balanceSeatsMatch && requestSeatsMatch;
  });

  // If no matching rule found, return default values
  if (!matchingRule) {
    return {
      extendableTime: 0,
      requireApproval: false,
      remainingExtendedTimes: 0,
    };
  }

  // Calculate remaining extension times available
  const remainingExtendedTimes = matchingRule.numExtendedTimes - ctx.extendedTimes;
  if (remainingExtendedTimes <= 0) {
    return {
      extendableTime: 0,
      requireApproval: true,
      remainingExtendedTimes: 0,
    };
  }

  // Find the appropriate milestone configuration for current remaining times
  // Look for the highest milestone that is <= remainingExtendedTimes
  const availableMilestones = Object.keys(matchingRule.remainingExtendedTimesToExtendableTime)
    .map(Number)
    .filter((milestone) => milestone <= remainingExtendedTimes)
    .sort((a, b) => b - a); // Sort descending to get highest first

  if (availableMilestones.length === 0) {
    return {
      extendableTime: 0,
      requireApproval: true,
      remainingExtendedTimes: remainingExtendedTimes,
    };
  }

  // Use the highest available milestone
  const applicableMilestone = availableMilestones[0];
  const extensionSettings = matchingRule.remainingExtendedTimesToExtendableTime[applicableMilestone];

  // Return the extension time and approval requirement, decrease remaining times by 1
  return {
    extendableTime: extensionSettings.extendableTime,
    requireApproval: extensionSettings.requireApproval,
    remainingExtendedTimes: remainingExtendedTimes - 1,
  };
}

/**
 * Helper function to evaluate conditions based on operator
 */
function evaluateCondition(value: number, operator: "<" | ">" | "=" | "<=" | ">=", targetValue: number): boolean {
  switch (operator) {

    case "<":
      return value < targetValue;
    case ">":
      return value > targetValue;
    case "=":
      return value === targetValue;
    case "<=":
      return value <= targetValue;
    case ">=":
      return value >= targetValue;
    default:
      return false;

  }
}
