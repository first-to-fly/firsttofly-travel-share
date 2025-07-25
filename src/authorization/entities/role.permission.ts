/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const RolePermissions = {
  // User level permissions
  "user:role:view": {
    name: "View Role",
    description: "Can view role",
  },

  // Tenant level permissions
  "tenant:role:view-list": {
    name: "View Tenant Role List",
    description: "Can view list of roles within the tenant",
  },
  "tenant:role:view": {
    name: "View Role",
    description: "Can view role in tenant",
  },
  "tenant:role:create": {
    name: "Create Role",
    description: "Can create role in tenant",
  },
  "tenant:role:update": {
    name: "Update Role",
    description: "Can update role in tenant",
  },
  "tenant:role:delete": {
    name: "Delete Role",
    description: "Can delete role in tenant",
  },
};
