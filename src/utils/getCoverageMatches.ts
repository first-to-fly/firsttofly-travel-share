import type { ProductType } from "../enums/ProductType";


/**
 * Get entities that match a given target context based on coverage OIDs.
 * Entities should have `oid`, `coveredEntityOIDs`, and `productTypes` properties.
 * @param entities - Array of entities to match against.
 * @param target - Target context including optional OID and product info.
 * @returns Object containing `closestMatched` (most specific match) and `allMatched` (all matches).
 */
export function getCoverageMatches<
  Entity extends { oid: string; coveredEntityOIDs: string[]; productTypes?: ProductType[] },
>(
  entities: Entity[],
  target: {
    oid?: string; // Optional - only used when matching against a specific entity (like a departure)
    product: {
      oid: string;
      type: ProductType;
      sectorGroupOID?: string | null;
      sectorOIDs?: string[] | null;
    };
  },
): { closestMatched?: Entity; allMatched: Entity[] } {
  // First, filter entities by productTypes - only consider entities that support the product type
  const productTypeFilteredEntities = entities.filter((entity) => !entity.productTypes || !entity.productTypes.length ||
    entity.productTypes.includes(target.product.type));

  // Define priority levels: target OID (if provided) > product OID > sector group OID > sector OIDs
  const levels: (Set<string>)[] = [
    ...(target.oid ? [new Set([target.oid])] : []),
    new Set([target.product.oid]),
    target.product.sectorGroupOID ? new Set([target.product.sectorGroupOID]) : new Set<string>(),
    target.product.sectorOIDs ? new Set(target.product.sectorOIDs) : new Set<string>(),
  ].filter((level) => level.size > 0);

  // Flatten all target OIDs into a set for quick lookup
  const targetOIDs = new Set<string>([
    ...(target.oid ? [target.oid] : []),
    target.product.oid,
    target.product.sectorGroupOID,
    ...(target.product.sectorOIDs || []),
  ].filter((o): o is string => !!o));

  // Find all entities whose coveredEntityOIDs intersect with targetOIDs AND match productType
  const allMatched = productTypeFilteredEntities
    .filter((entity) => entity.coveredEntityOIDs.some((cid) => targetOIDs.has(cid)));

  // Find the closest (most specific) matched entity from productType-filtered entities
  let closestMatched: Entity | undefined;
  for (const levelOIDs of levels) {
    const levelSet = new Set(levelOIDs);
    const found = productTypeFilteredEntities
      .find((entity) => entity.coveredEntityOIDs.some((cid) => levelSet.has(cid)));
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
