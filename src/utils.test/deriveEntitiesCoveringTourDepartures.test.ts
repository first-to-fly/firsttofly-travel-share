import assert from "assert";

import { deriveEntitiesCoveringTourDepartures } from "../utils/deriveEntitiesCoveringTourDepartures";


type TestEntity = { oid: string; coveredEntityOIDs: string[] };

function runTests() {
  console.log("Running deriveEntitiesCoveringTourDepartures tests...");

  // Common entities for tests
  const entities: TestEntity[] = [
    {
      oid: "ent-departure",
      coveredEntityOIDs: ["dep-1"],
    },
    {
      oid: "ent-product",
      coveredEntityOIDs: ["prod-1"],
    },
    {
      oid: "ent-sector-group",
      coveredEntityOIDs: ["sg-1"],
    },
    {
      oid: "ent-sector",
      coveredEntityOIDs: ["s-1", "s-2"],
    },
    {
      oid: "ent-unrelated",
      coveredEntityOIDs: ["x-1"],
    },
  ];

  // Test 1: Match on departure OID
  {
    const departure = {
      oid: "dep-1",
      product: {
        oid: "prod-1",
        sectorGroupOID: "sg-1",
        sectorOIDs: ["s-1", "s-3"],
      },
    };
    const { closestMatched, allMatched } = deriveEntitiesCoveringTourDepartures(entities, departure);
    assert.strictEqual(closestMatched?.oid, "ent-departure", "Should match departure entity first");
    assert.deepStrictEqual(
      allMatched.map((e) => e.oid),
      ["ent-departure", "ent-product", "ent-sector-group", "ent-sector"],
      "Should include all matching entities",
    );
  }

  // Test 2: No departure OID, match on product OID
  {
    const departure = {
      oid: "dep-2",
      product: {
        oid: "prod-1",
        sectorGroupOID: "sg-2",
        sectorOIDs: ["s-3"],
      },
    };
    const { closestMatched, allMatched } = deriveEntitiesCoveringTourDepartures(entities, departure);
    assert.strictEqual(closestMatched?.oid, "ent-product", "Should match product entity first");
    assert.deepStrictEqual(
      allMatched.map((e) => e.oid),
      ["ent-product"],
      "Should only include product match",
    );
  }

  // Test 3: Only sector group match
  {
    const departure = {
      oid: "dep-2",
      product: {
        oid: "prod-2",
        sectorGroupOID: "sg-1",
        sectorOIDs: [],
      },
    };
    const { closestMatched, allMatched } = deriveEntitiesCoveringTourDepartures(entities, departure);
    assert.strictEqual(closestMatched?.oid, "ent-sector-group", "Should match sector group entity first");
    assert.deepStrictEqual(
      allMatched.map((e) => e.oid),
      ["ent-sector-group"],
    );
  }

  // Test 4: Only sector match (multiple)
  {
    const departure = {
      oid: "dep-2",
      product: {
        oid: "prod-2",
        sectorGroupOID: undefined,
        sectorOIDs: ["s-2"],
      },
    };
    const { closestMatched, allMatched } = deriveEntitiesCoveringTourDepartures(entities, departure);
    assert.strictEqual(closestMatched?.oid, "ent-sector", "Should match sector entity");
    assert.deepStrictEqual(
      allMatched.map((e) => e.oid),
      ["ent-sector"],
    );
  }

  // Test 5: No matches
  {
    const departure = {
      oid: "dep-x",
      product: {
        oid: "prod-x",
        sectorGroupOID: "sg-x",
        sectorOIDs: ["s-x"],
      },
    };
    const { closestMatched, allMatched } = deriveEntitiesCoveringTourDepartures(entities, departure);
    assert.strictEqual(closestMatched, undefined, "Should have no closest match");
    assert.deepStrictEqual(allMatched, [], "Should have no matches");
  }

  console.log("All tests passed.");
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}
