export const SectorGroupPermissions = {
  // User level permissions
  "user:sector-group:view": {
    name: "View Own Sector Groups",
    description: "Can view sector groups they created or are associated with (if applicable, logic defined in service)",
  },
  "user:sector-group:update": {
    name: "Update Own Sector Groups",
    description: "Can update sector groups they created or are associated with",
  },
  "user:sector-group:delete": {
    name: "Delete Own Sector Groups",
    description: "Can delete sector groups they created or are associated with",
  },

  // Tenant level permissions
  "tenant:sector-group:view-list": {
    name: "View Tenant Sector Group List",
    description: "Can view list of sector groups within the tenant",
  },
  "tenant:sector-group:view": {
    name: "View Tenant Sector Groups",
    description: "Can view all sector groups within the tenant",
  },
  "tenant:sector-group:create": {
    name: "Create Tenant Sector Groups",
    description: "Can create sector groups within the tenant",
  },
  "tenant:sector-group:update": {
    name: "Update Tenant Sector Groups",
    description: "Can update sector groups within the tenant",
  },
  "tenant:sector-group:delete": {
    name: "Delete Tenant Sector Groups",
    description: "Can delete sector groups within the tenant",
  },
} as const;
