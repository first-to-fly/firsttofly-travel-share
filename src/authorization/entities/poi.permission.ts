/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const POIPermissions = {
  // User level permissions
  "user:poi:view": {
    name: "View POI",
    description: "Can view POI",
  },

  // Tenant level permissions
  "tenant:poi:view": {
    name: "View POI",
    description: "Can view POI in tenant",
  },
  "tenant:poi:create": {
    name: "Create POI",
    description: "Can create POI in tenant",
  },
  "tenant:poi:update": {
    name: "Update POI",
    description: "Can update POI in tenant",
  },
  "tenant:poi:delete": {
    name: "Delete POI",
    description: "Can delete POI in tenant",
  },
};
