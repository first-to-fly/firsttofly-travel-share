/**
 * Validates that the same code is not assigned to multiple different IDs.
 *
 * This function checks for duplicate code assignments by combining existing and incoming
 * code mappings. It ensures that each unique code is only assigned to one ID.
 *
 * @param currentIdToCodeMap - Map of existing ID-to-code assignments
 * @param comingIdToCodeMap - Map of proposed new ID-to-code assignments
 * @returns An object with a result property that can be:
 *          { result: "duplicate", code: string, ids: string[] } if a code is assigned to multiple IDs,
 *          { result: "valid" } if no duplicates are found
 */
export function validateCode(currentIdToCodeMap: Map<string, string>, comingIdToCodeMap: Map<string, string>): {
  result: "duplicate" | "valid";
  code?: string;
  ids?: string[];
} {
  // Create a map to track which IDs are using each code
  const codeToIdsMap = new Map<string, string[]>();

  // Process existing code assignments
  for (const [id, code] of currentIdToCodeMap.entries()) {
    if (!code) continue;

    // Skip if this ID is being updated in the incoming map
    if (comingIdToCodeMap.has(id)) continue;

    if (!codeToIdsMap.has(code)) {
      codeToIdsMap.set(code, [id]);
    } else {
      codeToIdsMap.get(code)!.push(id);
    }
  }

  // Process all incoming code assignments
  for (const [id, code] of comingIdToCodeMap.entries()) {
    if (!code) continue;

    if (!codeToIdsMap.has(code)) {
      codeToIdsMap.set(code, [id]);
    } else {
      codeToIdsMap.get(code)!.push(id);
    }
  }

  // Check for any codes assigned to multiple IDs
  for (const [code, ids] of codeToIdsMap.entries()) {
    if (ids.length > 1) {
      return {
        result: "duplicate",
        code: code,
        ids: ids.filter((id) => !comingIdToCodeMap.has(id)),
      };
    }
  }

  return {
    result: "valid",
  };
}
