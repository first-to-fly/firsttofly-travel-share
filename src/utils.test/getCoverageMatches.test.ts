import assert from "assert";

import { ProductType } from "../enums/ProductType";
import { getCoverageMatches } from "../utils/getCoverageMatches";


type TestEntity = { oid: string; coveredEntityOIDs: string[]; productTypes: ProductType[] };

function runTests() {
  console.log("Running getCoverageMatches tests...");

  // Common entities for tests
  const entities: TestEntity[] = [
    {
      oid: "ent-departure",
      coveredEntityOIDs: ["dep-1"],
      productTypes: [ProductType.GIT, ProductType.FIT],
    },
    {
      oid: "ent-product",
      coveredEntityOIDs: ["prod-1"],
      productTypes: [ProductType.GIT],
    },
    {
      oid: "ent-sector-group",
      coveredEntityOIDs: ["sg-1"],
      productTypes: [ProductType.FIT],
    },
    {
      oid: "ent-sector",
      coveredEntityOIDs: ["s-1", "s-2"],
      productTypes: [ProductType.GIT, ProductType.FIT],
    },
    {
      oid: "ent-unrelated",
      coveredEntityOIDs: ["x-1"],
      productTypes: [ProductType.FIT],
    },
  ];

  // Test 1: Match on departure OID
  {
    const target = {
      oid: "dep-1", // Specific departure OID
      product: {
        oid: "prod-1",
        type: ProductType.GIT,
        sectorGroupOID: "sg-1",
        sectorOIDs: ["s-1", "s-3"],
      },
    };
    const { closestMatched, allMatched } = getCoverageMatches(entities, target);
    assert.strictEqual(closestMatched?.oid, "ent-departure", "Should match departure entity first");
    assert.deepStrictEqual(
      allMatched.map((e) => e.oid),
      ["ent-departure", "ent-product", "ent-sector"],
      "Should include all matching entities",
    );
  }

  // Test 2: No departure OID, match on product OID
  {
    const target = {
      product: {
        oid: "prod-1",
        type: ProductType.GIT,
        sectorGroupOID: "sg-2",
        sectorOIDs: ["s-3"],
      },
    };
    const { closestMatched, allMatched } = getCoverageMatches(entities, target);
    assert.strictEqual(closestMatched?.oid, "ent-product", "Should match product entity first");
    assert.deepStrictEqual(
      allMatched.map((e) => e.oid),
      ["ent-product"],
      "Should only include product match",
    );
  }

  // Test 3: Only sector group match
  {
    const target = {
      product: {
        oid: "prod-2",
        type: ProductType.FIT,
        sectorGroupOID: "sg-1",
        sectorOIDs: [],
      },
    };
    const { closestMatched, allMatched } = getCoverageMatches(entities, target);
    assert.strictEqual(closestMatched?.oid, "ent-sector-group", "Should match sector group entity first");
    assert.deepStrictEqual(
      allMatched.map((e) => e.oid),
      ["ent-sector-group"],
    );
  }

  // Test 4: Only sector match (multiple)
  {
    const target = {
      product: {
        oid: "prod-2",
        type: ProductType.GIT,
        sectorGroupOID: undefined,
        sectorOIDs: ["s-2"],
      },
    };
    const { closestMatched, allMatched } = getCoverageMatches(entities, target);
    assert.strictEqual(closestMatched?.oid, "ent-sector", "Should match sector entity");
    assert.deepStrictEqual(
      allMatched.map((e) => e.oid),
      ["ent-sector"],
    );
  }

  // Test 5: No matches
  {
    const target = {
      product: {
        oid: "prod-x",
        type: ProductType.GIT,
        sectorGroupOID: "sg-x",
        sectorOIDs: ["s-x"],
      },
    };
    const { closestMatched, allMatched } = getCoverageMatches(entities, target);
    assert.strictEqual(closestMatched, undefined, "Should have no closest match");
    assert.deepStrictEqual(allMatched, [], "Should have no matches");
  }

  // Test 6: ProductType filtering - should only match entities with correct productType
  {
    const target = {
      oid: "dep-1", // Specific departure OID
      product: {
        oid: "prod-1",
        type: ProductType.FIT,
        sectorGroupOID: "sg-1",
        sectorOIDs: ["s-1", "s-3"],
      },
    };
    const { closestMatched, allMatched } = getCoverageMatches(entities, target);
    // Should match departure (supports both GIT/FIT) but not product (only supports GIT)
    assert.strictEqual(closestMatched?.oid, "ent-departure", "Should match departure entity first");
    assert.deepStrictEqual(
      allMatched.map((e) => e.oid),
      ["ent-departure", "ent-sector-group", "ent-sector"],
      "Should only include entities that support FIT productType",
    );
  }

  // Test 7: ProductType filtering - no entities support the productType
  {
    // Create a product with a productType that no entities in our test data support for this specific case
    const target = {
      product: {
        oid: "prod-1", // This would normally match ent-product
        type: ProductType.FIT, // But ent-product only supports GIT
        sectorGroupOID: "sg-x",
        sectorOIDs: ["s-x"],
      },
    };
    const { closestMatched, allMatched } = getCoverageMatches(entities, target);
    // Should have no matches because ent-product only supports GIT, not FIT
    assert.strictEqual(closestMatched, undefined, "Should have no closest match due to productType filter");
    assert.deepStrictEqual(allMatched, [], "Should have no matches due to productType filter");
  }

  console.log("All tests passed.");
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}
