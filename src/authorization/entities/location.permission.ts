/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const LocationPermissions = {
  // User level permissions
  "user:location:view": {
    name: "View Location",
    description: "Can view location",
  },

  // Department level permissions
  "dept:location:view": {
    name: "View Location",
    description: "Can view location in department",
  },

  // Tenant level permissions
  "tenant:location:view": {
    name: "View Location",
    description: "Can view location in tenant",
  },
  "tenant:location:create": {
    name: "Create Location",
    description: "Can create location in tenant",
  },
  "tenant:location:update": {
    name: "Update Location",
    description: "Can update location in tenant",
  },
  "tenant:location:delete": {
    name: "Delete Location",
    description: "Can delete location in tenant",
  },
};
