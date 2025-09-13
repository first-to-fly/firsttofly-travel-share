/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const TenantConfigPermissions = {
  "tenant:tenant-config:view": {
    name: "View Tenant Config",
    description: "Can view tenant configuration settings",
  },
  "tenant:tenant-config:update": {
    name: "Update Tenant Config",
    description: "Can update tenant configuration settings",
  },
};
