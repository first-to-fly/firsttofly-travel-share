export const SectorPermissions = {
  // User level permissions
  "user:sector:view": {
    name: "View Own Sectors",
    description: "Can view sectors they created or are associated with (if applicable, logic defined in service)",
  },
  "user:sector:update": {
    name: "Update Own Sectors",
    description: "Can update sectors they created or are associated with",
  },
  "user:sector:delete": {
    name: "Delete Own Sectors",
    description: "Can delete sectors they created or are associated with",
  },

  // Department level permissions
  "dept:sector:view": {
    name: "View Department Sectors",
    description: "Can view sectors within their department",
  },
  "dept:sector:create": {
    name: "Create Department Sector",
    description: "Can create sectors within their department",
  },
  "dept:sector:update": {
    name: "Update Department Sectors",
    description: "Can update sectors within their department",
  },
  "dept:sector:delete": {
    name: "Delete Department Sectors",
    description: "Can delete sectors within their department",
  },

  // Tenant level permissions
  "tenant:sector:view-list": {
    name: "View Tenant Sector List",
    description: "Can view list of sectors within the tenant",
  },
  "tenant:sector:view": {
    name: "View Tenant Sectors",
    description: "Can view all sectors within the tenant",
  },
  "tenant:sector:create": {
    name: "Create Tenant Sectors",
    description: "Can create sectors within the tenant",
  },
  "tenant:sector:update": {
    name: "Update Tenant Sectors",
    description: "Can update sectors within the tenant",
  },
  "tenant:sector:delete": {
    name: "Delete Tenant Sectors",
    description: "Can delete sectors within the tenant",
  },
} as const;
