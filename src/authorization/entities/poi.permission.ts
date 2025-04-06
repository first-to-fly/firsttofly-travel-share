export const POIPermissions = {
  // User level permissions
  "user:poi:view": {
    name: "View Own POI",
    description: "Can view own created POI", // Assuming 'own' refers to createdBy
  },
  "user:poi:update": {
    name: "Update Own POI",
    description: "Can update own created POI",
  },
  "user:poi:delete": {
    name: "Delete Own POI",
    description: "Can delete own created POI",
  },

  // Tenant level permissions
  "tenant:poi:view": {
    name: "View Tenant POIs",
    description: "Can view all POIs within the tenant",
  },
  "tenant:poi:create": {
    name: "Create Tenant POI",
    description: "Can create POIs within the tenant",
  },
  "tenant:poi:update": {
    name: "Update Tenant POI",
    description: "Can update any POI within the tenant",
  },
  "tenant:poi:delete": {
    name: "Delete Tenant POI",
    description: "Can delete any POI within the tenant",
  },
} as const;
