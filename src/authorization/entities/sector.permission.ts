/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const SectorPermissions = {
  // Tenant scope
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
