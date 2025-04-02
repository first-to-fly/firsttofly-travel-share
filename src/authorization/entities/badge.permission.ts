/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const BadgePermissions = {
  // User level permissions
  "user:badge:view": {
    name: "View Badge",
    description: "Can view badge",
  },

  // Tenant level permissions
  "tenant:badge:view": {
    name: "View Badge",
    description: "Can view badge in tenant",
  },
  "tenant:badge:create": {
    name: "Create Badge",
    description: "Can create badge in tenant",
  },
  "tenant:badge:update": {
    name: "Update Badge",
    description: "Can update badge in tenant",
  },
  "tenant:badge:delete": {
    name: "Delete Badge",
    description: "Can delete badge in tenant",
  },
};
