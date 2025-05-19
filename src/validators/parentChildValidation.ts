/**
 * Validates parent-child relationships to prevent invalid hierarchies.
 *
 * This function checks for two types of invalid relationships:
 * 1. Self-reference: When an entity is set as its own parent
 * 2. Cycles: When a chain of parent-child relationships forms a loop
 *
 * The function considers both existing parent-child relationships and
 * proposed new relationships when performing validation.
 *
 * @param currentParentMap - Map of existing parent-child relationships where key is child and value is parent
 * @param comingParentMap - Map of proposed parent-child relationships where key is child and value is parent
 * @returns An object with a result property that can be:
 *          { result: "self", errorKey: string } if an entity is set as its own parent,
 *          { result: "cycle", errorKey: string } if a cycle is detected in the hierarchy,
 *          { result: "valid" } if no invalid relationships are found
 */
export function validateIncomingParentChild(
  currentParentMap: Map<string, string>,
  comingParentMap: Map<string, string | undefined>,
) {
  for (const [key, newParent] of comingParentMap.entries()) {

    if (newParent === key) {
      return {
        result: "self",
        errorKey: key,
      };
    }

    const visited = new Set<string>();
    let current = key;
    while (current) {
      if (visited.has(current)) {
        return {
          result: "cycle",
          errorKey: key,
        };
      }
      visited.add(current);
      const nextParent = comingParentMap.has(current) ?
        comingParentMap.get(current) :
        currentParentMap.get(current) || undefined;
      if (!nextParent) break;
      current = nextParent;
    }
  }
  return {
    result: "valid",
  };
}
