/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const RolePermissions = {
  // User level permissions
  "user:role:view": {
    name: "View Role",
    description: "Can view role",
  },

  // Department level permissions
  "dept:role:view": {
    name: "View Role",
    description: "Can view role in department",
  },

  // Tenant level permissions
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
  "tenant:role:assign-permission": {
    name: "Assign Permission to Role",
    description: "Can assign permission to role in tenant",
  },
  "tenant:role:unassign-permission": {
    name: "Unassign Permission from Role",
    description: "Can unassign permission from role in tenant",
  },
  "tenant:role:assign-user": {
    name: "Assign User to Role",
    description: "Can assign user to role in tenant",
  },
  "tenant:role:unassign-user": {
    name: "Unassign User from Role",
    description: "Can unassign user from role in tenant",
  },
};
