export const CostingItemPermissions = {
  // User level permissions
  "user:costing-item:view": {
    name: "View Own Costing Items",
    description: "Can view costing items they created",
  },
  "user:costing-item:update": {
    name: "Update Own Costing Items",
    description: "Can update costing items they created",
  },
  "user:costing-item:delete": {
    name: "Delete Own Costing Items",
    description: "Can delete costing items they created",
  },

  // Tenant level permissions
  "tenant:costing-item:view-list": {
    name: "View Tenant Costing Item List",
    description: "Can view list of costing items within the tenant",
  },
  "tenant:costing-item:view": {
    name: "View Tenant Costing Items",
    description: "Can view all costing items within the tenant",
  },
  "tenant:costing-item:create": {
    name: "Create Tenant Costing Items",
    description: "Can create costing items within the tenant",
  },
  "tenant:costing-item:update": {
    name: "Update Tenant Costing Items",
    description: "Can update any costing item within the tenant",
  },
  "tenant:costing-item:delete": {
    name: "Delete Tenant Costing Items",
    description: "Can delete any costing item within the tenant",
  },
} as const;
