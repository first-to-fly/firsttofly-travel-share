/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const SectorGroupPermissions = {

  // User level permissions
  "user:sector-group:view": {
    name: "View Sector Group",
    description: "Can view sector group",
  },

  // Department level permissions
  "dept:sector-group:view": {
    name: "View Sector Group",
    description: "Can view sector group in department",
  },
  "dept:sector-group:update": {
    name: "Update Sector Group",
    description: "Can update sector group in department",
  },

  // Tenant level permissions
  "tenant:sector-group:view": {
    name: "View Sector Group",
    description: "Can view sector groups in tenant",
  },
  "tenant:sector-group:create": {
    name: "Create Sector Group",
    description: "Can create sector groups in tenant",
  },
  "tenant:sector-group:update": {
    name: "Update Sector Group",
    description: "Can update sector groups in tenant",
  },
  "tenant:sector-group:delete": {
    name: "Delete Sector Group",
    description: "Can delete sector groups in tenant",
  },
};
