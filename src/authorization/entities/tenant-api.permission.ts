/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const TenantApiPermissions = {
  // Tenant level permissions
  "tenant:tenant-api:view": {
    name: "View Tenant API",
    description: "Can view tenant API keys and their details",
  },
  "tenant:tenant-api:create": {
    name: "Create Tenant API",
    description: "Can create new tenant API keys",
  },
  "tenant:tenant-api:update": {
    name: "Update Tenant API",
    description: "Can update tenant API key settings",
  },
  "tenant:tenant-api:delete": {
    name: "Delete Tenant API",
    description: "Can delete tenant API keys",
  },
};
