/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const SectorPermissions = {

  // User level permissions
  "user:sector:view": {
    name: "View Sector",
    description: "Can view sector",
  },

  // Department level permissions
  "dept:sector:view": {
    name: "View Sector",
    description: "Can view sector in department",
  },
  "dept:sector:update": {
    name: "Update Sector",
    description: "Can update sector in department",
  },

  // Tenant level permissions
  "tenant:sector:view": {
    name: "View Sector",
    description: "Can view sectors in tenant",
  },
  "tenant:sector:create": {
    name: "Create Sector",
    description: "Can create sectors in tenant",
  },
  "tenant:sector:update": {
    name: "Update Sector",
    description: "Can update sectors in tenant",
  },
  "tenant:sector:delete": {
    name: "Delete Sector",
    description: "Can delete sectors in tenant",
  },
};
