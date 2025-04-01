/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const CostingItemPermissions = {
  // User level permissions
  "user:costing-item:view": {
    name: "View Costing Item",
    description: "Can view costing item",
  },

  // Department level permissions
  "dept:costing-item:view": {
    name: "View Costing Item",
    description: "Can view costing item in department",
  },

  // Tenant level permissions
  "tenant:costing-item:view": {
    name: "View Costing Item",
    description: "Can view costing item in tenant",
  },
  "tenant:costing-item:create": {
    name: "Create Costing Item",
    description: "Can create costing item in tenant",
  },
  "tenant:costing-item:update": {
    name: "Update Costing Item",
    description: "Can update costing item in tenant",
  },
  "tenant:costing-item:delete": {
    name: "Delete Costing Item",
    description: "Can delete costing item in tenant",
  },
};
