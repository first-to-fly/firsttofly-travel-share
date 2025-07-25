/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const TenantPermissions = {
  // User level permissions
  "user:tenant:view": {
    name: "View Tenant",
    description: "Can view tenant",
  },

  // Tenant level permissions (These might be more administrative/super-user level)
  "tenant:tenant:view-list": {
    name: "View Tenant List",
    description: "Can view list of tenants",
  },
  "tenant:tenant:view": {
    name: "View Tenant",
    description: "Can view tenant details",
  },
  "tenant:tenant:update": {
    name: "Update Tenant",
    description: "Can update tenant details",
  },
  // Add other tenant management permissions as needed, e.g., create, delete (if applicable)
};
