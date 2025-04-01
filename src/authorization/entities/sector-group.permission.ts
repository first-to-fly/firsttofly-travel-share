/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const SectorGroupPermissions = {
  // Tenant scope
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
