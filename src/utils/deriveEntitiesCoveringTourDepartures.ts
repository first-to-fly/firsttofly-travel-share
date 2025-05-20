/**
 * Derive entities that cover a given tour departure based on its OIDs.
 * Entities should have `oid` and `coveredEntityOIDs` properties.
 * @param entities - Array of entities to match against.
 * @param departure - Tour departure metadata including its own OID and product info.
 * @returns Object containing `closestMatched` (most specific match) and `allMatched` (all matches).
 */
export function deriveEntitiesCoveringTourDepartures<
  Entity extends { oid: string; coveredEntityOIDs: string[] },
>(
  entities: Entity[],
  departure: {
    oid: string;
    product: {
      oid: string;
      sectorGroupOID?: string;
      sectorOIDs?: string[];
    };
  },
): { closestMatched?: Entity; allMatched: Entity[] } {
  // Define priority levels: departure OID > product OID > sector group OID > sector OIDs
  const levels: (Set<string>)[] = [
    new Set([departure.oid]),
    new Set([departure.product.oid]),
    departure.product.sectorGroupOID ? new Set([departure.product.sectorGroupOID]) : new Set<string>(),
    departure.product.sectorOIDs ? new Set(departure.product.sectorOIDs) : new Set<string>(),
  ].filter((level) => level.size > 0);

  // Flatten all target OIDs into a set for quick lookup
  const targetOIDs = new Set<string>([
    departure.oid,
    departure.product.oid,
    departure.product.sectorGroupOID,
    ...(departure.product.sectorOIDs || []),
  ].filter((o): o is string => !!o));

  // Find all entities whose coveredEntityOIDs intersect with targetOIDs
  const allMatched = entities.filter((entity) => entity.coveredEntityOIDs.some((cid) => targetOIDs.has(cid)));

  // Find the closest (most specific) matched entity
  let closestMatched: Entity | undefined;
  for (const levelOIDs of levels) {
    const levelSet = new Set(levelOIDs);
    const found = entities.find((entity) => entity.coveredEntityOIDs.some((cid) => levelSet.has(cid)));
    if (found) {
      closestMatched = found;
      break;
    }
  }

  return {
    closestMatched: closestMatched,
    allMatched: allMatched,
  };
}
