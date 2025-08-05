import { ProductType } from "../enums/ProductType";


/**
 * Derive entities that cover a given tour departure based on its OIDs.
 * Entities should have `oid`, `coveredEntityOIDs`, and `productTypes` properties.
 * @param entities - Array of entities to match against.
 * @param departure - Tour departure metadata including its own OID and product info.
 * @returns Object containing `closestMatched` (most specific match) and `allMatched` (all matches).
 */
export function deriveEntitiesCoveringTourDepartures<
  Entity extends { oid: string; coveredEntityOIDs: string[]; productTypes: ProductType[] },
>(
  entities: Entity[],
  departure: {
    oid: string;
    product: {
      oid: string;
      type: ProductType;
      sectorGroupOID?: string;
      sectorOIDs?: string[];
    };
  },
): { closestMatched?: Entity; allMatched: Entity[] } {
  // First, filter entities by productTypes - only consider entities that support the product type
  const productTypeFilteredEntities = entities.filter((entity) => entity.productTypes.includes(departure.product.type));

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
